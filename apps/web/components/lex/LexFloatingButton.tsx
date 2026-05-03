'use client';

/**
 * LexFloatingButton — UX premium, discreta. Apre LexDashboardModal.
 *
 *  · Pulse "respiro" non continuo (~ ogni 4.5s).
 *  · Hover: label espansa "Parla con LEX · Assistente digitale".
 *  · Bus listener (lex:open): qualunque CTA può aprire il dashboard
 *    con un `intent` mirato.
 *  · Soft hint dopo 25s, una sola volta per sessione.
 *  · Mobile-friendly, accessibile.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { LEX_OPEN_EVENT, type LexOpenDetail } from '@/lib/lex';
import { LexDashboardModal } from './LexDashboardModal';

const HINT_DELAY_MS = 25_000;
const HINT_AUTOCLOSE_MS = 8_000;
const HINT_STORAGE_KEY = 'miotti.lex.hint.shown';

export function LexFloatingButton() {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<string | undefined>();
  const [hintVisible, setHintVisible] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const hintTimerRef = useRef<number | null>(null);
  const hintAutoCloseRef = useRef<number | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    queueMicrotask(() => triggerRef.current?.focus());
  }, []);

  const dismissHint = useCallback(() => {
    setHintVisible(false);
    if (hintAutoCloseRef.current) {
      window.clearTimeout(hintAutoCloseRef.current);
      hintAutoCloseRef.current = null;
    }
  }, []);

  // Bus listener
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<LexOpenDetail>;
      setIntent(ce.detail?.intent?.trim() || undefined);
      setOpen(true);
      dismissHint();
    };
    window.addEventListener(LEX_OPEN_EVENT, handler as EventListener);
    return () => window.removeEventListener(LEX_OPEN_EVENT, handler as EventListener);
  }, [dismissHint]);

  // Soft hint
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(HINT_STORAGE_KEY)) return;

    hintTimerRef.current = window.setTimeout(() => {
      if (open) return;
      setHintVisible(true);
      sessionStorage.setItem(HINT_STORAGE_KEY, '1');
      hintAutoCloseRef.current = window.setTimeout(() => {
        setHintVisible(false);
      }, HINT_AUTOCLOSE_MS);
    }, HINT_DELAY_MS);

    const onUserActivity = () => {
      if (hintTimerRef.current) {
        window.clearTimeout(hintTimerRef.current);
        hintTimerRef.current = null;
      }
    };
    window.addEventListener('scroll', onUserActivity, { once: true, passive: true });
    window.addEventListener('click', onUserActivity, { once: true });

    return () => {
      if (hintTimerRef.current) window.clearTimeout(hintTimerRef.current);
      if (hintAutoCloseRef.current) window.clearTimeout(hintAutoCloseRef.current);
      window.removeEventListener('scroll', onUserActivity);
      window.removeEventListener('click', onUserActivity);
    };
  }, [open]);

  return (
    <>
      <div
        className="pointer-events-none fixed bottom-5 right-5 z-[950] md:bottom-7 md:right-7"
        aria-hidden={open}
      >
        {/* Soft hint */}
        {hintVisible && !open && (
          <div
            role="status"
            className="pointer-events-auto mb-3 flex max-w-[16rem] items-start gap-3 border bg-vellum p-3.5 pr-2 shadow-floating"
            style={{
              borderColor: 'rgb(var(--color-rule) / 0.18)',
              borderRadius: '4px',
              animation: 'lex-hint-in 0.5s var(--ease-out) both',
            }}
          >
            <span
              aria-hidden
              className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              style={{ background: 'rgb(var(--color-cobalt))', color: 'rgb(var(--color-gold))' }}
            >
              <Sparkles size={13} strokeWidth={1.6} />
            </span>
            <div className="text-[0.8125rem] leading-[1.4] text-ink">
              <span className="block font-display" style={{ fontSize: '0.95rem', lineHeight: 1.15 }}>
                Posso aiutarti?
              </span>
              <span className="mt-0.5 block text-graphite">
                Inquadriamo insieme la tua situazione, prima della consulenza.
              </span>
            </div>
            <button
              type="button"
              onClick={dismissHint}
              aria-label="Chiudi suggerimento"
              className="ml-1 inline-flex h-7 w-7 shrink-0 items-center justify-center text-graphite transition-colors hover:text-ink"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* FAB */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            setIntent(undefined);
            setOpen(true);
          }}
          className="pointer-events-auto group relative inline-flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-500 hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:h-16 md:w-16"
          style={{
            background: 'rgb(var(--color-cobalt))',
            color: 'rgb(var(--color-gold))',
            boxShadow: 'var(--shadow-floating)',
          }}
          aria-label="Apri assistente LEX"
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              border: '1px solid rgb(var(--color-gold) / 0.5)',
              animation: 'lex-breath 4.5s var(--ease-out) infinite',
            }}
          />
          <Sparkles size={20} strokeWidth={1.5} aria-hidden />

          {/* Tooltip espanso (desktop) */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-[3px] border px-3 py-2 text-xs font-medium text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
            style={{
              background: 'rgb(var(--color-vellum))',
              borderColor: 'rgb(var(--color-rule) / 0.18)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <span className="block font-display" style={{ fontSize: '0.95rem', lineHeight: 1.1 }}>
              Parla con LEX
            </span>
            <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
              Assistente digitale
            </span>
          </span>

          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 inline-block h-3 w-3 rounded-full"
            style={{
              background: 'rgb(var(--color-success))',
              border: '2px solid rgb(var(--color-cobalt))',
            }}
          />
        </button>
      </div>

      <LexDashboardModal open={open} initialIntent={intent} onClose={close} />
    </>
  );
}
