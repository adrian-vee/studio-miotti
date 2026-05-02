'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Scale, Users, Compass, MapPin } from 'lucide-react';

/**
 * SEZIONE CREDIBILITÀ
 *
 * Quattro pilastri che stabiliscono affidabilità senza marketing finto:
 *  · 22 anni di esperienza (iscrizione albo dal 2003)
 *  · Centinaia di clienti seguiti (privati + imprese del territorio)
 *  · Approccio diretto: l'avvocato che incontra è quello che la segue
 *  · Focus territorio: San Bonifacio, Bassa Veronese, Verona e provincia
 *
 * Layout: header diretto + 4 card con counter animato dove sensato.
 * Tono: professionale ma vicino, niente "international firm".
 */

const pillars = [
  {
    icon: Scale,
    n: 22,
    suffix: '+',
    title: 'Anni di esperienza',
    body: 'Iscritto all\'Albo del Foro di Verona dal 2003. Una pratica continuativa nel diritto civile, di famiglia, del lavoro e d\'impresa.',
  },
  {
    icon: Users,
    n: 600,
    suffix: '+',
    title: 'Clienti seguiti',
    body: 'Privati, professionisti e PMI della Bassa Veronese accompagnati nelle loro questioni legali, dalle più semplici alle più complesse.',
  },
  {
    icon: Compass,
    n: null,
    suffix: '',
    inlineLabel: 'Diretto',
    title: 'Approccio diretto',
    body: 'Niente filtri, niente intermediari. Parla con l\'avvocato che segue il suo caso dalla prima telefonata fino alla chiusura della pratica.',
  },
  {
    icon: MapPin,
    n: null,
    suffix: '',
    inlineLabel: 'VR · Bassa',
    title: 'Forte presenza locale',
    body: 'Sede a San Bonifacio, presenza costante nei tribunali di Verona e Vicenza. Conosciamo il territorio e i suoi tempi.',
  },
];

export function Credibility() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section
      ref={ref}
      className="relative bg-paper py-20 md:py-28"
      aria-labelledby="credibilita-heading"
    >
      <div className="container-page">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow">01 — Chi siamo</span>
            <h2
              id="credibilita-heading"
              className="font-display text-balance mt-5 text-ink"
              style={{
                fontSize: 'var(--fs-display-m)',
                lineHeight: 1.08,
                letterSpacing: '-0.018em',
                fontWeight: 500,
              }}
            >
              Vent'anni di pratica.{' '}
              <span className="italic text-cobalt">Un solo riferimento</span>{' '}
              per i suoi problemi legali.
            </h2>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7 self-end">
            <p className="text-graphite text-lg leading-relaxed max-w-xl">
              Lo Studio Legale Miotti è radicato a San Bonifacio dal 2003.
              In questi anni abbiamo seguito famiglie, imprenditori e
              professionisti del territorio, costruendo rapporti di fiducia
              che durano nel tempo.
            </p>
          </div>
        </div>

        {/* Pillar cards */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-rule/40 border border-rule/40">
          {pillars.map((p, i) => (
            <li
              key={p.title}
              className="bg-paper p-7 md:p-8 flex flex-col"
            >
              <p.icon
                size={24}
                strokeWidth={1.4}
                className="text-cobalt mb-6"
                aria-hidden
              />
              {p.n !== null ? (
                <CounterNumber
                  target={p.n}
                  suffix={p.suffix}
                  play={inView}
                  delay={i * 120}
                />
              ) : (
                <p
                  className="font-display text-ink leading-none tabular-nums"
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {p.inlineLabel}
                </p>
              )}
              <p className="font-display text-xl text-ink mt-4 leading-snug">
                {p.title}
              </p>
              <p className="mt-3 text-sm text-graphite leading-relaxed">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CounterNumber({
  target,
  suffix = '',
  play,
  delay = 0,
}: {
  target: number;
  suffix?: string;
  play: boolean;
  delay?: number;
}) {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    if (!play) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const duration = 1800;
    const startAt = performance.now() + delay;
    function frame(t: number) {
      if (t < startAt) {
        raf = requestAnimationFrame(frame);
        return;
      }
      if (!start) start = t;
      const elapsed = t - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [play, target, delay]);

  return (
    <p
      className="font-display text-ink leading-none tabular-nums"
      style={{
        fontSize: 'clamp(2.25rem, 4vw, 3rem)',
        fontWeight: 500,
        letterSpacing: '-0.02em',
      }}
    >
      {value}
      <span className="text-gold-deep">{suffix}</span>
    </p>
  );
}
