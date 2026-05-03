'use client';

/**
 * LexFloatingButton — UX premium, discreta.
 *
 * Comportamento:
 *  · FAB rotondo in basso a destra. Pulse "respiro" non continuo (1 ogni
 *    ~4.5s) per segnalare presenza senza nervosismo.
 *  · Hover: label espansa "Parla con LEX · Assistente digitale".
 *  · Click → modal placeholder con disclaimer.
 *  · Ascolta evento `lex:open` (lib/lex.ts): qualunque CTA del sito può
 *    aprirlo con un `intent` mirato (es. "Vuoi un primo orientamento sulla
 *    tua situazione?"). Il modal mostra l'intent come testo iniziale.
 *  · Soft hint: dopo 25s, una sola volta per sessione, appare un piccolo
 *    bubble "Posso aiutarti a inquadrare il caso" che si auto-nasconde
 *    dopo 8s (o al primo scroll/click). Salvato in sessionStorage.
 *  · Mobile-friendly, accessibile (ESC, focus return, aria).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import {
  LEX_OPEN_EVENT,
  type LexOpenDetail,
} from '@/lib/lex';

const HINT_DELAY_MS = 25_000;
const HINT_AUTOCLOSE_MS = 8_000;
const HINT_STORAGE_KEY = 'miotti.lex.hint.shown';

const DEFAULT_INTENT =
  'Posso aiutarti a inquadrare la tua situazione prima di parlare con l’avvocato. Da dove cominciamo?';

export function LexFloatingButton() {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<string>(DEFAULT_INTENT);
  const [hintVisible, setHintVisible] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
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

  // Bus listener — qualunque CTA può aprire il modal con un intent.
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<LexOpenDetail>;
      setIntent(ce.detail?.intent?.trim() || DEFAULT_INTENT);
      setOpen(true);
      dismissHint();
    };
    window.addEventListener(LEX_OPEN_EVENT, handler as EventListener);
    return () =>
      window.removeEventListener(LEX_OPEN_EVENT, handler as EventListener);
  }, [dismissHint]);

  // ESC + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    queueMicrotask(() => dialogRef.current?.focus());
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  // Soft hint: 1 sola volta per sessione, dopo 25s, max 8s a video.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(HINT_STORAGE_KEY)) return;

    hintTimerRef.current = window.setTimeout(() => {
      // Se l'utente ha già aperto il modal, non mostrare hint.
      if (open) return;
      setHintVisible(true);
      sessionStorage.setItem(HINT_STORAGE_KEY, '1');
      hintAutoCloseRef.current = window.setTimeout(() => {
        setHintVisible(false);
      }, HINT_AUTOCLOSE_MS);
    }, HINT_DELAY_MS);

    // Dismiss su scroll o click utente — segnale che è già impegnato
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
      {/* ── Floating button ── */}
      <div
        className="pointer-events-none fixed bottom-5 right-5 z-[950] md:bottom-7 md:right-7"
        aria-hidden={open}
      >
        {/* Soft hint bubble */}
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
              style={{
                background: 'rgb(var(--color-cobalt))',
                color: 'rgb(var(--color-vellum))',
              }}
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

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="pointer-events-auto group relative inline-flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-500 hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:h-16 md:w-16"
          style={{
            background: 'rgb(var(--color-cobalt))',
            color: 'rgb(var(--color-vellum))',
            boxShadow: 'var(--shadow-floating)',
          }}
          aria-label="Apri assistente LEX"
        >
          {/* Pulse "respiro" non continuo — 1 ogni 4.5s */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              border: '1px solid rgb(var(--color-gold) / 0.5)',
              animation: 'lex-breath 4.5s var(--ease-out) infinite',
            }}
          />
          <Sparkles size={20} strokeWidth={1.5} aria-hidden />

          {/* Tooltip "Parla con LEX" — desktop only */}
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

          {/* Pallino stato — verde live */}
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

      {/* ── Modal placeholder ── */}
      {open && (
        <div
          className="fixed inset-0 z-[1100] flex items-end justify-center sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lex-modal-title"
        >
          {/* Scrim */}
          <button
            type="button"
            aria-label="Chiudi"
            onClick={close}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Card */}
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="relative w-full max-w-md overflow-hidden border bg-vellum p-7 shadow-modal sm:rounded-md"
            style={{ borderColor: 'rgb(var(--color-rule) / 0.18)' }}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgb(var(--color-gold) / 0.6), transparent)',
              }}
            />

            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                  LEX · Assistente digitale
                </span>
                <h2
                  id="lex-modal-title"
                  className="mt-3 font-display text-ink"
                  style={{ fontSize: '1.5rem', lineHeight: 1.18 }}
                >
                  Parliamone, in modo chiaro.
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Chiudi modal"
                className="-mr-2 -mt-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-graphite transition-colors hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            {/* Intent prefilled — quello che la CTA chiamante ha passato */}
            <div
              className="mt-5 flex items-start gap-3 rounded-[3px] border p-4"
              style={{
                background: 'rgb(var(--color-paper-warm))',
                borderColor: 'rgb(var(--color-rule) / 0.12)',
              }}
            >
              <span
                aria-hidden
                className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: 'rgb(var(--color-cobalt))',
                  color: 'rgb(var(--color-vellum))',
                }}
              >
                <Sparkles size={13} strokeWidth={1.6} />
              </span>
              <p className="text-[0.9375rem] leading-[1.55] text-ink-soft">
                {intent}
              </p>
            </div>

            <p className="mt-5 text-[0.8125rem] leading-[1.55] text-graphite">
              <strong className="font-medium text-ink-soft">LEX è informativo.</strong>{' '}
              Non sostituisce la consulenza dell’avvocato e non fornisce pareri
              legali validi ai sensi di legge. Sarà attivato a breve per
              orientamento iniziale e raccolta richieste.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="/contatti"
                className="btn-primary"
                style={{ padding: '0.7rem 1.1rem' }}
              >
                Vai al modulo contatti
                <ArrowRight size={14} />
              </a>
              <button
                type="button"
                onClick={close}
                className="btn-secondary"
                style={{ padding: '0.7rem 1.1rem' }}
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
