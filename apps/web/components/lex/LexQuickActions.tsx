'use client';

/**
 * LexQuickActions — 5 card di scelta rapida nel dashboard LEX.
 *
 * Cliccando una card, vengono prefilled chat / upload / form
 * (gestito tramite onSelect callback).
 */

import { MessageSquare, FilePlus2, FileText, Send, CalendarCheck2, type LucideIcon } from 'lucide-react';

export type QuickActionKey =
  | 'ask'
  | 'upload'
  | 'describe'
  | 'request'
  | 'book';

export interface QuickAction {
  key: QuickActionKey;
  label: string;
  description: string;
}

const ACTIONS: ReadonlyArray<QuickAction & { icon: LucideIcon }> = [
  { key: 'ask', label: 'Fai una domanda', description: 'Orientamento iniziale, in italiano semplice.', icon: MessageSquare },
  { key: 'upload', label: 'Carica documenti', description: 'Contratti, lettere, estratti conto.', icon: FilePlus2 },
  { key: 'describe', label: 'Descrivi il tuo caso', description: 'Cosa è successo, cosa ti aspetti.', icon: FileText },
  { key: 'request', label: 'Prepara una richiesta', description: 'Strutturiamola insieme prima dello studio.', icon: Send },
  { key: 'book', label: 'Prenota consulenza', description: 'Appuntamento in studio o video-call.', icon: CalendarCheck2 },
];

export function LexQuickActions({
  onSelect,
}: {
  onSelect: (key: QuickActionKey) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {ACTIONS.map((a) => {
        const Icon = a.icon;
        return (
          <button
            key={a.key}
            type="button"
            onClick={() => onSelect(a.key)}
            data-lex-action
            className="group flex items-start gap-3.5 rounded-[3px] border bg-vellum p-3.5 text-left transition-all duration-300 hover:border-[rgb(var(--color-gold)/0.5)]"
            style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
          >
            <span
              aria-hidden
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[3px] transition-colors duration-300 group-hover:bg-[rgb(var(--color-gold)/0.12)] group-hover:text-[rgb(var(--color-gold-deep))]"
              style={{
                color: 'rgb(var(--color-cobalt))',
                background: 'rgb(var(--color-paper-warm) / 0.5)',
              }}
            >
              <Icon size={15} strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <span
                className="block font-display"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.2,
                  color: 'rgb(var(--color-cobalt-deep))',
                }}
              >
                {a.label}
              </span>
              <span className="mt-1 block text-[0.8125rem] leading-[1.45] text-graphite">
                {a.description}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
