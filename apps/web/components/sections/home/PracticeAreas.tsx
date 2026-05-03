'use client';

/**
 * PracticeAreas — "Le aree in cui possiamo aiutarti."
 *
 * Griglia premium 4×2 (desktop) di 8 aree, ognuna con:
 *  · icona lineare custom (PracticeGlyph)
 *  · titolo display
 *  · descrizione breve concreta
 *  · micro CTA "Approfondisci →"
 *  · hover: filetto oro che cresce + lieve translate icona
 *
 * Sfondo: blu notte profondo. Bordi sottili oro/paper a basso contrasto.
 */

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { ensureGsap } from '@/lib/animations';
import { PRACTICE_AREAS } from '@/lib/site-data';
import { PracticeGlyph } from '../_glyphs/PracticeGlyph';

export function PracticeAreas() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const ctx = gsap.context(() => {
      gsap.from('[data-area-head]', {
        y: 22,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 78%', once: true },
      });
      gsap.from('[data-area-card]', {
        y: 30,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: '[data-area-grid]', start: 'top 80%', once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="aree"
      className="relative overflow-hidden bg-night text-paper"
      aria-labelledby="areas-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 80% 30%, rgb(198 168 107 / 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="container-page relative py-28 md:py-36">
        {/* Header */}
        <header className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6">
          <div className="col-span-12 md:col-span-6">
            <span
              data-area-head
              className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em]"
              style={{ color: 'rgb(var(--color-gold))' }}
            >
              <span aria-hidden className="h-px w-12 bg-gold" />
              Capitolo II · Aree
            </span>
            <h2
              id="areas-title"
              data-area-head
              className="mt-6 font-display"
              style={{
                fontSize: 'var(--fs-display-l)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                color: 'rgb(var(--color-paper))',
              }}
            >
              Le aree in cui possiamo
              <br />
              <em className="not-italic" style={{ color: 'rgb(var(--color-gold))' }}>
                aiutarti.
              </em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8" data-area-head>
            <p
              className="text-[1.0625rem]"
              style={{ color: 'rgb(var(--color-paper) / 0.78)', lineHeight: 1.6 }}
            >
              Otto aree con un solo metodo. Lo studio si concentra sul diritto
              civile in senso ampio: quando una pratica esce dal nostro
              perimetro, ti indichiamo un collega di fiducia.
            </p>
            <Link
              href="/aree-di-competenza"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: 'rgb(var(--color-gold))' }}
            >
              Tutte le aree e i casi tipici
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </header>

        {/* Grid 8 aree */}
        <div
          data-area-grid
          className="mt-16 grid grid-cols-1 overflow-hidden border md:mt-24 md:grid-cols-2 lg:grid-cols-4"
          style={{ borderColor: 'rgb(244 242 238 / 0.10)' }}
        >
          {PRACTICE_AREAS.map((area, i) => (
            <Link
              key={area.slug}
              href={`/aree-di-competenza/${area.slug}`}
              data-area-card
              className="group relative block p-7 transition-colors duration-500 md:p-8"
              style={{
                borderRight: (i + 1) % 4 !== 0 ? '1px solid rgb(244 242 238 / 0.06)' : 'none',
                borderBottom: i < PRACTICE_AREAS.length - 4 ? '1px solid rgb(244 242 238 / 0.06)' : 'none',
              }}
            >
              {/* Glow gold su hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 60% at 50% 0%, rgb(198 168 107 / 0.10) 0%, transparent 65%)',
                }}
              />

              <header className="relative flex items-start justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'rgb(var(--color-paper) / 0.45)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]"
                  style={{
                    color: 'rgb(var(--color-gold))',
                    border: '1px solid rgb(244 242 238 / 0.14)',
                    background: 'rgb(244 242 238 / 0.02)',
                  }}
                  aria-hidden
                >
                  <PracticeGlyph name={area.glyph} size={16} />
                </span>
              </header>

              <h3
                className="relative mt-7 font-display transition-colors duration-300 group-hover:text-[rgb(var(--color-gold))]"
                style={{
                  fontSize: '1.375rem',
                  lineHeight: 1.2,
                  color: 'rgb(var(--color-paper))',
                }}
              >
                {area.title}
              </h3>
              <p
                className="relative mt-3 text-[0.875rem]"
                style={{ color: 'rgb(var(--color-paper) / 0.65)', lineHeight: 1.55 }}
              >
                {area.body}
              </p>

              <span
                className="relative mt-7 inline-flex items-center gap-2 text-[0.8125rem] font-medium"
                style={{ color: 'rgb(var(--color-gold))' }}
              >
                Approfondisci
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>

              {/* Filetto oro hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
                style={{ background: 'rgb(var(--color-gold))' }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
