'use client';

/**
 * 01 · INTRO IMMERSIVA — fullscreen, quasi vuoto.
 *
 * "Ogni problema legale ha un punto di partenza."
 *
 * Animazioni:
 *  · fade + scale lenta del testo (cinematico, 1.6s)
 *  · grain overlay
 *  · pin breve (200px) per dare percezione di "blocco" iniziale,
 *    senza impedire lo scroll
 *  · linea oro sottile pulsante in basso ("scroll")
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ensureGsap, prefersReducedMotion, splitToChars } from '@/lib/animations';

export function IntroSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const headline = el.querySelector<HTMLElement>('[data-intro-headline]');
      if (headline) {
        const chars = splitToChars(headline);
        if (reduced) {
          gsap.set(chars, { opacity: 1, y: 0 });
        } else {
          gsap.from(chars, {
            opacity: 0,
            y: 24,
            duration: 1.4,
            ease: 'power3.out',
            stagger: 0.012,
            delay: 0.4,
          });
        }
      }

      gsap.from('[data-intro-meta]', {
        opacity: 0,
        y: 12,
        duration: 1.1,
        ease: 'power2.out',
        delay: 1.2,
        stagger: 0.1,
      });

      // Aurora glow scale
      if (!reduced) {
        gsap.from('[data-intro-aurora]', {
          opacity: 0,
          scale: 1.06,
          duration: 2.2,
          ease: 'power2.out',
        });

        // Pin breve per percezione di "fermo": 0 → 200px scroll
        ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          end: '+=200',
          pin: true,
          pinSpacing: false,
        });

        // Outro: fade + scale-down della headline mentre si esce
        gsap.to('[data-intro-fade]', {
          opacity: 0,
          y: -40,
          scale: 0.96,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=400',
            scrub: 0.6,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-night text-paper"
      aria-labelledby="intro-title"
    >
      {/* Aurora glow */}
      <div
        data-intro-aurora
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgb(198 168 107 / 0.10) 0%, transparent 60%)',
        }}
      />

      {/* Texture grain (chiaro, sottile) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="container-page relative" style={{ zIndex: 1 }}>
        <div data-intro-fade className="grid grid-cols-12 gap-x-[var(--gutter)]">
          <div className="col-span-12 md:col-span-10 lg:col-span-9">
            <span
              data-intro-meta
              className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em]"
              style={{ color: 'rgb(var(--color-paper) / 0.55)' }}
            >
              <span
                aria-hidden
                className="h-px w-12"
                style={{ background: 'rgb(var(--color-gold))' }}
              />
              Studio Legale Miotti · MMXXVI
            </span>

            <h1
              id="intro-title"
              data-intro-headline
              className="mt-10 font-display"
              style={{
                fontSize: 'var(--fs-display-xl)',
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
                fontWeight: 400,
                color: 'rgb(var(--color-paper))',
                fontStyle: 'italic',
              }}
            >
              Ogni problema legale ha un punto di partenza.
            </h1>

            <p
              data-intro-meta
              className="mt-10 max-w-md font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: 'rgb(var(--color-paper) / 0.55)' }}
            >
              San Bonifacio · VR · Italia
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-intro-meta
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-hidden
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.32em]"
          style={{ color: 'rgb(var(--color-paper) / 0.5)' }}
        >
          Scorri
        </span>
        <span
          className="block h-10 w-px"
          style={{
            background:
              'linear-gradient(180deg, rgb(var(--color-gold) / 0.8), transparent)',
            animation: 'lex-breath 3s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
