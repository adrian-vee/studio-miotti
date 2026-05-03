'use client';

/**
 * 02 · TRANSIZIONE DRAMMATICA — reveal titolo principale.
 *
 * "Soluzioni legali concrete."
 *
 * Sequenza:
 *  · 4 linee SVG che si disegnano (drawPath fallback) e formano una cornice
 *    asimmetrica attorno al titolo.
 *  · Headline in 3 righe sfalsate, char-stagger reveal con ease cinematica.
 *  · Sottotitolo demoted, oro, fade ritardato.
 *
 * Background: blu notte → leggero virage gold-accented.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ensureGsap, prefersReducedMotion, splitToChars, drawPath } from '@/lib/animations';

export function TitleRevealSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // Linee disegnate
      const paths = el.querySelectorAll<SVGPathElement>('[data-draw-path]');
      paths.forEach((p, i) => {
        drawPath(p, {
          duration: 1.6,
          delay: i * 0.12,
          ease: 'power3.out',
          trigger: el,
        });
      });

      // Char split per ogni riga del titolo
      el.querySelectorAll<HTMLElement>('[data-line]').forEach((line, i) => {
        const chars = splitToChars(line);
        if (reduced) {
          gsap.set(chars, { y: 0, opacity: 1 });
          return;
        }
        gsap.from(chars, {
          y: '105%',
          opacity: 0,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.018,
          scrollTrigger: { trigger: el, start: 'top 70%', once: true },
          delay: 0.2 + i * 0.18,
        });
      });

      gsap.from('[data-sub-meta]', {
        opacity: 0,
        y: 14,
        duration: 1,
        ease: 'power2.out',
        delay: 1.2,
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-cobalt-deep text-paper"
      aria-labelledby="title-reveal"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 80% 20%, rgb(198 168 107 / 0.14) 0%, transparent 60%)',
        }}
      />

      {/* Linee SVG draw */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1320 800"
        preserveAspectRatio="none"
      >
        <path
          data-draw-path
          d="M 60 120 L 460 120"
          fill="none"
          stroke="rgb(198 168 107)"
          strokeWidth={1}
          strokeOpacity={0.7}
        />
        <path
          data-draw-path
          d="M 60 120 L 60 680"
          fill="none"
          stroke="rgb(244 242 238)"
          strokeWidth={1}
          strokeOpacity={0.18}
        />
        <path
          data-draw-path
          d="M 1260 200 L 1260 720"
          fill="none"
          stroke="rgb(198 168 107)"
          strokeWidth={1}
          strokeOpacity={0.5}
        />
        <path
          data-draw-path
          d="M 880 720 L 1260 720"
          fill="none"
          stroke="rgb(244 242 238)"
          strokeWidth={1}
          strokeOpacity={0.18}
        />
      </svg>

      <div className="container-page relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-12 gap-x-[var(--gutter)]">
          <div className="col-span-12 md:col-span-11 lg:col-span-10">
            <span
              data-sub-meta
              className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em]"
              style={{ color: 'rgb(var(--color-gold))' }}
            >
              Capitolo I · Studio
            </span>

            <h2
              id="title-reveal"
              className="relative mt-10 font-display"
              style={{
                fontWeight: 500,
                letterSpacing: '-0.025em',
                color: 'rgb(var(--color-paper))',
              }}
            >
              <span
                data-line
                className="block"
                style={{
                  fontSize: 'clamp(3rem, 9vw, 8rem)',
                  lineHeight: 0.94,
                }}
              >
                Soluzioni
              </span>
              <span
                data-line
                className="mt-1 block italic md:mt-3"
                style={{
                  fontSize: 'clamp(3.25rem, 10vw, 9rem)',
                  lineHeight: 0.96,
                  color: 'rgb(var(--color-gold))',
                  paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                legali
              </span>
              <span
                data-line
                className="mt-1 block md:mt-3"
                style={{
                  fontSize: 'clamp(3rem, 9vw, 8rem)',
                  lineHeight: 0.94,
                  paddingLeft: 'clamp(3rem, 12vw, 11rem)',
                }}
              >
                concrete.
              </span>
            </h2>

            <p
              data-sub-meta
              className="mt-12 max-w-xl text-[1.0625rem]"
              style={{ color: 'rgb(var(--color-paper) / 0.7)', lineHeight: 1.6 }}
            >
              Ti aiutiamo a gestire problemi legali in modo chiaro e ordinato.
              Risposte rapide, costi indicati prima del mandato, aggiornamenti
              costanti.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
