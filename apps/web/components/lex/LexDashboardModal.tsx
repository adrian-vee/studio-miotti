'use client';

/**
 * LexDashboardModal — finestra premium tipo legal assistant dashboard.
 *
 * Layout (desktop ≥ 1024):
 *  ┌───────────────────────────────────────────────────────────┐
 *  │ Header LEX (status + disclaimer breve)                    │
 *  ├──────────────────────────────────┬────────────────────────┤
 *  │ Quick actions + Upload + Chat    │  Status panel sidebar  │
 *  │                                  │                        │
 *  └──────────────────────────────────┴────────────────────────┘
 *  Footer microcopy
 *
 * Mobile (< lg): bottom sheet full screen (sidebar collassata in tab).
 *
 * Animazione apertura GSAP:
 *  · Scrim fade-in
 *  · Card scale 0.96→1 + opacity con ease-out
 *  · clip-path reveal (inset 12% → 0)
 *  · stagger su quick actions / sidebar / footer
 *
 * Accessibilità:
 *  · role=dialog, aria-modal, aria-labelledby
 *  · ESC chiude, focus trap basico, return focus al trigger
 *  · scroll body bloccato
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Sparkles, X, Phone } from 'lucide-react';
import { ensureGsap, prefersReducedMotion } from '@/lib/animations';
import { LexQuickActions, type QuickActionKey } from './LexQuickActions';
import { FileUploadMock, type MockFile } from './FileUploadMock';
import { LexChatMock } from './LexChatMock';
import { LexStatusPanel } from './LexStatusPanel';
import { SITE_DATA } from '@/lib/site-data';

const DEFAULT_INTENT =
  'Posso aiutarti a inquadrare la tua situazione prima di parlare con l’avvocato. Da dove cominciamo?';

const QUICK_INTENT: Record<QuickActionKey, string> = {
  ask: 'Fai pure la tua domanda. Risponderò con un orientamento generale e, se serve, ti dirò quando passare allo studio.',
  upload: 'Allega contratti, lettere o immagini rilevanti tramite il pannello documenti qui sotto. Saranno trasmessi solo dopo conferma dello studio.',
  describe: 'Descrivi il caso in poche righe: cosa è successo, cosa ti aspetti, e i tempi che hai. Strutturo io le informazioni.',
  request: 'Prepariamo insieme una richiesta strutturata da inviare allo studio. Iniziamo dal motivo della consulenza?',
  book: 'Per prenotare una consulenza, conferma una preferenza di orario e ti rispondiamo entro la giornata lavorativa successiva.',
};

export function LexDashboardModal({
  open,
  initialIntent,
  onClose,
}: {
  open: boolean;
  initialIntent?: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const [activeIntent, setActiveIntent] = useState<string>(initialIntent || DEFAULT_INTENT);
  const [files, setFiles] = useState<MockFile[]>([]);

  // Sync intent quando viene riaperto con nuovo prompt
  useEffect(() => {
    if (open) setActiveIntent(initialIntent || DEFAULT_INTENT);
  }, [open, initialIntent]);

  // Animazione apertura
  useEffect(() => {
    if (!open) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.fromTo(
        '[data-lex-scrim]',
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' },
      );
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          scale: 0.96,
          y: 20,
          clipPath: 'inset(8% 8% 8% 8% round 12px)',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0% round 12px)',
          duration: 0.7,
          ease: 'power3.out',
        },
      );
      gsap.from('[data-lex-stagger]', {
        opacity: 0,
        y: 14,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.06,
        delay: 0.25,
      });
    }, dialogRef);

    return () => ctx.revert();
  }, [open]);

  // Focus management + ESC + scroll lock
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    queueMicrotask(() => dialogRef.current?.focus());

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  const onQuickAction = useCallback((key: QuickActionKey) => {
    setActiveIntent(QUICK_INTENT[key]);
  }, []);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 z-[1100] flex items-stretch justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lex-modal-title"
    >
      {/* Scrim */}
      <button
        type="button"
        data-lex-scrim
        aria-label="Chiudi"
        onClick={onClose}
        className="absolute inset-0 bg-cobalt-deep/60 backdrop-blur-sm"
      />

      {/* Card dashboard */}
      <div
        ref={cardRef}
        className="relative my-0 flex h-[100dvh] w-full max-w-[1100px] flex-col overflow-hidden bg-paper text-ink shadow-modal sm:my-6 sm:h-auto sm:max-h-[92vh] sm:rounded-md"
        style={{ border: '1px solid rgb(var(--color-rule) / 0.18)' }}
      >
        {/* Header LEX */}
        <header
          data-lex-stagger
          className="relative flex shrink-0 items-start justify-between gap-3 px-5 py-4 md:px-7 md:py-5"
          style={{
            background: 'rgb(var(--color-cobalt-deep))',
            color: 'rgb(var(--color-paper))',
          }}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="inline-flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  background: 'rgb(244 242 238 / 0.06)',
                  color: 'rgb(var(--color-gold))',
                  border: '1px solid rgb(198 168 107 / 0.35)',
                }}
              >
                <Sparkles size={15} strokeWidth={1.6} />
              </span>
              <div>
                <h2
                  id="lex-modal-title"
                  className="font-display"
                  style={{ fontSize: '1.5rem', lineHeight: 1.05, color: 'rgb(var(--color-paper))' }}
                >
                  LEX
                </h2>
                <span
                  className="font-mono text-[10.5px] uppercase tracking-[0.22em]"
                  style={{ color: 'rgb(var(--color-paper) / 0.65)' }}
                >
                  Assistente digitale dello Studio Miotti
                </span>
              </div>
            </div>
            <p
              className="mt-3 max-w-2xl text-[0.8125rem]"
              style={{ color: 'rgb(var(--color-paper) / 0.7)', lineHeight: 1.5 }}
            >
              LEX fornisce supporto informativo e non sostituisce la consulenza
              dell’avvocato. Le informazioni inviate sono riservate e
              trasmesse allo studio solo dopo conferma.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <span
              className="hidden items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] sm:inline-flex"
              style={{
                borderColor: 'rgb(244 242 238 / 0.18)',
                background: 'rgb(244 242 238 / 0.04)',
                color: 'rgb(var(--color-paper) / 0.85)',
              }}
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: 'rgb(var(--color-success))',
                  animation: 'pulse-dot 2.4s ease-out infinite',
                }}
              />
              Online
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi LEX"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              style={{
                color: 'rgb(var(--color-paper) / 0.85)',
                background: 'rgb(244 242 238 / 0.06)',
              }}
            >
              <X size={16} />
            </button>
          </div>
        </header>

        {/* Body */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
          {/* Main column */}
          <div className="flex min-w-0 flex-1 flex-col gap-5 px-5 py-5 md:px-7 md:py-6 lg:overflow-y-auto">
            {/* Quick actions */}
            <section data-lex-stagger>
              <h3 className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-graphite">
                Scelta rapida
              </h3>
              <div className="mt-3">
                <LexQuickActions onSelect={onQuickAction} />
              </div>
            </section>

            {/* Upload */}
            <section data-lex-stagger>
              <h3 className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-graphite">
                Documenti
              </h3>
              <div className="mt-3">
                <FileUploadMock files={files} onChange={setFiles} />
              </div>
            </section>

            {/* Chat */}
            <section data-lex-stagger className="flex min-h-[260px] flex-col">
              <h3 className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-graphite">
                Chat
              </h3>
              <div className="mt-3 flex min-h-0 flex-1 flex-col">
                <LexChatMock initialIntent={activeIntent} attachmentsCount={files.length} />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside
            data-lex-stagger
            className="shrink-0 border-t bg-paper-warm/30 px-5 py-5 md:px-7 lg:w-[320px] lg:overflow-y-auto lg:border-l lg:border-t-0"
            style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
          >
            <LexStatusPanel documentsCount={files.length} status={files.length > 0 ? 'sent' : 'draft'} />
          </aside>
        </div>

        {/* Footer microcopy */}
        <footer
          data-lex-stagger
          className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t px-5 py-3 md:px-7"
          style={{
            borderColor: 'rgb(var(--color-rule) / 0.12)',
            background: 'rgb(var(--color-vellum))',
          }}
        >
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-graphite">
            Riservatezza · presa in carico solo dopo conferma dello studio
          </span>
          <a
            href={`tel:${SITE_DATA.phoneTel}`}
            className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em]"
            style={{ color: 'rgb(var(--color-cobalt-deep))' }}
          >
            <Phone size={12} strokeWidth={1.6} />
            {SITE_DATA.phoneDisplay}
          </a>
        </footer>
      </div>
    </div>
  );
}
