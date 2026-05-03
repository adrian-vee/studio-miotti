'use client';

/**
 * 07 · TRANSIZIONE FINALE — respiro visivo.
 *
 * Quasi vuota. Una sola riga di testo che si rivela char-by-char,
 * un filetto verticale che si allunga, gradient che vira lentamente
 * dal grigio chiaro al blu notte (verso la CTA finale).
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ensureGsap, prefersReducedMotion, splitToChars } from '@/lib/animations';

export function BreathSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const headline = el.querySelector<HTMLElement>('[data-breath-line]');
      if (headline) {
        const chars = splitToChars(headline);
        if (reduced) {
          gsap.set(chars, { opacity: 1, y: 0 });
        } else {
          gsap.from(chars, {
            opacity: 0,
            y: 20,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.014,
            scrollTrigger: { trigger: el, start: 'top 75%', once: true },
          });
        }
      }

      gsap.from('[data-breath-rule]', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });

      // Vira gradient da paper-warm → cobalt-deep su scrub
      if (!reduced) {
        gsap.fromTo(
          el,
          { backgroundColor: 'rgb(207 202 196)' },
          {
            backgroundColor: 'rgb(11 37 58)',
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'rgb(207 202 196)' }}
    >
      <div
        data-breath-rule
        aria-hidden
        className="absolute left-1/2 top-0 hidden h-full w-px md:block"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgb(198 168 107 / 0.6) 50%, transparent 100%)',
        }}
      />

      <div className="container-page relative">
        <p
          data-breath-line
          className="mx-auto max-w-3xl text-center font-display italic"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            lineHeight: 1.4,
            color: 'rgb(var(--color-ink))',
            mixBlendMode: 'difference',
          }}
        >
          Una pratica chiusa con ordine vale più di una causa vinta in fretta.
        </p>
      </div>
    </section>
  );
}
