'use client';

/**
 * LexDashboardModal — dashboard compatta, sobria.
 *
 * Layout enterprise:
 *  · Header sottile (LEX + sottotitolo + status + close), niente eccessi.
 *  · Disclaimer in 1 riga.
 *  · Body 2 colonne leggere:
 *    SX (principale): quick actions chip + upload inline + chat.
 *    DX (secondaria): status timeline minimal (no contatti studio).
 *  · Footer microcopy 1 riga.
 *
 * Animazione apertura GSAP:
 *  · Scrim fade + blur leggero sul background.
 *  · Card scale 0.98 → 1, opacity 0 → 1.
 *  · No clip-path teatrale, no stagger pesante.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Sparkles, X } from 'lucide-react';
import { ensureGsap, prefersReducedMotion } from '@/lib/animations';
import { LexQuickActions, type QuickActionKey } from './LexQuickActions';
import { FileUploadMock, type MockFile } from './FileUploadMock';
import { LexChatMock } from './LexChatMock';
import { LexStatusPanel } from './LexStatusPanel';

const DEFAULT_INTENT =
  'Posso aiutarti a inquadrare la tua situazione prima di parlare con l’avvocato. Da dove cominciamo?';

const QUICK_INTENT: Record<QuickActionKey, string> = {
  ask: 'Fai pure la tua domanda. Risponderò con un orientamento generale e, se serve, ti dirò quando passare allo studio.',
  upload: 'Allega contratti, lettere o immagini rilevanti tramite il pannello documenti. Saranno trasmessi solo dopo conferma dello studio.',
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

  useEffect(() => {
    if (open) setActiveIntent(initialIntent || DEFAULT_INTENT);
  }, [open, initialIntent]);

  // Animazione apertura sobria: scale + opacity + blur scrim
  useEffect(() => {
    if (!open) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        '[data-lex-scrim]',
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' },
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.985, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power3.out' },
      );
    }, dialogRef);

    return () => ctx.revert();
  }, [open]);

  // Focus + ESC + scroll lock
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
      {/* Scrim con blur leggero */}
      <button
        type="button"
        data-lex-scrim
        aria-label="Chiudi"
        onClick={onClose}
        className="absolute inset-0"
        style={{
          background: 'rgb(6 22 36 / 0.55)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* Card */}
      <div
        ref={cardRef}
        className="relative my-0 flex h-[100dvh] w-full max-w-[920px] flex-col overflow-hidden bg-paper text-ink shadow-modal sm:my-6 sm:h-auto sm:max-h-[88vh] sm:rounded-md"
        style={{ border: '1px solid rgb(var(--color-rule) / 0.18)' }}
      >
        {/* Header — sottile */}
        <header
          className="flex shrink-0 items-center justify-between gap-3 border-b px-5 py-3"
          style={{
            background: 'rgb(var(--color-cobalt-deep))',
            borderColor: 'rgb(244 242 238 / 0.10)',
          }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden
              className="inline-flex h-8 w-8 items-center justify-center rounded-full"
              style={{
                background: 'rgb(244 242 238 / 0.06)',
                color: 'rgb(var(--color-gold))',
                border: '1px solid rgb(198 168 107 / 0.4)',
              }}
            >
              <Sparkles size={13} strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <h2
                id="lex-modal-title"
                className="font-display"
                style={{ fontSize: '1.0625rem', lineHeight: 1.1, color: 'rgb(var(--color-paper))' }}
              >
                LEX
              </h2>
              <span
                className="font-mono text-[9.5px] uppercase tracking-[0.22em]"
                style={{ color: 'rgb(var(--color-paper) / 0.6)' }}
              >
                Assistente digitale dello studio
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span
              className="hidden items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.22em] sm:inline-flex"
              style={{
                borderColor: 'rgb(244 242 238 / 0.18)',
                background: 'rgb(244 242 238 / 0.04)',
                color: 'rgb(var(--color-paper) / 0.85)',
              }}
            >
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'rgb(var(--color-success))' }}
              />
              Online
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi LEX"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors"
              style={{
                color: 'rgb(var(--color-paper) / 0.85)',
                background: 'rgb(244 242 238 / 0.06)',
              }}
            >
              <X size={14} />
            </button>
          </div>
        </header>

        {/* Disclaimer 1 riga */}
        <div
          className="shrink-0 border-b px-5 py-2 font-mono text-[9.5px] uppercase tracking-[0.22em]"
          style={{
            borderColor: 'rgb(var(--color-rule) / 0.10)',
            color: 'rgb(var(--color-graphite))',
            background: 'rgb(var(--color-paper-warm) / 0.3)',
          }}
        >
          Supporto informativo · non sostituisce la consulenza dell’avvocato
        </div>

        {/* Body 2 colonne */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
          {/* Main */}
          <div className="flex min-w-0 flex-1 flex-col gap-4 px-5 py-4 lg:overflow-y-auto">
            <section>
              <SectionLabel>Scelta rapida</SectionLabel>
              <div className="mt-2">
                <LexQuickActions onSelect={onQuickAction} />
              </div>
            </section>

            <section>
              <SectionLabel>Documenti</SectionLabel>
              <div className="mt-2">
                <FileUploadMock files={files} onChange={setFiles} />
              </div>
            </section>

            <section className="flex min-h-[260px] flex-col">
              <SectionLabel>Chat</SectionLabel>
              <div className="mt-2 flex min-h-0 flex-1 flex-col">
                <LexChatMock initialIntent={activeIntent} attachmentsCount={files.length} />
              </div>
            </section>
          </div>

          {/* Sidebar leggera */}
          <aside
            className="shrink-0 border-t bg-paper-warm/25 px-5 py-4 lg:w-[260px] lg:overflow-y-auto lg:border-l lg:border-t-0"
            style={{ borderColor: 'rgb(var(--color-rule) / 0.10)' }}
          >
            <LexStatusPanel
              documentsCount={files.length}
              status={files.length > 0 ? 'sent' : 'draft'}
            />
          </aside>
        </div>

        {/* Footer 1 riga */}
        <footer
          className="flex shrink-0 items-center justify-between gap-3 border-t px-5 py-2.5"
          style={{
            borderColor: 'rgb(var(--color-rule) / 0.10)',
            background: 'rgb(var(--color-vellum))',
          }}
        >
          <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-graphite">
            Riservatezza · presa in carico solo dopo conferma dello studio
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.22em]" style={{ color: 'rgb(var(--color-gold-deep))' }}>
            v. 2026.4
          </span>
        </footer>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-[9.5px] uppercase tracking-[0.28em] text-graphite">
      {children}
    </h3>
  );
}
