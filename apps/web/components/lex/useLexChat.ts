'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { LexMsg, LexOutcome, LexStreamEvent, LexToastData } from './types';
import { SITE_DATA } from '@/lib/site-data';

const SESSION_KEY = 'lex-session-id';
const CHAT_KEY_PREFIX = 'lex-chat-';

const INITIAL_GREETING = (): LexMsg => ({
  id: cryptoId(),
  role: 'assistant',
  content:
    "Buongiorno. Sono Lex, l'assistente digitale dello Studio. Posso aiutarLa a inquadrare la Sua questione e, se utile, fissarLe un primo confronto con l'Avv. Miotti. Mi descriva pure la situazione, anche solo a grandi linee.",
  ts: Date.now(),
});

interface UseLexChatOptions {
  workerUrl: string;
}

interface UseLexChatReturn {
  messages: LexMsg[];
  busy: boolean;
  sessionId: string;
  toast: LexToastData | null;
  hasUserSpoken: boolean;
  send: (text: string) => Promise<void>;
  reset: () => void;
  dismissToast: () => void;
}

export function useLexChat({ workerUrl }: UseLexChatOptions): UseLexChatReturn {
  const [sessionId, setSessionId] = useState<string>(() => readOrCreateSessionId());
  const [messages, setMessages] = useState<LexMsg[]>(() => readMessages(sessionId));
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<LexToastData | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Persist messages on every change
  useEffect(() => {
    persistMessages(sessionId, messages);
  }, [sessionId, messages]);

  const showToast = useCallback((data: LexToastData) => {
    setToast(data);
    window.setTimeout(() => {
      setToast((current) => (current?.id === data.id ? null : current));
    }, 8000);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || busy) return;

      const userMsg: LexMsg = {
        id: cryptoId(),
        role: 'user',
        content: trimmed,
        ts: Date.now(),
      };
      const assistantId = cryptoId();
      const assistantMsg: LexMsg = {
        id: assistantId,
        role: 'assistant',
        content: '',
        ts: Date.now(),
        streaming: true,
        pending: true,
      };

      const baseMessages = [...messages, userMsg];
      setMessages([...baseMessages, assistantMsg]);
      setBusy(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(`${workerUrl}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/event-stream',
          },
          body: JSON.stringify({
            session_id: sessionId,
            messages: baseMessages.map(({ role, content }) => ({ role, content })),
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`worker_${res.status}`);
        }

        await consumeSSE(res.body, (event) => {
          if (event.type === 'text') {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: m.content + event.value, pending: false }
                  : m,
              ),
            );
          } else if (event.type === 'done') {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, streaming: false, pending: false }
                  : m,
              ),
            );
            handleOutcome(event.outcome, showToast);
          } else if (event.type === 'error') {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? {
                      ...m,
                      content:
                        m.content ||
                        `Mi scuso, ho avuto un problema tecnico. Può scrivermi più tardi o contattare lo studio al ${SITE_DATA.phoneDisplay}.`,
                      streaming: false,
                      pending: false,
                    }
                  : m,
              ),
            );
          }
        });
      } catch (err) {
        if ((err as { name?: string })?.name === 'AbortError') return;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: `Mi scuso, ho avuto un problema tecnico. Può scrivermi più tardi o contattare lo studio al ${SITE_DATA.phoneDisplay}.`,
                  streaming: false,
                  pending: false,
                }
              : m,
          ),
        );
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy, messages, sessionId, workerUrl, showToast],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(`${CHAT_KEY_PREFIX}${sessionId}`);
    }
    const fresh = makeSessionId();
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(SESSION_KEY, fresh);
    }
    setSessionId(fresh);
    setMessages([INITIAL_GREETING()]);
    setToast(null);
    setBusy(false);
  }, [sessionId]);

  const dismissToast = useCallback(() => setToast(null), []);

  const hasUserSpoken = messages.some((m) => m.role === 'user');

  return {
    messages,
    busy,
    sessionId,
    toast,
    hasUserSpoken,
    send,
    reset,
    dismissToast,
  };
}

function handleOutcome(
  outcome: LexOutcome,
  showToast: (t: LexToastData) => void,
) {
  if (outcome === 'lead_captured') {
    showToast({
      id: cryptoId(),
      variant: 'success',
      text: 'La Sua richiesta è stata registrata. La ricontatteremo entro 24 ore lavorative.',
    });
  } else if (outcome === 'escalated_human') {
    showToast({
      id: cryptoId(),
      variant: 'warn',
      text: `Per la Sua urgenza La invitiamo a chiamare lo Studio al ${SITE_DATA.phoneDisplay}.`,
      cta: { label: 'Chiama ora', href: `tel:${SITE_DATA.phoneTel}` },
    });
  }
}

async function consumeSSE(
  body: ReadableStream<Uint8Array>,
  onEvent: (e: LexStreamEvent) => void,
) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let separatorIdx;
    while ((separatorIdx = buffer.indexOf('\n\n')) >= 0) {
      const rawEvent = buffer.slice(0, separatorIdx);
      buffer = buffer.slice(separatorIdx + 2);
      const dataLines = rawEvent
        .split('\n')
        .filter((l) => l.startsWith('data:'))
        .map((l) => l.slice(5).trimStart());
      if (dataLines.length === 0) continue;
      const payload = dataLines.join('\n');
      try {
        const parsed = JSON.parse(payload) as LexStreamEvent;
        onEvent(parsed);
      } catch {
        // ignore malformed event
      }
    }
  }
}

function readOrCreateSessionId(): string {
  if (typeof window === 'undefined') return makeSessionId();
  const existing = window.sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const fresh = makeSessionId();
  window.sessionStorage.setItem(SESSION_KEY, fresh);
  return fresh;
}

function readMessages(sessionId: string): LexMsg[] {
  if (typeof window === 'undefined') return [INITIAL_GREETING()];
  const raw = window.sessionStorage.getItem(`${CHAT_KEY_PREFIX}${sessionId}`);
  if (!raw) return [INITIAL_GREETING()];
  try {
    const parsed = JSON.parse(raw) as LexMsg[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [INITIAL_GREETING()];
    // se l'ultima bubble era streaming/pending al reload, normalizziamo
    return parsed.map((m) => ({ ...m, streaming: false, pending: false }));
  } catch {
    return [INITIAL_GREETING()];
  }
}

function persistMessages(sessionId: string, messages: LexMsg[]) {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(
      `${CHAT_KEY_PREFIX}${sessionId}`,
      JSON.stringify(messages),
    );
  } catch {
    // quota piena: non blocchiamo l'UX
  }
}

function makeSessionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `lex-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function cryptoId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
