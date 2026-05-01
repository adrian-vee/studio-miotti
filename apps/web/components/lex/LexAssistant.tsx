'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_DATA } from '@/lib/site-data';

/**
 * LEX — Assistente digitale dello Studio Miotti
 *
 * Capabilities:
 * - Risposta a domande generali sulle aree di competenza
 * - Qualifica del caso (urgenza, area, parte attiva/passiva)
 * - Proposta di prima consulenza (15 min gratuiti)
 * - Cattura lead → Supabase via Cloudflare Worker
 * - Disclaimer obbligatorio: NON fornisce pareri legali vincolanti
 *
 * Architettura:
 * frontend (questo file) ─→ POST → Cloudflare Worker /api/lex/chat
 *                                    ↓
 *                        Anthropic API (Claude Sonnet) con tool use
 *                                    ↓
 *                        Supabase (insert lead) + Resend (email conferma)
 */

const WORKER_URL = process.env.NEXT_PUBLIC_LEX_WORKER_URL ?? '/api/lex'; // fallback locale

type Msg = { role: 'user' | 'assistant'; content: string; ts: number };

const INITIAL_GREETING: Msg = {
  role: 'assistant',
  content:
    "Buongiorno. Sono Lex, l'assistente digitale dello Studio. Posso aiutarla a inquadrare la sua questione e, se utile, fissarle un primo confronto con l'Avv. Miotti. Mi descriva pure la situazione — anche solo a grandi linee.",
  ts: Date.now(),
};

export function LexAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INITIAL_GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [sessionId] = useState(() =>
    typeof crypto !== 'undefined' ? crypto.randomUUID() : `${Date.now()}`,
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, busy]);

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim() || busy) return;

    const userMsg: Msg = { role: 'user', content: input.trim(), ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setBusy(true);

    try {
      const res = await fetch(`${WORKER_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          messages: [...messages, userMsg].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      if (!res.ok) throw new Error(`Worker ${res.status}`);
      const data = (await res.json()) as { reply: string };

      setMessages((m) => [
        ...m,
        { role: 'assistant', content: data.reply, ts: Date.now() },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: `Mi scuso, ho avuto un problema tecnico. Può scrivermi più tardi o contattare direttamente lo studio al ${SITE_DATA.phoneDisplay}.`,
          ts: Date.now(),
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Trigger button */}
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        onClick={() => setOpen(true)}
        aria-label="Apri assistente Lex"
        className={cn(
          'fixed bottom-8 right-8 md:bottom-10 md:right-10 z-[var(--z-lex)]',
          'group flex items-center gap-3 pl-3 pr-5 py-3',
          'bg-ink text-paper hover:bg-cobalt-deep',
          'shadow-[0_8px_24px_rgba(15,34,64,0.18)] hover:shadow-[0_12px_32px_rgba(15,34,64,0.28)]',
          'transition-all duration-300',
          open && 'opacity-0 pointer-events-none scale-90',
        )}
      >
        <span className="relative flex h-8 w-8 items-center justify-center bg-gold/20 rounded-sm">
          <Sparkles size={14} className="text-gold" />
          <span className="absolute inset-0 animate-ping rounded-sm bg-gold/20" />
        </span>
        <span className="text-sm font-medium">Parla con Lex</span>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[var(--z-overlay)] bg-ink/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-label="Chat con Lex, l'assistente dello Studio"
              aria-modal="true"
              initial={{ opacity: 0, x: 30, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 30, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'fixed z-[var(--z-modal)] bg-paper flex flex-col',
                'inset-x-0 bottom-0 top-16 md:inset-auto md:bottom-6 md:right-6 md:top-auto',
                'md:w-[420px] md:h-[640px] md:max-h-[85vh]',
                'border border-rule shadow-[0_24px_64px_rgba(15,34,64,0.2)]',
              )}
            >
              {/* Header */}
              <header className="flex items-center justify-between p-5 border-b border-rule bg-paper-warm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-cobalt flex items-center justify-center text-paper">
                    <Sparkles size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-display text-lg leading-none">Lex</p>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-graphite mt-1">
                      Assistente Studio Miotti
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 -mr-2 hover:text-cobalt transition-colors"
                  aria-label="Chiudi chat"
                >
                  <X size={20} />
                </button>
              </header>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-5 space-y-4"
                aria-live="polite"
              >
                {messages.map((m, i) => (
                  <Bubble key={i} msg={m} />
                ))}
                {busy && <Typing />}
              </div>

              {/* Disclaimer + input */}
              <div className="border-t border-rule">
                <p className="px-5 pt-3 text-[10px] text-graphite italic">
                  Lex fornisce informazioni generali. Non sostituisce un parere legale.
                </p>
                <form onSubmit={send} className="flex items-end gap-2 p-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Scriva qui la sua domanda…"
                    disabled={busy}
                    className="flex-1 px-4 py-3 bg-paper-warm border border-rule focus:border-cobalt outline-none text-sm placeholder:text-graphite/60"
                    aria-label="Messaggio per Lex"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || busy}
                    className="h-12 w-12 bg-cobalt text-paper hover:bg-cobalt-deep disabled:bg-rule disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    aria-label="Invia messaggio"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[80%] px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'bg-cobalt text-paper'
            : 'bg-paper-warm text-ink border border-rule',
        )}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

function Typing() {
  return (
    <div className="flex justify-start">
      <div className="bg-paper-warm border border-rule px-4 py-3 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
            className="h-1.5 w-1.5 bg-graphite rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
