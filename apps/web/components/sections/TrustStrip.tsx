'use client';

import { Scale, Shield, Clock4, MapPin, BookMarked } from 'lucide-react';

/**
 * TRUST STRIP — sotto Hero
 *
 * Strip editoriale sobria con i 5 marker di affidabilità dello Studio.
 * Niente loghi finti, niente "as seen on": è uno studio di provincia,
 * non una scale-up. Marker reali: Foro, anno iscrizione albo, GDPR,
 * sede, lingue.
 *
 * Layout: marquee infinito su mobile (touch-scroll), grid statica desktop.
 */

const markers = [
  {
    icon: Scale,
    label: 'Foro di Verona',
    sub: 'Iscritto all\'Albo dal 2003',
  },
  {
    icon: Shield,
    label: 'Conformità GDPR',
    sub: 'Riservatezza professionale',
  },
  {
    icon: Clock4,
    label: 'Risposta entro 24 h',
    sub: 'In giorni lavorativi',
  },
  {
    icon: MapPin,
    label: 'San Bonifacio · Verona',
    sub: 'Sede unica, segreteria sempre raggiungibile',
  },
  {
    icon: BookMarked,
    label: 'Aggiornamento continuo',
    sub: 'Formazione professionale annuale',
  },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Garanzie professionali dello Studio"
      className="relative bg-paper-warm border-y border-rule/60 py-6 md:py-8 overflow-hidden"
    >
      {/* Hairline cobalt-oro top */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgb(var(--color-cobalt)/0.4) 30%, rgb(var(--color-gold)/0.5) 70%, transparent 100%)',
        }}
      />

      {/* Desktop: grid statica */}
      <div className="container-page hidden md:block">
        <ul className="grid grid-cols-5 gap-x-[var(--gutter)]">
          {markers.map((m) => (
            <li
              key={m.label}
              className="flex items-start gap-3 py-1"
            >
              <m.icon
                size={18}
                strokeWidth={1.4}
                className="text-cobalt mt-0.5 shrink-0"
                aria-hidden
              />
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
                  {m.label}
                </p>
                <p className="text-[12px] text-graphite leading-snug truncate">
                  {m.sub}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile: marquee infinita */}
      <div className="md:hidden overflow-hidden">
        <ul
          className="marquee-track gap-12 px-4"
          aria-hidden="true"
        >
          {[...markers, ...markers].map((m, i) => (
            <li
              key={`${m.label}-${i}`}
              className="flex items-center gap-2 shrink-0"
            >
              <m.icon
                size={16}
                strokeWidth={1.4}
                className="text-cobalt"
                aria-hidden
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
                {m.label}
              </span>
              <span aria-hidden className="text-rule">·</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
