'use client';

/**
 * PracticeAreas — 8 aree concrete dello studio.
 *
 * Layout editoriale: griglia asimmetrica 6/12 con eyebrow numerato e
 * link "Approfondisci" su ogni card. Icone vettoriali minimal-line custom
 * (nessuna libreria icon esterna oltre lucide).
 *
 * Animazione:
 *  · stagger reveal cards (useGsapReveal).
 *  · hover: micro-movimento icona, bordo si scalda (gold subtle).
 */

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { PRACTICE_AREAS } from '@/lib/site-data';
import { PracticeGlyph } from './_glyphs/PracticeGlyph';

export function PracticeAreas() {
  const ref = useGsapReveal<HTMLElement>({ y: 36, stagger: 0.06 });

  return (
    <section
      ref={ref}
      id="aree"
      className="relative bg-paper-warm py-24 md:py-32"
      aria-labelledby="practice-title"
    >
      {/* Filetto top */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'rgb(var(--color-rule) / 0.12)' }}
      />

      <div className="container-page">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
          <div className="col-span-12 md:col-span-5" data-reveal>
            <span className="eyebrow-num">
              <strong>03 ·</strong> Aree di attività
            </span>
            <h2
              id="practice-title"
              className="mt-6 font-display text-ink"
              style={{ fontSize: 'var(--fs-display-l)', lineHeight: 1.02, letterSpacing: '-0.02em' }}
            >
              Otto aree.
              <br />
              <span className="italic text-cobalt">Un solo metodo.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7" data-reveal>
            <p className="text-lg text-ink-soft" style={{ lineHeight: 1.55 }}>
              Ogni area corrisponde a un problema concreto, non a un capitolo di
              codice. Lo Studio si concentra sul diritto civile in senso ampio:
              quando una pratica esce dal nostro perimetro, ti indichiamo un
              collega di fiducia in Verona o nelle province limitrofe.
            </p>
            <Link
              href="/aree-di-competenza"
              className="link-arrow mt-6 inline-flex"
            >
              Vedi tutte le aree e i casi tipici
            </Link>
          </div>
        </div>

        {/* Grid 8 aree */}
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border md:grid-cols-2 lg:grid-cols-4"
          style={{ borderColor: 'rgb(var(--color-rule) / 0.12)', background: 'rgb(var(--color-rule) / 0.08)' }}>
          {PRACTICE_AREAS.map((area, i) => (
            <article
              key={area.slug}
              data-reveal
              className="group relative bg-vellum p-7 transition-colors duration-500 hover:bg-paper md:p-8"
            >
              <header className="mb-5 flex items-start justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]"
                  style={{
                    color: 'rgb(var(--color-cobalt))',
                    border: '1px solid rgb(var(--color-rule) / 0.18)',
                    background: 'rgb(var(--color-paper))',
                  }}
                  aria-hidden
                >
                  <PracticeGlyph name={area.glyph} size={16} />
                </span>
              </header>

              <h3
                className="font-display text-ink"
                style={{ fontSize: '1.375rem', lineHeight: 1.2 }}
              >
                {area.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.55] text-graphite">
                {area.body}
              </p>

              <Link
                href={`/aree-di-competenza/${area.slug}`}
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-cobalt"
              >
                Approfondisci
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              {/* Bordo animato in basso */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
                style={{ background: 'rgb(var(--color-gold))' }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
