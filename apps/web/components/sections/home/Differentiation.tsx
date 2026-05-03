'use client';

/**
 * Differentiation — "Quattro fatti, prima di ogni promessa."
 *
 * Layout enterprise compatto:
 *  · Header su 1 riga grid: titolo (col 7) + lead (col 5) — niente vuoto.
 *  · 4 card in un'unica riga (1×4 desktop, 2×2 tablet, 1×4 stack mobile),
 *    border-condivisi, padding contenuto, font ridotti, indicatore
 *    visivo piccolo (dot oro nel header card).
 *  · Hover: bordo oro + lieve translate-x del titolo.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ensureGsap } from '@/lib/animations';
import { Clock4, FileText, Coins, Bell } from 'lucide-react';

const FACTS = [
  {
    n: '01',
    title: 'Risposte chiare',
    body: 'Ogni richiesta tradotta in passaggi comprensibili: cosa fare, cosa evitare, quali tempi.',
    icon: Clock4,
  },
  {
    n: '02',
    title: 'Documenti ordinati',
    body: 'Checklist personalizzata e canale digitale unico: niente catene di email, niente carte perse.',
    icon: FileText,
  },
  {
    n: '03',
    title: 'Costi spiegati',
    body: 'Preventivo scritto prima di iniziare. Sai cosa pagherai, quando e per cosa.',
    icon: Coins,
  },
  {
    n: '04',
    title: 'Aggiornamenti costanti',
    body: 'Status periodico tracciabile, anche senza novità: la pratica non resta mai in silenzio.',
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
        y: 18,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      });
      gsap.from('[data-fact-card]', {
        y: 22,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-fact-grid]', start: 'top 82%', once: true },
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
      <div className="container-page relative py-20 md:py-24">
        <header className="grid grid-cols-12 items-end gap-x-[var(--gutter)] gap-y-5">
          <div className="col-span-12 md:col-span-7">
            <span
              data-fact-head
              className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite"
            >
              <span aria-hidden className="h-px w-10" style={{ background: 'rgb(var(--color-cobalt))' }} />
              Capitolo IV · Fatti
            </span>
            <h2
              id="fact-title"
              data-fact-head
              className="mt-4 font-display"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.018em',
                color: 'rgb(var(--color-cobalt-deep))',
              }}
            >
              Quattro fatti,{' '}
              <em className="not-italic" style={{ color: 'rgb(var(--color-gold-deep))' }}>
                prima di ogni promessa.
              </em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5" data-fact-head>
            <p className="text-[0.9375rem] text-ink-soft" style={{ lineHeight: 1.6 }}>
              Niente claim di "eccellenza", niente formule. Solo cosa cambia
              quando affidi una pratica: tempi, ordine, chiarezza, continuità.
            </p>
          </div>
        </header>

        <div
          data-fact-grid
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden border md:mt-12 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            borderColor: 'rgb(var(--color-rule) / 0.18)',
            background: 'rgb(var(--color-rule) / 0.10)',
          }}
        >
          {FACTS.map((f) => {
            const Icon = f.icon;
            return (
              <article
                key={f.n}
                data-fact-card
                className="group relative bg-vellum p-5 transition-colors duration-500 hover:bg-paper md:p-6"
              >
                <header className="flex items-center justify-between">
                  <span
                    aria-hidden
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-[-4deg]"
                    style={{
                      color: 'rgb(var(--color-gold-deep))',
                      border: '1px solid rgb(var(--color-rule) / 0.18)',
                      background: 'rgb(var(--color-paper))',
                    }}
                  >
                    <Icon size={13} strokeWidth={1.6} />
                  </span>
                  <span
                    aria-hidden
                    className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.22em]"
                    style={{ color: 'rgb(var(--color-graphite))' }}
                  >
                    <span className="h-1 w-1 rounded-full" style={{ background: 'rgb(var(--color-gold))' }} />
                    {f.n}
                  </span>
                </header>

                <h3
                  className="mt-5 font-display transition-transform duration-500 group-hover:translate-x-1"
                  style={{
                    fontSize: '1.125rem',
                    lineHeight: 1.18,
                    letterSpacing: '-0.012em',
                    color: 'rgb(var(--color-cobalt-deep))',
                  }}
                >
                  {f.title}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-[1.55] text-graphite">
                  {f.body}
                </p>

                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
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
