'use client';

import { Sparkles, X, RotateCcw } from 'lucide-react';

interface Props {
  titleId: string;
  onClose: () => void;
  onReset: () => void;
  canReset: boolean;
}

export function LexHeader({ titleId, onClose, onReset, canReset }: Props) {
  return (
    <header className="bg-paper-warm border-b border-rule px-6 py-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="h-10 w-10 shrink-0 bg-cobalt flex items-center justify-center text-paper"
            aria-hidden
          >
            <Sparkles size={18} />
          </div>
          <div className="min-w-0">
            <p
              id={titleId}
              className="font-display text-[24px] leading-none text-ink"
            >
              Lex
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-graphite mt-1.5">
              Assistente Studio Miotti
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {canReset && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-graphite hover:text-cobalt transition-colors"
              aria-label="Inizia una nuova conversazione"
            >
              <RotateCcw size={12} />
              <span className="hidden sm:inline">Nuova conversazione</span>
              <span className="sm:hidden">Reset</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi Lex"
            className="p-2 -mr-1 text-ink hover:text-cobalt transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div
        className="flex items-center gap-2 mt-3"
        role="status"
        aria-live="polite"
      >
        <span
          className="block h-2 w-2 rounded-full bg-success"
          aria-hidden
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
          Online · risponde in pochi secondi
        </span>
      </div>
    </header>
  );
}
