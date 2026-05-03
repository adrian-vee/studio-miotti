'use client';

/**
 * OperationalSystem — "Metodo operativo, non promesse."
 *
 * Dashboard editoriale: 6 fasi della pratica con timeline, indicatori
 * di stato qualitativi (no numeri inventati), progress line ScrollTrigger,
 * micro-card di "stato attuale" che si attivano allo scroll.
 *
 * Sfondo chiaro per pausa cromatica dopo la Hero scura.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ensureGsap, prefersReducedMotion, drawPath } from '@/lib/animations';

const PHASES = [
  {
    code: 'F-01',
    title: 'Prima risposta',
    body: 'Tempi comunicati per ogni richiesta.',
    indicator: 'entro tempi definiti',
    tone: 'live',
  },
  {
    code: 'F-02',
    title: 'Raccolta documenti',
    body: 'Checklist personalizzata, accesso digitale.',
    indicator: 'documenti organizzati',
    tone: 'gold',
  },
  {
    code: 'F-03',
    title: 'Analisi del caso',
    body: 'Mappa dei fatti, posizioni delle parti, criticità.',
    indicator: 'documento di sintesi',
    tone: 'paper',
  },
  {
    code: 'F-04',
    title: 'Strategia',
    body: 'Scenari realistici, costi stimati, scelta condivisa.',
    indicator: 'preventivo prima del mandato',
    tone: 'gold',
  },
  {
    code: 'F-05',
    title: 'Aggiornamenti',
    body: 'Status periodico tracciabile, niente silenzi.',
    indicator: 'aggiornamenti tracciabili',
    tone: 'live',
  },
  {
    code: 'F-06',
    title: 'Chiusura pratica',
    body: 'Esito, archiviazione, nota di prevenzione futura.',
    indicator: 'archivio ordinato',
    tone: 'paper',
  },
] as const;

export function OperationalSystem() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('[data-os-head]', {
        y: 22,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });

      // Card stagger
      gsap.from('[data-os-card]', {
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-os-grid]', start: 'top 78%', once: true },
      });

      // Linea di progressione orizzontale (timeline)
      const line = el.querySelector<HTMLElement>('[data-os-line]');
      if (line) {
        if (reduced) gsap.set(line, { scaleX: 1, transformOrigin: 'left center' });
        else
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: '[data-os-grid]',
                start: 'top 75%',
                end: 'bottom 70%',
                scrub: 0.6,
              },
            },
          );
      }

      // Frame draw
      el.querySelectorAll<SVGPathElement>('[data-os-path]').forEach((p, i) => {
        drawPath(p, { duration: 1.4, delay: 0.1 + i * 0.12, trigger: el });
      });

      // Indicatori che "si attivano" sequenza
      const dots = el.querySelectorAll<HTMLElement>('[data-os-dot]');
      if (!reduced) {
        ScrollTrigger.batch(dots, {
          onEnter: (els) => {
            gsap.fromTo(
              els,
              { scale: 0.5, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)', stagger: 0.06 },
            );
          },
          start: 'top 85%',
          once: true,
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="metodo"
      className="relative bg-paper text-ink"
      aria-labelledby="os-title"
    >
      <div className="container-page relative py-20 md:py-28">
        {/* Header */}
        <header className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6">
          <div className="col-span-12 md:col-span-5">
            <span
              data-os-head
              className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-graphite"
            >
              <span aria-hidden className="h-px w-12" style={{ background: 'rgb(var(--color-cobalt))' }} />
              Capitolo I · Metodo
            </span>
            <h2
              id="os-title"
              data-os-head
              className="mt-5 font-display"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.018em',
                color: 'rgb(var(--color-cobalt-deep))',
              }}
            >
              Metodo operativo,{' '}
              <em className="not-italic" style={{ color: 'rgb(var(--color-gold-deep))' }}>
                non promesse.
              </em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7" data-os-head>
            <p className="mt-2 max-w-md text-[0.9375rem] text-ink-soft md:mt-0" style={{ lineHeight: 1.6 }}>
              Sei fasi visibili, ognuna con un risultato concreto. Vedi cosa è
              già stato fatto, cosa è in corso, cosa succede dopo.
            </p>
            <dl className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
              <div className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--color-success))' }} />
                <span>live</span>
              </div>
              <div className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--color-gold))' }} />
                <span>azione cliente</span>
              </div>
              <div className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--color-rule) / 0.4)' }} />
                <span>archiviato</span>
              </div>
            </dl>
          </div>
        </header>

        {/* Frame dashboard */}
        <div className="relative mt-12 md:mt-16" data-os-grid>
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1320 560"
            preserveAspectRatio="none"
          >
            <path data-os-path d="M 60 50 L 1260 50" stroke="rgb(11 37 58)" strokeOpacity={0.18} strokeWidth={1} fill="none" />
            <path data-os-path d="M 60 510 L 1260 510" stroke="rgb(198 168 107)" strokeOpacity={0.5} strokeWidth={1} fill="none" />
          </svg>

          {/* Toolbar */}
          <div
            className="relative grid grid-cols-12 items-center gap-x-[var(--gutter)] border-b py-3.5"
            style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
          >
            <div className="col-span-6 flex items-center gap-3">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'rgb(var(--color-success))', animation: 'pulse-dot 2.4s ease-out infinite' }}
              />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-graphite">
                Iter pratica · vista operativa
              </span>
            </div>
            <div className="col-span-6 flex items-center justify-end gap-4 font-mono text-[10.5px] uppercase tracking-[0.28em] text-graphite">
              <span>Cadenza · settimanale</span>
              <span aria-hidden className="h-3 w-px" style={{ background: 'rgb(var(--color-rule) / 0.18)' }} />
              <span>v. 2026.3</span>
            </div>
          </div>

          {/* Timeline orizzontale (desktop) */}
          <div className="relative hidden md:block">
            <div
              aria-hidden
              className="absolute left-0 right-0 top-[1.85rem] h-px"
              style={{ background: 'rgb(var(--color-rule) / 0.18)' }}
            />
            <div
              data-os-line
              aria-hidden
              className="absolute left-0 right-0 top-[1.85rem] h-px"
              style={{
                background:
                  'linear-gradient(90deg, rgb(11 37 58) 0%, rgb(198 168 107) 100%)',
                transform: 'scaleX(0)',
                transformOrigin: 'left center',
              }}
            />
            <div className="grid grid-cols-6">
              {PHASES.map((p, i) => (
                <article key={p.code} data-os-card className="px-3 pt-0 pb-5">
                  <div className="flex justify-start">
                    <span
                      data-os-dot
                      aria-hidden
                      className="relative z-10 inline-flex h-3 w-3 items-center justify-center rounded-full"
                      style={{
                        background: 'rgb(var(--color-paper))',
                        border: `1px solid ${i === 0 ? 'rgb(var(--color-success))' : i < 3 ? 'rgb(var(--color-gold))' : 'rgb(var(--color-cobalt))'}`,
                        marginTop: '1.35rem',
                      }}
                    >
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{
                          background:
                            i === 0
                              ? 'rgb(var(--color-success))'
                              : i < 3
                                ? 'rgb(var(--color-gold))'
                                : 'rgb(var(--color-cobalt))',
                        }}
                      />
                    </span>
                  </div>
                  <div className="mt-5">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-graphite">
                      {p.code}
                    </span>
                    <h3
                      className="mt-1.5 font-display"
                      style={{
                        fontSize: '0.9375rem',
                        lineHeight: 1.25,
                        color: 'rgb(var(--color-cobalt-deep))',
                      }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[0.75rem] leading-[1.5] text-graphite">
                      {p.body}
                    </p>
                    <div
                      className="mt-2 inline-flex items-center rounded-[3px] border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em]"
                      style={{
                        borderColor:
                          p.tone === 'live'
                            ? 'rgb(var(--color-success) / 0.4)'
                            : p.tone === 'gold'
                              ? 'rgb(var(--color-gold) / 0.5)'
                              : 'rgb(var(--color-rule) / 0.18)',
                        color:
                          p.tone === 'live'
                            ? 'rgb(var(--color-success))'
                            : p.tone === 'gold'
                              ? 'rgb(var(--color-gold-deep))'
                              : 'rgb(var(--color-graphite))',
                        background: 'rgb(var(--color-vellum))',
                      }}
                    >
                      {p.indicator}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Mobile: lista verticale */}
          <ol className="relative md:hidden">
            <span
              aria-hidden
              className="absolute left-3 top-2 bottom-2 w-px"
              style={{ background: 'rgb(var(--color-rule) / 0.18)' }}
            />
            {PHASES.map((p) => (
              <li key={p.code} data-os-card className="relative pl-10 py-5">
                <span
                  data-os-dot
                  aria-hidden
                  className="absolute left-0 top-7 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full"
                  style={{
                    background: 'rgb(var(--color-paper))',
                    border: '1px solid rgb(var(--color-cobalt))',
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--color-cobalt))' }} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                  {p.code}
                </span>
                <h3
                  className="mt-1 font-display"
                  style={{ fontSize: '1.125rem', lineHeight: 1.2, color: 'rgb(var(--color-cobalt-deep))' }}
                >
                  {p.title}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-[1.55] text-graphite">{p.body}</p>
                <div
                  className="mt-2 inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.22em]"
                  style={{
                    borderColor: 'rgb(var(--color-rule) / 0.18)',
                    color: 'rgb(var(--color-graphite))',
                  }}
                >
                  {p.indicator}
                </div>
              </li>
            ))}
          </ol>

          {/* Footer */}
          <div
            className="relative grid grid-cols-12 gap-x-[var(--gutter)] border-t py-3.5 font-mono text-[10.5px] uppercase tracking-[0.28em] text-graphite"
            style={{ borderColor: 'rgb(var(--color-gold) / 0.5)' }}
          >
            <span className="col-span-6 inline-flex items-center gap-2">
              <Sparkle />
              Pratica seguita personalmente dall’avvocato titolare
            </span>
            <span className="col-span-6 text-right">San Bonifacio · VR · MMXXVI</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sparkle() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
    </svg>
  );
}
