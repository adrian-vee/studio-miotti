'use client';

/**
 * LexQuickActions — chip compatte di scelta rapida.
 *
 * Stile minimal: bordo sottile, padding ridotto, icona piccola.
 * Niente card pesanti — sembra un menu di scelta veloce, non un grid hero.
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
}

const ACTIONS: ReadonlyArray<QuickAction & { icon: LucideIcon }> = [
  { key: 'ask', label: 'Fai una domanda', icon: MessageSquare },
  { key: 'upload', label: 'Carica documenti', icon: FilePlus2 },
  { key: 'describe', label: 'Descrivi il caso', icon: FileText },
  { key: 'request', label: 'Prepara richiesta', icon: Send },
  { key: 'book', label: 'Prenota consulenza', icon: CalendarCheck2 },
];

export function LexQuickActions({
  onSelect,
}: {
  onSelect: (key: QuickActionKey) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {ACTIONS.map((a) => {
        const Icon = a.icon;
        return (
          <button
            key={a.key}
            type="button"
            onClick={() => onSelect(a.key)}
            data-lex-action
            className="group inline-flex items-center gap-2 rounded-[3px] border bg-vellum px-2.5 py-1.5 text-[0.8125rem] transition-all duration-300 hover:border-[rgb(var(--color-gold)/0.5)] hover:bg-paper-warm/30"
            style={{
              borderColor: 'rgb(var(--color-rule) / 0.14)',
              color: 'rgb(var(--color-cobalt-deep))',
            }}
          >
            <Icon size={12} strokeWidth={1.7} className="text-graphite transition-colors group-hover:text-[rgb(var(--color-gold-deep))]" />
            <span>{a.label}</span>
          </button>
        );
      })}
    </div>
  );
}
