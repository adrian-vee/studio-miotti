'use client';

/**
 * 03 · SEZIONE INTERATTIVA — problemi reali.
 *
 * 4 voci: Contratti · Contenziosi · Lavoro · Famiglia
 *
 * UX:
 *  · Sezione molto alta (300vh): le voci appaiono mentre scrolli.
 *  · Background blu notte → grigio scuro (gradient su scroll).
 *  · Numero gigante (01..04) sticky a sinistra che cambia.
 *  · Voci a destra con scrub-snap morbido.
 *  · Parallax leggero sui dettagli.
 *  · Cursor follow desktop only (lieve translate del numero).
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ensureGsap, prefersReducedMotion, splitToWords } from '@/lib/animations';

const PROBLEMS = [
  {
    n: '01',
    label: 'Contratti',
    title: 'Una clausola può cambiare l’esito di un anno di lavoro.',
    body: 'Redazione, revisione e negoziazione di accordi civili e commerciali. Sai cosa firmi prima di firmarlo, non dopo.',
  },
  {
    n: '02',
    label: 'Contenziosi',
    title: 'Quando la trattativa non basta più, serve un piano.',
    body: 'Strategia processuale costruita sulle prove disponibili e sull’obiettivo realistico. Si fa causa solo quando ha senso farla.',
  },
  {
    n: '03',
    label: 'Lavoro',
    title: 'Licenziamenti, contestazioni, demansionamenti.',
    body: 'Tutela per lavoratori e per datori. Spesso la soluzione migliore non passa dal tribunale: la cerchiamo prima.',
  },
  {
    n: '04',
    label: 'Famiglia',
    title: 'Separazioni, eredità, accordi di convivenza.',
    body: 'Riservatezza assoluta e soluzioni che durano. Il diritto di famiglia non si chiude con una sentenza, si chiude con un equilibrio.',
  },
] as const;

export function ProblemsSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-problem]');
      const counter = el.querySelector<HTMLElement>('[data-problem-counter]');
      const label = el.querySelector<HTMLElement>('[data-problem-label]');

      // Per ogni voce: word-split + reveal scrub
      items.forEach((item, i) => {
        const headline = item.querySelector<HTMLElement>('[data-problem-headline]');
        if (headline) {
          const words = splitToWords(headline);
          if (reduced) {
            gsap.set(words, { opacity: 1, y: 0 });
          } else {
            gsap.from(words, {
              opacity: 0,
              y: 28,
              duration: 0.85,
              ease: 'power3.out',
              stagger: 0.04,
              scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                once: true,
              },
            });
          }
        }
        gsap.from(item.querySelector<HTMLElement>('[data-problem-body]'), {
          opacity: 0,
          y: 18,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: { trigger: item, start: 'top 75%', once: true },
        });

        // Numerone + label aggiornati con onEnter/onLeaveBack
        ScrollTrigger.create({
          trigger: item,
          start: 'top 60%',
          end: 'bottom 60%',
          onEnter: () => {
            if (counter) counter.textContent = PROBLEMS[i]?.n ?? '';
            if (label) label.textContent = PROBLEMS[i]?.label ?? '';
            if (counter && !reduced) {
              gsap.fromTo(
                counter,
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
              );
            }
            if (label && !reduced) {
              gsap.fromTo(
                label,
                { x: 12, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
              );
            }
          },
          onEnterBack: () => {
            if (counter) counter.textContent = PROBLEMS[i]?.n ?? '';
            if (label) label.textContent = PROBLEMS[i]?.label ?? '';
          },
        });
      });

      // Parallax dettagli
      if (!reduced) {
        gsap.to('[data-problem-bg]', {
          backgroundPosition: '50% 100%',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom bottom',
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
      className="relative bg-cobalt-deep text-paper"
      aria-labelledby="problems-title"
    >
      {/* Background con gradient parallax */}
      <div
        data-problem-bg
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgb(11 37 58) 0%, rgb(46 46 46) 100%)',
          backgroundSize: '100% 200%',
          backgroundPosition: '50% 0%',
        }}
      />

      {/* Filetti verticali */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px md:block"
        style={{ background: 'rgb(244 242 238 / 0.06)' }}
      />

      <div className="container-page relative" style={{ zIndex: 1 }}>
        <header className="pt-32 md:pt-40">
          <span
            className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em]"
            style={{ color: 'rgb(var(--color-gold))' }}
          >
            <span aria-hidden className="h-px w-12 bg-gold" />
            Capitolo II · Problemi reali
          </span>
          <h2
            id="problems-title"
            className="mt-8 max-w-3xl font-display"
            style={{
              fontSize: 'var(--fs-display-l)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'rgb(var(--color-paper))',
            }}
          >
            Quattro punti dove un avvocato cambia <em className="text-gold not-italic">l’esito.</em>
          </h2>
        </header>

        <div className="mt-20 grid grid-cols-12 gap-x-[var(--gutter)] md:mt-32">
          {/* Sticky counter (sinistra) */}
          <aside className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="md:sticky md:top-32">
              <span
                data-problem-counter
                className="block font-display"
                style={{
                  fontSize: 'clamp(6rem, 14vw, 12rem)',
                  lineHeight: 0.85,
                  fontStyle: 'italic',
                  fontWeight: 500,
                  color: 'rgb(var(--color-gold))',
                  letterSpacing: '-0.05em',
                }}
              >
                01
              </span>
              <span
                data-problem-label
                className="mt-3 block font-mono text-[12px] uppercase tracking-[0.3em]"
                style={{ color: 'rgb(var(--color-paper) / 0.6)' }}
              >
                Contratti
              </span>
              <div
                aria-hidden
                className="mt-6 hidden h-px w-24 md:block"
                style={{ background: 'rgb(var(--color-gold) / 0.6)' }}
              />
            </div>
          </aside>

          {/* Lista voci (destra) */}
          <div className="col-span-12 mt-12 space-y-32 md:col-span-8 md:col-start-5 md:mt-0 md:space-y-48 lg:col-span-9 lg:col-start-4">
            {PROBLEMS.map((p) => (
              <article key={p.n} data-problem className="max-w-2xl">
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.28em]"
                  style={{ color: 'rgb(var(--color-gold))' }}
                >
                  § {p.n}
                </span>
                <h3
                  data-problem-headline
                  className="mt-5 font-display"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    lineHeight: 1.08,
                    letterSpacing: '-0.015em',
                    color: 'rgb(var(--color-paper))',
                    fontStyle: 'italic',
                    fontWeight: 500,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  data-problem-body
                  className="mt-6 max-w-xl text-[1.0625rem]"
                  style={{ color: 'rgb(var(--color-paper) / 0.7)', lineHeight: 1.6 }}
                >
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="h-32 md:h-48" />
      </div>
    </section>
  );
}
