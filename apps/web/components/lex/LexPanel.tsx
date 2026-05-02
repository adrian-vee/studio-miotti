'use client';

import { useEffect, useId, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { LexHeader } from './LexHeader';
import { LexBubble } from './LexBubble';
import { LexInput } from './LexInput';
import { LexQuickActions } from './LexQuickActions';
import { LexToast } from './LexToast';
import type { LexAttachment, LexMsg, LexToastData } from './types';

interface Props {
  open: boolean;
  messages: LexMsg[];
  busy: boolean;
  toast: LexToastData | null;
  hasUserSpoken: boolean;
  pendingAttachments: LexAttachment[];
  onClose: () => void;
  onSubmit: (text: string) => void;
  onReset: () => void;
  onDismissToast: () => void;
  onUpload: (file: File) => Promise<void>;
  onRemoveAttachment: (id: string) => void;
}

export function LexPanel({
  open,
  messages,
  busy,
  toast,
  hasUserSpoken,
  pendingAttachments,
  onClose,
  onSubmit,
  onReset,
  onDismissToast,
  onUpload,
  onRemoveAttachment,
}: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-scroll on new chunks
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  // ESC chiude + focus trap base
  useEffect(() => {
    if (!open) return;

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 250);

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const root = panelRef.current;
        if (!root) return;
        const focusable = root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{
        duration: 0.32,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.22 },
      }}
      className={cn(
        'fixed z-[var(--z-modal)] flex flex-col overflow-hidden',
        'bg-paper text-ink',
        'shadow-[0_24px_60px_rgba(15,34,64,0.18)]',
        'border-l border-rule',
        // Mobile: 12px su tutti i lati, max-h calcolata su 100dvh
        'inset-3 max-h-[calc(100dvh-1.5rem)]',
        // Desktop: dock bottom-right, 420×min(640, 100dvh-3rem)
        'md:inset-auto md:bottom-6 md:right-6',
        'md:w-[420px] md:h-[min(640px,calc(100dvh-3rem))] md:max-h-[calc(100dvh-3rem)]',
      )}
      style={{ originX: 1, originY: 1 }}
    >
      {/* 4px cobalt accent rule sopra */}
      <div className="h-1 w-full bg-cobalt shrink-0" aria-hidden />

      <div className="shrink-0">
        <LexHeader
          titleId={titleId}
          onClose={onClose}
          onReset={onReset}
          canReset={hasUserSpoken}
        />
      </div>

      {/* Toast feedback — il wrapper esiste solo se c'è un toast da mostrare */}
      {toast && (
        <div className="shrink-0 px-6 pt-3">
          <LexToast toast={toast} onDismiss={onDismissToast} />
        </div>
      )}

      {/* Body chat — flex-1 + min-h-0 è critico per overflow corretto in flex column */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto px-6 py-5 lex-scroll"
        aria-live="polite"
        aria-relevant="additions text"
      >
        <div className="flex flex-col gap-4">
          {messages.map((m) => (
            <LexBubble key={m.id} msg={m} />
          ))}
          {!hasUserSpoken && !busy && (
            <LexQuickActions onPick={(prompt) => onSubmit(prompt)} />
          )}
        </div>
      </div>

      {/* Disclaimer permanente */}
      <p className="shrink-0 px-6 py-2 border-t border-rule font-mono text-[9px] uppercase tracking-[0.15em] text-graphite leading-snug bg-paper">
        Lex fornisce informazioni generali. Non sostituisce un parere legale
        dell'Avv. Miotti.
      </p>

      <div className="shrink-0">
        <LexInput
          busy={busy}
          onSubmit={onSubmit}
          inputRef={inputRef}
          pendingAttachments={pendingAttachments}
          onUpload={onUpload}
          onRemoveAttachment={onRemoveAttachment}
        />
      </div>
    </motion.div>
  );
}
