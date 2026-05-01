import type { Context } from 'hono';
import { streamSSE } from 'hono/streaming';
import Anthropic from '@anthropic-ai/sdk';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { LEX_SYSTEM_PROMPT, MODEL, MAX_TOKENS } from './system-prompt';
import { LEX_TOOLS } from './tools';
import type { ChatRequest, Env, Outcome } from './types';

type StreamEvent =
  | { type: 'text'; value: string }
  | { type: 'tool'; name: string; outcome: Outcome }
  | { type: 'error'; message: string }
  | {
      type: 'done';
      outcome: Outcome;
      lead_id: string | null;
      session_id: string;
    };

/**
 * Endpoint SSE: Lex risponde in streaming, emette eventi tipizzati.
 * - `text`   → ogni delta di testo prodotto da Claude
 * - `tool`   → un tool è stato eseguito e ha aggiornato l'outcome
 * - `done`   → fine dello stream con outcome finale e session_id
 * - `error`  → errore tecnico (UX: mostra fallback, mantieni la chat)
 */
export async function handleChat(c: Context<{ Bindings: Env }>) {
  const body = await c.req.json<ChatRequest>().catch(() => null);
  if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
    return c.json({ error: 'invalid_payload' }, 400);
  }

  const inputMessages = body.messages.slice(-20).map((m) => ({
    role: m.role,
    content: typeof m.content === 'string' ? m.content.slice(0, 4000) : '',
  })) satisfies Anthropic.MessageParam[];

  const anthropic = new Anthropic({ apiKey: c.env.ANTHROPIC_API_KEY });
  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_ROLE_KEY);

  return streamSSE(c, async (sse) => {
    let outcome: Outcome = 'no_action';
    let leadId: string | null = null;
    let assistantTextAggregate = '';

    // Conversazione tool-use loop, ogni round produce uno stream Anthropic
    let conversation: Anthropic.MessageParam[] = [...inputMessages];
    let rounds = 0;

    try {
      while (true) {
        const stream = anthropic.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: LEX_SYSTEM_PROMPT,
          tools: LEX_TOOLS,
          messages: conversation,
        });

        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            const chunk = event.delta.text;
            if (!chunk) continue;
            assistantTextAggregate += chunk;
            await emit(sse, { type: 'text', value: chunk });
          }
        }

        const finalMessage = await stream.finalMessage();

        if (finalMessage.stop_reason !== 'tool_use' || rounds >= 3) {
          break;
        }
        rounds++;

        const toolUseBlocks = finalMessage.content.filter(
          (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use',
        );
        const toolResults: Anthropic.ToolResultBlockParam[] = [];

        for (const block of toolUseBlocks) {
          try {
            const result = await executeTool(block.name, block.input, {
              supabase,
              sessionId: body.session_id,
            });

            if (block.name === 'capture_lead') {
              outcome = 'lead_captured';
              leadId = (result as { lead_id?: string }).lead_id ?? null;
            } else if (block.name === 'propose_booking') {
              outcome = 'booking_requested';
            } else if (block.name === 'escalate_to_human') {
              outcome = 'escalated_human';
            }

            await emit(sse, { type: 'tool', name: block.name, outcome });

            toolResults.push({
              type: 'tool_result',
              tool_use_id: block.id,
              content: JSON.stringify(result),
            });
          } catch (err) {
            console.error('[tool]', block.name, err);
            toolResults.push({
              type: 'tool_result',
              tool_use_id: block.id,
              content: JSON.stringify({ error: 'tool_execution_failed' }),
              is_error: true,
            });
          }
        }

        conversation = [
          ...conversation,
          { role: 'assistant', content: finalMessage.content },
          { role: 'user', content: toolResults },
        ];
      }

      await emit(sse, {
        type: 'done',
        outcome,
        lead_id: leadId,
        session_id: body.session_id,
      });

      // Log conversazione async DOPO la chiusura dello stream
      c.executionCtx.waitUntil(
        logConversation(supabase, {
          session_id: body.session_id,
          messages: [
            ...inputMessages,
            { role: 'assistant', content: assistantTextAggregate },
          ],
          outcome,
          lead_id: leadId,
        }).catch((err) => console.error('[log-conversation]', err)),
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'unknown';
      console.error('[chat-stream]', err);
      await emit(sse, { type: 'error', message });
      await emit(sse, {
        type: 'done',
        outcome,
        lead_id: leadId,
        session_id: body.session_id,
      });
    }
  });
}

async function emit(
  sse: { writeSSE: (m: { data: string }) => Promise<void> },
  event: StreamEvent,
) {
  await sse.writeSSE({ data: JSON.stringify(event) });
}

async function executeTool(
  name: string,
  input: unknown,
  ctx: { supabase: SupabaseClient; sessionId: string },
): Promise<unknown> {
  switch (name) {
    case 'capture_lead': {
      const data = input as Record<string, unknown>;
      const { data: lead, error } = await ctx.supabase
        .from('leads')
        .insert({
          source: 'lex_assistant',
          name: data.name as string,
          email: (data.email as string | undefined) ?? null,
          phone: (data.phone as string | undefined) ?? null,
          area_diritto: data.area_diritto as string,
          message: (data.message as string | undefined) ?? null,
          qualified_score: data.qualified_score as number,
          gdpr_consent: true,
          gdpr_consent_at: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (error) throw error;
      return { ok: true, lead_id: lead.id };
    }

    case 'propose_booking': {
      // Fase 1: slot mock — fase 2 integrazione Cal.com
      return { ok: true, slots: generateMockSlots() };
    }

    case 'escalate_to_human': {
      const data = input as { reason: string; suggested_action: string };
      return {
        ok: true,
        message:
          data.suggested_action === 'call_112'
            ? 'Per emergenze chiami immediatamente il 112.'
            : 'Per la urgenza chiami direttamente lo studio al 045 95 86 116.',
      };
    }

    default:
      throw new Error(`unknown_tool:${name}`);
  }
}

function generateMockSlots() {
  const slots: { date: string; times: string[] }[] = [];
  const now = new Date();
  for (let i = 1; i <= 5; i++) {
    const day = new Date(now);
    day.setDate(now.getDate() + i);
    if (day.getDay() === 0 || day.getDay() === 6) continue;
    slots.push({
      date: day.toISOString().slice(0, 10),
      times: ['10:00', '11:30', '15:30', '17:00'],
    });
  }
  return slots.slice(0, 3);
}

async function logConversation(
  supabase: SupabaseClient,
  data: {
    session_id: string;
    messages: { role: string; content: unknown }[];
    outcome: string;
    lead_id: string | null;
  },
) {
  await supabase.from('lex_conversations').insert({
    session_id: data.session_id,
    messages: data.messages,
    outcome: data.outcome,
    lead_id: data.lead_id,
  });
}
