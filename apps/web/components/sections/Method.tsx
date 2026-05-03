'use client';

/**
 * Method — timeline 5 step.
 *
 * Desktop: timeline orizzontale con linea progressiva (ScrollTrigger scrub).
 * Mobile: timeline verticale, identico contenuto, identica progress line.
 *
 * Animazioni:
 *  · Linea base (rule) statica.
 *  · Linea progressiva: scaleX/scaleY 0→1 con scrub leggero.
 *  · Step reveal: numerini "01..05" tipografici e card body con stagger.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ensureGsap, prefersReducedMotion } from '@/lib/animations';
import { METHOD_STEPS } from '@/lib/site-data';

export function Method() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // Reveal step base (stagger su tutti gli step)
      gsap.from('[data-method-step]', {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });

      if (!reduced) {
        // Linea progressiva DESKTOP (orizzontale)
        const lineH = el.querySelector<HTMLElement>('[data-method-line-h]');
        if (lineH) {
          gsap.fromTo(
            lineH,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top 70%',
                end: 'bottom 65%',
                scrub: 0.6,
              },
            },
          );
        }
        // Linea progressiva MOBILE (verticale)
        const lineV = el.querySelector<HTMLElement>('[data-method-line-v]');
        if (lineV) {
          gsap.fromTo(
            lineV,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top 70%',
                end: 'bottom 65%',
                scrub: 0.6,
              },
            },
          );
        }
      } else {
        gsap.set('[data-method-line-h]', { scaleX: 1, transformOrigin: 'left center' });
        gsap.set('[data-method-line-v]', { scaleY: 1, transformOrigin: 'top center' });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="metodo"
      className="relative bg-paper py-24 md:py-32"
      aria-labelledby="method-title"
    >
      <div className="container-page">
        {/* Header asimmetrico */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow-num">
              <strong>04 ·</strong> Metodo
            </span>
            <h2
              id="method-title"
              className="mt-6 font-display text-ink"
              style={{ fontSize: 'var(--fs-display-l)', lineHeight: 1.04, letterSpacing: '-0.02em' }}
            >
              Un metodo chiaro,
              <br />
              <span className="italic text-cobalt">
                dalla prima analisi alla soluzione.
              </span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="text-lg text-ink-soft" style={{ lineHeight: 1.55 }}>
              Cinque passaggi visibili, ciascuno con un risultato concreto. Sai
              sempre dove siamo nel percorso, cosa è già stato fatto e cosa
              succede dopo. Niente parcelle che arrivano insieme alla notizia.
            </p>
          </div>
        </div>

        {/* ── DESKTOP: timeline orizzontale ── */}
        <div className="relative mt-20 hidden md:block">
          {/* Linea base + progress */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[2.25rem] h-px"
            style={{ background: 'rgb(var(--color-rule) / 0.18)' }}
          />
          <div
            data-method-line-h
            aria-hidden
            className="absolute left-0 right-0 top-[2.25rem] h-px"
            style={{
              background:
                'linear-gradient(90deg, rgb(var(--color-cobalt)) 0%, rgb(var(--color-gold)) 100%)',
              transform: 'scaleX(0)',
              transformOrigin: 'left center',
            }}
          />

          <div className="grid grid-cols-5 gap-x-[var(--gutter)]">
            {METHOD_STEPS.map((s) => (
              <div key={s.n} data-method-step className="relative pt-0">
                {/* Nodo */}
                <div className="flex justify-start">
                  <span
                    className="relative inline-flex h-[1.125rem] w-[1.125rem] items-center justify-center rounded-full"
                    style={{
                      background: 'rgb(var(--color-paper))',
                      border: '1px solid rgb(var(--color-cobalt))',
                      marginTop: '1.7rem',
                    }}
                    aria-hidden
                  >
                    <span
                      className="h-[6px] w-[6px] rounded-full"
                      style={{ background: 'rgb(var(--color-cobalt))' }}
                    />
                  </span>
                </div>
                <div className="mt-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                    Step {s.n}
                  </span>
                  <h3
                    className="mt-3 font-display text-ink"
                    style={{ fontSize: '1.375rem', lineHeight: 1.2 }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.55] text-graphite">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: timeline verticale ── */}
        <div className="relative mt-14 md:hidden">
          {/* Linea base */}
          <div
            aria-hidden
            className="absolute left-3 top-0 bottom-0 w-px"
            style={{ background: 'rgb(var(--color-rule) / 0.18)' }}
          />
          <div
            data-method-line-v
            aria-hidden
            className="absolute left-3 top-0 bottom-0 w-px"
            style={{
              background:
                'linear-gradient(180deg, rgb(var(--color-cobalt)) 0%, rgb(var(--color-gold)) 100%)',
              transform: 'scaleY(0)',
              transformOrigin: 'top center',
            }}
          />

          <ol className="space-y-12 pl-10">
            {METHOD_STEPS.map((s) => (
              <li key={s.n} data-method-step className="relative">
                <span
                  className="absolute -left-10 top-1.5 inline-flex h-[1.125rem] w-[1.125rem] items-center justify-center rounded-full"
                  style={{
                    background: 'rgb(var(--color-paper))',
                    border: '1px solid rgb(var(--color-cobalt))',
                  }}
                  aria-hidden
                >
                  <span
                    className="h-[6px] w-[6px] rounded-full"
                    style={{ background: 'rgb(var(--color-cobalt))' }}
                  />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                  Step {s.n}
                </span>
                <h3
                  className="mt-2 font-display text-ink"
                  style={{ fontSize: '1.375rem', lineHeight: 1.2 }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.55] text-graphite">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
