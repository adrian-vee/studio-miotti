'use client';

/**
 * LexStatusPanel — sidebar minimal "timeline".
 *
 * Mostra:
 *  · Stato richiesta (in bozza / inviata / presa in carico)
 *  · Conteggio documenti caricati
 *  · Prossimi passi (3 step)
 *
 * NON mostra contatti diretti dello studio: LEX è un filtro, non
 * un sostituto del canale telefonico/sede.
 */

import { Files } from 'lucide-react';

export function LexStatusPanel({
  documentsCount,
  status = 'draft',
}: {
  documentsCount: number;
  status?: 'draft' | 'sent' | 'taken';
}) {
  const statusLabel =
    status === 'draft'
      ? 'In bozza'
      : status === 'sent'
        ? 'Inviata · in attesa studio'
        : 'Presa in carico';

  const tone =
    status === 'draft'
      ? 'rgb(var(--color-graphite))'
      : status === 'sent'
        ? 'rgb(var(--color-gold))'
        : 'rgb(var(--color-success))';

  return (
    <aside className="flex flex-col gap-5">
      {/* Stato */}
      <section>
        <h4 className="font-mono text-[9.5px] uppercase tracking-[0.28em] text-graphite">
          Stato richiesta
        </h4>
        <div className="mt-2 flex items-center gap-2">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: tone }} />
          <span
            className="font-display"
            style={{ fontSize: '0.875rem', lineHeight: 1.2, color: 'rgb(var(--color-cobalt-deep))' }}
          >
            {statusLabel}
          </span>
        </div>
      </section>

      {/* Documenti */}
      <section>
        <h4 className="font-mono text-[9.5px] uppercase tracking-[0.28em] text-graphite">
          Documenti
        </h4>
        <div className="mt-2 flex items-center gap-2.5">
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center rounded-[3px]"
            style={{ background: 'rgb(var(--color-paper-warm) / 0.5)', color: 'rgb(var(--color-cobalt))' }}
          >
            <Files size={12} strokeWidth={1.6} />
          </span>
          <span
            className="font-display"
            style={{ fontSize: '0.875rem', lineHeight: 1.2, color: 'rgb(var(--color-cobalt-deep))' }}
          >
            {documentsCount} {documentsCount === 1 ? 'file' : 'file'} pronti
          </span>
        </div>
      </section>

      {/* Prossimi passi — timeline minimal */}
      <section>
        <h4 className="font-mono text-[9.5px] uppercase tracking-[0.28em] text-graphite">
          Prossimi passi
        </h4>
        <ol className="relative mt-3 space-y-3 pl-5">
          <span
            aria-hidden
            className="absolute left-1.5 top-1 bottom-1 w-px"
            style={{ background: 'rgb(var(--color-rule) / 0.18)' }}
          />
          <Step n="1" text="Descrivi il caso o carica documenti utili." active={status === 'draft'} />
          <Step n="2" text="Invia la richiesta strutturata allo studio." active={status === 'sent'} />
          <Step n="3" text="Conferma in 24–48 h con stima costi." active={status === 'taken'} />
        </ol>
      </section>
    </aside>
  );
}

function Step({ n, text, active }: { n: string; text: string; active?: boolean }) {
  return (
    <li className="relative">
      <span
        aria-hidden
        className="absolute -left-5 top-1.5 inline-block h-2 w-2 rounded-full"
        style={{
          background: active ? 'rgb(var(--color-gold))' : 'rgb(var(--color-paper))',
          border: `1px solid ${active ? 'rgb(var(--color-gold))' : 'rgb(var(--color-rule) / 0.4)'}`,
          boxShadow: active ? '0 0 0 3px rgb(198 168 107 / 0.18)' : 'none',
        }}
      />
      <span
        className="block font-mono text-[9.5px] uppercase tracking-[0.22em]"
        style={{ color: active ? 'rgb(var(--color-gold-deep))' : 'rgb(var(--color-graphite))' }}
      >
        Step {n}
      </span>
      <span
        className="mt-0.5 block text-[0.8125rem] leading-[1.45]"
        style={{ color: active ? 'rgb(var(--color-cobalt-deep))' : 'rgb(var(--color-ink-soft))' }}
      >
        {text}
      </span>
    </li>
  );
}
