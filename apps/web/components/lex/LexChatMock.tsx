'use client';

/**
 * LexChatMock — finta area chat (UI-only).
 *
 * Mostra:
 *  · 1 messaggio di benvenuto LEX (intent passato dal modal).
 *  · Suggerimenti iniziali (4 chip) che, cliccati, riempiono l'input.
 *  · Storico messaggi user (push-only). LEX risponde con un messaggio
 *    di "presa in carico" finto, dopo 800ms, ma sempre con disclaimer.
 *  · Input con allegato chip (passato come props, non gestito qui),
 *    pulsante invio.
 */

import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, Paperclip, User2 } from 'lucide-react';

const SUGGESTIONS = [
  'Ho ricevuto una diffida',
  'Devo recuperare un credito',
  'Vorrei far controllare un contratto',
  'Ho una questione familiare',
] as const;

interface ChatMessage {
  id: string;
  who: 'lex' | 'user';
  text: string;
}

export function LexChatMock({
  initialIntent,
  attachmentsCount,
}: {
  initialIntent: string;
  attachmentsCount: number;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'intro', who: 'lex', text: initialIntent },
  ]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Reset benvenuto se cambia intent
  useEffect(() => {
    setMessages([{ id: 'intro-' + Date.now(), who: 'lex', text: initialIntent }]);
  }, [initialIntent]);

  // Auto-scroll
  useEffect(() => {
    const node = scrollerRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, busy]);

  const submit = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: 'u' + Date.now(),
      who: 'user',
      text: text.trim(),
    };
    setMessages((m) => [...m, userMsg]);
    setDraft('');
    setBusy(true);
    window.setTimeout(() => {
      const reply: ChatMessage = {
        id: 'l' + Date.now(),
        who: 'lex',
        text: 'Ricevuto. Strutturo le informazioni e le inoltro allo studio. Riceverai una risposta entro 24–48 ore lavorative all’indirizzo che indicherai. Per ora, puoi aggiungere altri dettagli o documenti che ritieni utili.',
      };
      setMessages((m) => [...m, reply]);
      setBusy(false);
    }, 900);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Messaggi */}
      <div
        ref={scrollerRef}
        className="lex-scroll min-h-0 flex-1 overflow-y-auto px-1 py-2"
      >
        <ul className="space-y-3">
          {messages.map((m) => (
            <li key={m.id} className="flex items-start gap-3">
              <span
                aria-hidden
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={
                  m.who === 'lex'
                    ? {
                        background: 'rgb(var(--color-cobalt))',
                        color: 'rgb(var(--color-gold))',
                      }
                    : {
                        background: 'rgb(var(--color-paper-warm) / 0.6)',
                        color: 'rgb(var(--color-cobalt-deep))',
                      }
                }
              >
                {m.who === 'lex' ? <Sparkles size={12} strokeWidth={1.6} /> : <User2 size={12} strokeWidth={1.6} />}
              </span>
              <div
                className="max-w-[28rem] rounded-[3px] border px-3.5 py-2.5 text-[0.875rem] leading-[1.55]"
                style={
                  m.who === 'lex'
                    ? {
                        background: 'rgb(var(--color-paper-warm) / 0.4)',
                        borderColor: 'rgb(var(--color-rule) / 0.12)',
                        color: 'rgb(var(--color-ink))',
                      }
                    : {
                        background: 'rgb(var(--color-cobalt))',
                        borderColor: 'rgb(var(--color-cobalt))',
                        color: 'rgb(var(--color-paper))',
                      }
                }
              >
                {m.text}
              </div>
            </li>
          ))}
          {busy && (
            <li className="flex items-center gap-3 text-[0.8125rem] text-graphite">
              <span
                aria-hidden
                className="inline-flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: 'rgb(var(--color-cobalt))', color: 'rgb(var(--color-gold))' }}
              >
                <Sparkles size={12} strokeWidth={1.6} />
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em]">
                LEX sta scrivendo…
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* Suggerimenti chips */}
      {messages.length === 1 && (
        <div className="mb-2 flex flex-wrap gap-2 px-1">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setDraft(s)}
              className="rounded-[3px] border bg-vellum px-3 py-1.5 text-[0.8125rem] text-ink-soft transition-colors hover:border-[rgb(var(--color-gold)/0.5)] hover:text-[rgb(var(--color-cobalt-deep))]"
              style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(draft);
        }}
        className="flex items-end gap-2 rounded-[4px] border bg-vellum p-2"
        style={{ borderColor: 'rgb(var(--color-rule) / 0.18)' }}
      >
        <button
          type="button"
          aria-label="Allega file"
          title="Usa il pannello documenti per allegare"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[3px] text-graphite transition-colors hover:text-cobalt"
        >
          <Paperclip size={16} strokeWidth={1.6} />
          {attachmentsCount > 0 && (
            <span
              className="absolute ml-5 mt-[-12px] rounded-full px-1 font-mono text-[8px] tracking-wider"
              style={{ background: 'rgb(var(--color-gold))', color: 'rgb(var(--color-cobalt-deep))' }}
            >
              {attachmentsCount}
            </span>
          )}
        </button>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit(draft);
            }
          }}
          placeholder="Scrivi qui la tua domanda o descrivi la situazione…"
          rows={2}
          className="flex-1 resize-none bg-transparent px-2 py-2 text-[0.9375rem] outline-none placeholder:text-graphite/70"
          style={{ color: 'rgb(var(--color-ink))' }}
        />
        <button
          type="submit"
          aria-label="Invia messaggio"
          disabled={!draft.trim() || busy}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[3px] transition-all disabled:opacity-40"
          style={{
            background: 'rgb(var(--color-cobalt))',
            color: 'rgb(var(--color-gold))',
          }}
        >
          <Send size={14} strokeWidth={1.6} />
        </button>
      </form>
    </div>
  );
}
