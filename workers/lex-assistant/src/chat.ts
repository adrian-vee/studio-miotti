import type { Context } from 'hono';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { LEX_SYSTEM_PROMPT, MODEL, MAX_TOKENS } from './system-prompt';
import { LEX_TOOLS } from './tools';
import type { ChatRequest, ChatResponse, Env } from './types';

export async function handleChat(c: Context<{ Bindings: Env }>) {
  const body = await c.req.json<ChatRequest>().catch(() => null);
  if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
    return c.json({ error: 'invalid_payload' }, 400);
  }

  // Sanitize: limita lunghezza messaggi e numero
  const messages = body.messages.slice(-20).map((m) => ({
    role: m.role,
    content: typeof m.content === 'string' ? m.content.slice(0, 4000) : '',
  }));

  const anthropic = new Anthropic({ apiKey: c.env.ANTHROPIC_API_KEY });
  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_ROLE_KEY);

  let outcome: ChatResponse['outcome'] = 'no_action';
  let leadId: string | null = null;

  try {
    // Prima chiamata Claude
    let response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: LEX_SYSTEM_PROMPT,
      tools: LEX_TOOLS,
      messages,
    });

    // Tool use loop (max 3 round per evitare loop infiniti)
    let rounds = 0;
    while (response.stop_reason === 'tool_use' && rounds < 3) {
      rounds++;

      const toolUseBlocks = response.content.filter((b) => b.type === 'tool_use');
      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const block of toolUseBlocks) {
        if (block.type !== 'tool_use') continue;

        try {
          const result = await executeTool(block.name, block.input, {
            supabase,
            sessionId: body.session_id,
          });

          // Aggiorna outcome basato su tool eseguito
          if (block.name === 'capture_lead') {
            outcome = 'lead_captured';
            leadId = (result as { lead_id?: string }).lead_id ?? null;
          } else if (block.name === 'propose_booking') {
            outcome = 'booking_requested';
          } else if (block.name === 'escalate_to_human') {
            outcome = 'escalated_human';
          }

          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: JSON.stringify(result),
          });
        } catch (err) {
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: JSON.stringify({ error: 'tool_execution_failed' }),
            is_error: true,
          });
        }
      }

      // Continua conversazione con i risultati dei tool
      response = await anthropic.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: LEX_SYSTEM_PROMPT,
        tools: LEX_TOOLS,
        messages: [
          ...messages,
          { role: 'assistant', content: response.content },
          { role: 'user', content: toolResults },
        ],
      });
    }

    // Estrai testo finale
    const reply = response.content
      .filter((b) => b.type === 'text')
      .map((b) => (b.type === 'text' ? b.text : ''))
      .join('\n')
      .trim();

    // Log conversazione async
    c.executionCtx.waitUntil(
      logConversation(supabase, {
        session_id: body.session_id,
        messages: [...messages, { role: 'assistant', content: reply }],
        outcome,
        lead_id: leadId,
      }).catch(console.error),
    );

    return c.json<ChatResponse>({
      reply: reply || 'Mi scuso, non ho capito. Può riformulare?',
      outcome,
      session_id: body.session_id,
    });
  } catch (err) {
    console.error('[chat]', err);
    return c.json(
      {
        reply:
          "Mi scuso, ho avuto un problema tecnico. Può riprovare tra qualche minuto o contattare lo studio al 045 95 86 116.",
        outcome: 'no_action' as const,
        session_id: body.session_id,
      },
      200, // 200 per non rompere UX, l'errore è nel reply
    );
  }
}

/**
 * Esegue il tool richiesto da Claude.
 */
async function executeTool(
  name: string,
  input: unknown,
  ctx: { supabase: ReturnType<typeof createClient>; sessionId: string },
): Promise<unknown> {
  switch (name) {
    case 'capture_lead': {
      const data = input as Record<string, unknown>;
      const { data: lead, error } = await ctx.supabase
        .from('leads')
        .insert({
          source: 'lex_assistant',
          name: data.name as string,
          email: data.email as string | undefined,
          phone: data.phone as string | undefined,
          area_diritto: data.area_diritto as string,
          message: data.message as string | undefined,
          qualified_score: data.qualified_score as number,
          gdpr_consent: true, // implicito chiedendo nei messaggi precedenti
          gdpr_consent_at: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (error) throw error;
      return { ok: true, lead_id: lead.id };
    }

    case 'propose_booking': {
      // In fase 1 ritorniamo slot mock — fase 2 integriamo Cal.com/Calendly
      const slots = generateMockSlots();
      return { ok: true, slots };
    }

    case 'escalate_to_human': {
      const data = input as { reason: string; suggested_action: string };
      // Notifica via webhook (es. Slack/email): TODO in fase 2
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
  const slots = [];
  const now = new Date();
  for (let i = 1; i <= 5; i++) {
    const day = new Date(now);
    day.setDate(now.getDate() + i);
    if (day.getDay() === 0 || day.getDay() === 6) continue; // skip weekend
    slots.push({
      date: day.toISOString().slice(0, 10),
      times: ['10:00', '11:30', '15:30', '17:00'],
    });
  }
  return slots.slice(0, 3);
}

async function logConversation(
  supabase: ReturnType<typeof createClient>,
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
