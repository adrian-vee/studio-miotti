'use client';

/**
 * Differentiation — "Perché scegliere lo Studio Miotti".
 *
 * Layout:
 *  · Desktop 12-col: titolo + lead a sinistra (col 1-5), elenco numerato
 *    a destra (col 7-12) con linea progressiva verticale che collega i 6 punti.
 *  · Mobile: stack verticale, linea sul lato sinistro dei numeri.
 *
 * Animazioni GSAP:
 *  · Linea verticale: scaleY 0→1 con scrub leggero (ScrollTrigger).
 *  · Punti: stagger fade-up.
 *  · Hover: numero diventa cobalt + bordo sinistro oro + lieve elevazione.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ensureGsap, prefersReducedMotion } from '@/lib/animations';
import { DIFFERENTIATORS } from '@/lib/site-data';

export function Differentiation() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // Stagger reveal sui punti (mobile e desktop)
      gsap.from('[data-diff-item]', {
        y: 24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });

      // Header reveal
      gsap.from('[data-diff-head]', {
        y: 20,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 78%', once: true },
      });

      // Linea progressiva verticale: scaleY 0→1 con scrub.
      const line = el.querySelector<HTMLElement>('[data-diff-line]');
      if (line) {
        if (reduced) {
          gsap.set(line, { scaleY: 1, transformOrigin: 'top center' });
        } else {
          gsap.fromTo(
            line,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: el.querySelector('[data-diff-list]') ?? el,
                start: 'top 70%',
                end: 'bottom 70%',
                scrub: 0.6,
              },
            },
          );
        }
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="differenziazione"
      className="relative bg-paper py-24 md:py-32"
      aria-labelledby="diff-title"
    >
      <div className="container-page">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12">
          {/* ── Sinistra: titolo + lead ── */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <span className="eyebrow-num" data-diff-head>
              <strong>05 ·</strong> Differenza
            </span>
            <h2
              id="diff-title"
              data-diff-head
              className="mt-6 font-display text-ink"
              style={{
                fontSize: 'var(--fs-display-l)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
              }}
            >
              Perché scegliere lo{' '}
              <span className="italic text-cobalt">Studio Miotti.</span>
            </h2>
            <p
              data-diff-head
              className="mt-7 max-w-md text-[1.0625rem] text-ink-soft"
              style={{ lineHeight: 1.6 }}
            >
              Sei differenze concrete. Niente claim di "eccellenza", niente
              elenchi di anni di esperienza. Solo cosa cambia, in pratica,
              quando affidi la tua pratica a questo studio.
            </p>

            <p
              data-diff-head
              className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.22em] text-graphite"
            >
              Sei punti · da I a VI
            </p>
          </div>

          {/* ── Destra: lista numerata con linea progressiva ── */}
          <ol
            data-diff-list
            className="relative col-span-12 md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6"
          >
            {/* Linea base */}
            <span
              aria-hidden
              className="absolute left-3 top-2 bottom-2 w-px md:left-5"
              style={{ background: 'rgb(var(--color-rule) / 0.18)' }}
            />
            {/* Linea progressiva */}
            <span
              data-diff-line
              aria-hidden
              className="absolute left-3 top-2 bottom-2 w-px md:left-5"
              style={{
                background:
                  'linear-gradient(180deg, rgb(var(--color-cobalt)) 0%, rgb(var(--color-gold)) 100%)',
                transform: 'scaleY(0)',
                transformOrigin: 'top center',
              }}
            />

            {DIFFERENTIATORS.map((d) => (
              <li
                key={d.n}
                data-diff-item
                className="group relative pl-12 transition-colors duration-500 md:pl-16"
              >
                <article
                  className="border-l border-transparent py-7 pl-5 pr-4 transition-all duration-500 group-hover:border-l-[rgb(var(--color-gold))] group-hover:bg-vellum md:py-8 md:pl-7"
                  style={{ borderLeftWidth: '2px' }}
                >
                  {/* Numero come nodo della timeline */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-7 inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-mono font-medium tracking-[0.04em] transition-colors duration-500 md:left-2 md:top-8"
                    style={{
                      background: 'rgb(var(--color-paper))',
                      border: '1px solid rgb(var(--color-cobalt))',
                      color: 'rgb(var(--color-cobalt))',
                    }}
                  >
                    {d.n}
                  </span>

                  <h3
                    className="font-display text-ink transition-colors group-hover:text-cobalt"
                    style={{ fontSize: '1.375rem', lineHeight: 1.2, letterSpacing: '-0.005em' }}
                  >
                    {d.title}
                  </h3>
                  <p className="mt-2.5 max-w-2xl text-[0.9375rem] leading-[1.6] text-graphite">
                    {d.body}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
