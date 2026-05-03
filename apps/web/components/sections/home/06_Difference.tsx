'use client';

/**
 * 06 · BLOCCO DIFFERENZIAZIONE — testo diretto, ad impatto.
 *
 * Quattro frasi-statement, ognuna su una riga, scala display grande.
 * Hover: highlight oro + filetto orizzontale che si estende.
 * Movimento: ogni frase entra con leggero translate-x da sinistra.
 *
 * Sfondo: grigio chiaro caldo (#CFCAC4 — paper-warm) per pausa
 * cromatica dopo le sezioni scure.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ensureGsap, prefersReducedMotion } from '@/lib/animations';

const POINTS = [
  { n: '01', text: 'Risposte rapide.' },
  { n: '02', text: 'Comunicazione chiara.' },
  { n: '03', text: 'Gestione digitale.' },
  { n: '04', text: 'Nessun linguaggio inutile.' },
] as const;

export function DifferenceSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      gsap.from('[data-diff-line]', {
        x: -36,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });

      gsap.from('[data-diff-meta]', {
        opacity: 0,
        y: 14,
        duration: 0.85,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      });

      // Filetti orizzontali draw
      gsap.from('[data-diff-rule]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative bg-paper-warm text-ink"
      aria-labelledby="diff-title"
    >
      <div className="container-page relative py-32 md:py-40">
        <header className="grid grid-cols-12 gap-x-[var(--gutter)]">
          <div className="col-span-12 md:col-span-6">
            <span
              data-diff-meta
              className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-graphite"
            >
              <span aria-hidden className="h-px w-12" style={{ background: 'rgb(var(--color-cobalt))' }} />
              Capitolo V · Differenza
            </span>
            <h2
              id="diff-title"
              data-diff-meta
              className="mt-8 font-display"
              style={{
                fontSize: 'var(--fs-display-l)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                color: 'rgb(var(--color-cobalt-deep))',
              }}
            >
              Quattro promesse,
              <br />
              <em className="not-italic" style={{ color: 'rgb(var(--color-gold-deep))' }}>
                quattro fatti.
              </em>
            </h2>
          </div>
        </header>

        <ul className="mt-20 space-y-1 md:mt-28">
          {POINTS.map((p) => (
            <li key={p.n} className="group">
              <span
                aria-hidden
                data-diff-rule
                className="block h-px w-full"
                style={{ background: 'rgb(var(--color-cobalt) / 0.18)' }}
              />
              <div
                className="grid grid-cols-12 items-center gap-x-[var(--gutter)] py-7 md:py-9"
              >
                <span
                  data-diff-meta
                  className="col-span-3 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite md:col-span-2"
                >
                  § {p.n}
                </span>
                <span
                  data-diff-line
                  className="col-span-9 font-display transition-colors duration-500 group-hover:text-[rgb(var(--color-gold-deep))] md:col-span-10"
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    lineHeight: 1.02,
                    letterSpacing: '-0.02em',
                    color: 'rgb(var(--color-cobalt-deep))',
                    fontStyle: 'italic',
                    fontWeight: 500,
                  }}
                >
                  {p.text}
                </span>
              </div>
            </li>
          ))}
          <li>
            <span
              aria-hidden
              data-diff-rule
              className="block h-px w-full"
              style={{ background: 'rgb(var(--color-gold) / 0.6)' }}
            />
          </li>
        </ul>
      </div>
    </section>
  );
}
