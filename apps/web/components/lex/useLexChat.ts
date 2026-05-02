'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  LexAttachment,
  LexMsg,
  LexOutcome,
  LexSessionContext,
  LexStreamEvent,
  LexToastData,
} from './types';
import { SITE_DATA } from '@/lib/site-data';

const SESSION_KEY = 'lex-session-id';
const CHAT_KEY_PREFIX = 'lex-chat-';
const CONTEXT_KEY = 'lex-context';

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
  pendingAttachments: LexAttachment[];
  sessionContext: LexSessionContext;
  send: (text: string) => Promise<void>;
  reset: () => void;
  dismissToast: () => void;
  uploadFile: (file: File) => Promise<void>;
  removeAttachment: (id: string) => void;
}

export function useLexChat({ workerUrl }: UseLexChatOptions): UseLexChatReturn {
  const [sessionId, setSessionId] = useState<string>(() => readOrCreateSessionId());
  const [messages, setMessages] = useState<LexMsg[]>(() => readMessages(sessionId));
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<LexToastData | null>(null);
  const [pendingAttachments, setPendingAttachments] = useState<LexAttachment[]>(
    [],
  );
  const [sessionContext, setSessionContext] = useState<LexSessionContext>(() =>
    readSessionContext(),
  );
  const abortRef = useRef<AbortController | null>(null);

  // Persist messages on every change
  useEffect(() => {
    persistMessages(sessionId, messages);
  }, [sessionId, messages]);

  // Persist sessionContext
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.sessionStorage.setItem(CONTEXT_KEY, JSON.stringify(sessionContext));
    } catch {
      // ignore quota
    }
  }, [sessionContext]);

  const showToast = useCallback((data: LexToastData) => {
    setToast(data);
    window.setTimeout(() => {
      setToast((current) => (current?.id === data.id ? null : current));
    }, 8000);
  }, []);

  const uploadFile = useCallback(
    async (file: File): Promise<void> => {
      const id = cryptoId();
      setPendingAttachments((prev) => [
        ...prev,
        {
          id,
          name: file.name,
          type: file.type,
          size: file.size,
          status: 'uploading',
        },
      ]);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch(`${workerUrl}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const errBody = (await res.json().catch(() => ({}))) as {
            error?: string;
          };
          throw new Error(errBody.error || `Upload fallito (${res.status})`);
        }

        const data = (await res.json()) as {
          file: { name: string; type: string; size: number; base64: string };
        };

        setPendingAttachments((prev) =>
          prev.map((a) =>
            a.id === id
              ? {
                  ...a,
                  base64: data.file.base64,
                  status: 'ready' as const,
                }
              : a,
          ),
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Upload fallito';
        setPendingAttachments((prev) =>
          prev.map((a) =>
            a.id === id
              ? { ...a, status: 'error' as const, error: message }
              : a,
          ),
        );
      }
    },
    [workerUrl],
  );

  const removeAttachment = useCallback((id: string) => {
    setPendingAttachments((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      const readyAttachments = pendingAttachments.filter(
        (a) => a.status === 'ready' && a.base64,
      );
      // serve almeno testo o un allegato pronto
      if ((!trimmed && readyAttachments.length === 0) || busy) return;

      const userMsg: LexMsg = {
        id: cryptoId(),
        role: 'user',
        content: trimmed,
        ts: Date.now(),
        attachments:
          readyAttachments.length > 0
            ? readyAttachments.map((a) => ({
                id: a.id,
                name: a.name,
                type: a.type,
                size: a.size,
                status: 'ready',
              }))
            : undefined,
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
      // pulisci pending in coda
      setPendingAttachments([]);
      // marca documenti come analizzati
      if (readyAttachments.length > 0) {
        setSessionContext((prev) => ({
          ...prev,
          documentsAnalyzed: [
            ...(prev.documentsAnalyzed ?? []),
            ...readyAttachments.map((a) => a.name),
          ],
        }));
      }
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
            sessionContext,
            attachments: readyAttachments.map((a) => ({
              name: a.name,
              type: a.type,
              base64: a.base64!,
            })),
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
          } else if (event.type === 'context_update') {
            setSessionContext((prev) => ({ ...prev, ...event.context }));
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
    [busy, messages, pendingAttachments, sessionContext, sessionId, workerUrl, showToast],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(`${CHAT_KEY_PREFIX}${sessionId}`);
      window.sessionStorage.removeItem(CONTEXT_KEY);
    }
    const fresh = makeSessionId();
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(SESSION_KEY, fresh);
    }
    setSessionId(fresh);
    setMessages([INITIAL_GREETING()]);
    setPendingAttachments([]);
    setSessionContext({});
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
    pendingAttachments,
    sessionContext,
    send,
    reset,
    dismissToast,
    uploadFile,
    removeAttachment,
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

function readSessionContext(): LexSessionContext {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.sessionStorage.getItem(CONTEXT_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
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
