'use client';

/**
 * Differentiation — "Quattro fatti, prima di ogni promessa."
 *
 * 4 punti compatti, ognuno con frase forte + descrizione concreta + glifo
 * minimale. Layout 2×2 desktop, stack mobile. Hover: bordo che vira oro,
 * glifo che ruota leggermente, spostamento orizzontale del titolo.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ensureGsap } from '@/lib/animations';
import { Clock4, FileText, Coins, Bell } from 'lucide-react';

const FACTS = [
  {
    n: '01',
    title: 'Risposte chiare',
    body: 'Ogni richiesta viene tradotta in passaggi comprensibili: cosa fare, cosa evitare, quali tempi aspettarsi.',
    icon: Clock4,
  },
  {
    n: '02',
    title: 'Documenti ordinati',
    body: 'Una checklist personalizzata e un canale digitale unico: niente catene di email, niente carte perse.',
    icon: FileText,
  },
  {
    n: '03',
    title: 'Costi spiegati',
    body: 'Preventivo scritto prima di iniziare. Sai cosa pagherai, quando e per cosa. Niente parcelle a sorpresa.',
    icon: Coins,
  },
  {
    n: '04',
    title: 'Aggiornamenti costanti',
    body: 'Status periodico tracciabile, anche quando non c’è una novità: la pratica non resta mai in silenzio.',
    icon: Bell,
  },
] as const;

export function Differentiation() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const ctx = gsap.context(() => {
      gsap.from('[data-fact-head]', {
        y: 22,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 78%', once: true },
      });
      gsap.from('[data-fact-card]', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '[data-fact-grid]', start: 'top 80%', once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="differenziazione"
      className="relative bg-paper-warm text-ink"
      aria-labelledby="fact-title"
    >
      <div className="container-page relative py-28 md:py-36">
        <header className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6">
          <div className="col-span-12 md:col-span-6">
            <span
              data-fact-head
              className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-graphite"
            >
              <span aria-hidden className="h-px w-12" style={{ background: 'rgb(var(--color-cobalt))' }} />
              Capitolo IV · Fatti
            </span>
            <h2
              id="fact-title"
              data-fact-head
              className="mt-6 font-display"
              style={{
                fontSize: 'var(--fs-display-l)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                color: 'rgb(var(--color-cobalt-deep))',
              }}
            >
              Quattro fatti,
              <br />
              <em className="not-italic" style={{ color: 'rgb(var(--color-gold-deep))' }}>
                prima di ogni promessa.
              </em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8" data-fact-head>
            <p className="text-[1.0625rem] text-ink-soft" style={{ lineHeight: 1.6 }}>
              Niente claim di "eccellenza", niente formule. Solo cosa cambia
              quando affidi una pratica a questo studio: tempi, ordine,
              chiarezza, continuità.
            </p>
          </div>
        </header>

        <div data-fact-grid className="mt-14 grid grid-cols-1 gap-px overflow-hidden border md:mt-20 md:grid-cols-2"
          style={{ borderColor: 'rgb(var(--color-rule) / 0.18)', background: 'rgb(var(--color-rule) / 0.10)' }}>
          {FACTS.map((f) => {
            const Icon = f.icon;
            return (
              <article
                key={f.n}
                data-fact-card
                className="group relative bg-vellum p-7 transition-all duration-500 hover:bg-paper md:p-9"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-mono text-[10.5px] uppercase tracking-[0.28em]"
                      style={{ color: 'rgb(var(--color-graphite))' }}
                    >
                      § {f.n}
                    </span>
                  </div>
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105"
                    style={{
                      color: 'rgb(var(--color-gold-deep))',
                      border: '1px solid rgb(var(--color-rule) / 0.18)',
                      background: 'rgb(var(--color-paper))',
                    }}
                    aria-hidden
                  >
                    <Icon size={16} strokeWidth={1.6} />
                  </span>
                </div>

                <h3
                  className="mt-7 font-display transition-transform duration-500 group-hover:translate-x-1"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.015em',
                    color: 'rgb(var(--color-cobalt-deep))',
                    fontStyle: 'italic',
                    fontWeight: 500,
                  }}
                >
                  {f.title}
                </h3>
                <p className="mt-4 max-w-[28rem] text-[0.9375rem] leading-[1.6] text-graphite">
                  {f.body}
                </p>

                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
                  style={{ background: 'rgb(var(--color-gold))' }}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
