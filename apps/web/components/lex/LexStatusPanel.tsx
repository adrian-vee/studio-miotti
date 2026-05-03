'use client';

/**
 * LexStatusPanel — sidebar dashboard LEX.
 *
 * Mostra:
 *  · Stato richiesta (in bozza / inviata / presa in carico).
 *  · Contatore documenti caricati.
 *  · Prossimi passi (3 step ordinati).
 *  · Contatto studio diretto.
 */

import { Phone, MapPin, Clock4, ChevronRight, Files } from 'lucide-react';
import { SITE_DATA } from '@/lib/site-data';

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

  const statusTone =
    status === 'draft' ? 'graphite' : status === 'sent' ? 'gold' : 'success';

  const toneColor =
    statusTone === 'gold'
      ? 'rgb(var(--color-gold))'
      : statusTone === 'success'
        ? 'rgb(var(--color-success))'
        : 'rgb(var(--color-graphite))';

  return (
    <aside className="flex flex-col gap-4">
      {/* Stato richiesta */}
      <section
        className="rounded-[4px] border bg-vellum p-4"
        style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
      >
        <h4 className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: 'rgb(var(--color-graphite))' }}>
          Stato richiesta
        </h4>
        <div className="mt-3 flex items-center gap-2">
          <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: toneColor }} />
          <span
            className="font-display"
            style={{ fontSize: '1rem', lineHeight: 1.2, color: 'rgb(var(--color-cobalt-deep))' }}
          >
            {statusLabel}
          </span>
        </div>
        <p className="mt-2 text-[0.8125rem] leading-[1.5] text-graphite">
          La presa in carico avviene solo dopo conferma dello studio.
        </p>
      </section>

      {/* Documenti caricati */}
      <section
        className="rounded-[4px] border bg-vellum p-4"
        style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
      >
        <h4 className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: 'rgb(var(--color-graphite))' }}>
          Documenti
        </h4>
        <div className="mt-3 flex items-center gap-2.5">
          <span
            aria-hidden
            className="inline-flex h-8 w-8 items-center justify-center rounded-[3px]"
            style={{ background: 'rgb(var(--color-paper-warm) / 0.5)', color: 'rgb(var(--color-cobalt))' }}
          >
            <Files size={14} strokeWidth={1.6} />
          </span>
          <div>
            <span
              className="block font-display"
              style={{ fontSize: '1rem', lineHeight: 1.2, color: 'rgb(var(--color-cobalt-deep))' }}
            >
              {documentsCount} {documentsCount === 1 ? 'file caricato' : 'file caricati'}
            </span>
            <span className="block text-[0.75rem] text-graphite">
              {documentsCount === 0 ? 'Aggiungili dal pannello sopra' : 'Pronti per la trasmissione'}
            </span>
          </div>
        </div>
      </section>

      {/* Prossimi passi */}
      <section
        className="rounded-[4px] border bg-vellum p-4"
        style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
      >
        <h4 className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: 'rgb(var(--color-graphite))' }}>
          Prossimi passi
        </h4>
        <ol className="mt-3 space-y-2.5 text-[0.8125rem]">
          <Step n="1" text="Descrivi il caso e carica documenti utili." />
          <Step n="2" text="Invia la richiesta allo studio." />
          <Step n="3" text="Conferma in 24–48 h, con stima costi." />
        </ol>
      </section>

      {/* Contatto studio */}
      <section
        className="rounded-[4px] border bg-cobalt-deep p-4 text-paper"
        style={{ borderColor: 'rgb(var(--color-cobalt))' }}
      >
        <h4 className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: 'rgb(var(--color-gold))' }}>
          Contatta direttamente
        </h4>
        <ul className="mt-3 space-y-2.5 text-[0.875rem]">
          <li className="flex items-center gap-2">
            <Phone size={13} style={{ color: 'rgb(var(--color-gold))' }} />
            <a href={`tel:${SITE_DATA.phoneTel}`} className="hover:underline">
              {SITE_DATA.phoneDisplay}
            </a>
          </li>
          <li className="flex items-start gap-2">
            <MapPin size={13} className="mt-0.5" style={{ color: 'rgb(var(--color-gold))' }} />
            <span style={{ color: 'rgb(var(--color-paper) / 0.85)' }}>
              {SITE_DATA.address.street}, {SITE_DATA.address.cap} {SITE_DATA.address.city}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Clock4 size={13} style={{ color: 'rgb(var(--color-gold))' }} />
            <span style={{ color: 'rgb(var(--color-paper) / 0.85)' }}>{SITE_DATA.hours.short}</span>
          </li>
        </ul>
      </section>
    </aside>
  );
}

function Step({ n, text }: { n: string; text: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        aria-hidden
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px]"
        style={{
          background: 'rgb(var(--color-cobalt))',
          color: 'rgb(var(--color-gold))',
        }}
      >
        {n}
      </span>
      <span className="text-ink-soft" style={{ lineHeight: 1.45 }}>
        {text}
      </span>
      <ChevronRight size={11} className="ml-auto mt-1 text-graphite" />
    </li>
  );
}
