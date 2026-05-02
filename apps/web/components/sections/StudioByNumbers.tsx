'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { SectionMarker } from './SectionMarker';

/**
 * STUDIO BY NUMBERS — editoriale numerica
 *
 * Sezione "Lex Lab": 4 numeri che dicono qualcosa di vero sullo Studio.
 * Counter animato (CountUp) attivato quando entra in viewport.
 * Niente marketing inflazionato (no "1000+ casi vinti"): solo dati reali
 * e verificabili. Il numero parla, il sottotitolo lo contestualizza.
 *
 * Layout: 4 col, separati da hairline verticali, baseline-aligned.
 */

const stats = [
  {
    n: 22,
    suffix: '+',
    label: 'Anni di esercizio',
    sub: 'Iscritto all\'Albo del Foro di Verona dal 2003.',
  },
  {
    n: 6,
    suffix: '',
    label: 'Aree di diritto civile',
    sub: 'Famiglia · Lavoro · Crediti · Immobiliare · Responsabilità · Civile.',
  },
  {
    n: 24,
    suffix: ' h',
    label: 'Risposta garantita',
    sub: 'Su ogni nuova richiesta, in giorni lavorativi.',
  },
  {
    n: 100,
    suffix: ' %',
    label: 'Continuità di rapporto',
    sub: 'L\'avvocato che incontra è quello che la segue dall\'inizio alla fine.',
  },
];

export function StudioByNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section
      ref={ref}
      className="relative bg-paper py-20 md:py-28 overflow-hidden"
      aria-labelledby="numeri-heading"
    >
      <SectionMarker numeral="II" label="Lex Lab" align="left" showLabel={false} />

      {/* Hairline gold ornamentale top — solo decorativa */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgb(var(--color-gold)) 50%, transparent)',
        }}
      />

      <div className="container-page">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow">§ 02 · Lex Lab</span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              id="numeri-heading"
              className="font-display text-balance"
              style={{ fontSize: 'var(--fs-display-m)', lineHeight: 1.05 }}
            >
              Quattro numeri.
              <br />
              <span className="italic text-cobalt">Tutti verificabili.</span>
            </h2>
            <p className="mt-6 text-graphite max-w-xl text-lg leading-relaxed">
              Niente marketing inflazionato, niente percentuali inventate.
              Solo i dati che descrivono come lavora lo Studio, oggi.
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <ul className="grid grid-cols-2 lg:grid-cols-4 border-t border-rule">
          {stats.map((s, i) => (
            <li
              key={s.label}
              className={[
                'p-6 md:p-10 border-b border-rule',
                i < stats.length - 1 ? 'lg:border-r' : '',
                i % 2 === 0 ? 'border-r lg:border-r' : '',
              ].join(' ')}
            >
              <CounterNumber
                target={s.n}
                suffix={s.suffix}
                play={inView}
                delay={i * 120}
              />

              <p className="mt-4 font-display text-xl md:text-2xl text-ink leading-snug">
                {s.label}
              </p>
              <p className="mt-3 text-sm text-graphite leading-relaxed">
                {s.sub}
              </p>

              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.4 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block h-px w-12 bg-gold mt-6 origin-left"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * CounterNumber — easing cubic-out, durata 1.8s, rispetta reduced-motion.
 */
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
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [play, target, delay]);

  return (
    <p
      className="font-display text-grad-display tabular-nums"
      style={{
        fontSize: 'var(--fs-counter)',
        lineHeight: 0.9,
        letterSpacing: '-0.03em',
        fontWeight: 400,
      }}
    >
      {value}
      <span className="text-cobalt opacity-70">{suffix}</span>
    </p>
  );
}
