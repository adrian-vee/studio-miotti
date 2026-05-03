'use client';

/**
 * Credibility — 4 card statement.
 *
 * Stagger reveal scroll-triggered (gsap.context).
 * Hover: lieve elevazione + filetto oro animato in basso (.card-service::before).
 * Asimmetria: la prima card ha eyebrow bigger e occupa più spazio visivo.
 */

import { useGsapReveal } from '@/hooks/useGsapReveal';
import { CREDIBILITY } from '@/lib/site-data';

export function Credibility() {
  const ref = useGsapReveal<HTMLElement>({ y: 32, stagger: 0.09 });

  return (
    <section ref={ref} className="relative bg-paper py-24 md:py-32">
      <div className="container-page">
        {/* Header asimmetrico: 4 colonne titolo / 8 colonne lead */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
          <div className="col-span-12 md:col-span-4" data-reveal>
            <span className="eyebrow-num">
              <strong>02 ·</strong> Credibilità
            </span>
            <h2
              className="mt-6 font-display text-ink"
              style={{ fontSize: 'var(--fs-display-l)', lineHeight: 1.04, letterSpacing: '-0.02em' }}
            >
              Quattro punti fermi.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6" data-reveal>
            <p className="text-lg text-ink-soft" style={{ lineHeight: 1.55 }}>
              Niente promesse di "eccellenza". Solo il modo in cui lavoriamo,
              ogni giorno, su ogni pratica. Quello che puoi aspettarti dal primo
              colloquio fino alla chiusura del fascicolo.
            </p>
          </div>
        </div>

        {/* Griglia 4 card */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CREDIBILITY.map((c, i) => (
            <article
              key={c.title}
              data-reveal
              className="card-service group flex h-full flex-col"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3
                className="mt-5 font-display text-ink transition-colors group-hover:text-cobalt"
                style={{ fontSize: '1.5rem', lineHeight: 1.2 }}
              >
                {c.title}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-[1.55] text-graphite">
                {c.body}
              </p>
              <span
                aria-hidden
                className="mt-auto inline-flex items-center gap-2 pt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite"
              >
                <span className="h-px w-6" style={{ background: 'rgb(var(--color-gold))' }} />
                Punto fermo
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
