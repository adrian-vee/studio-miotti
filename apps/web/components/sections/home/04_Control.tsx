'use client';

/**
 * 04 · BLOCCO "CONTROLLO" — gestione chiara, nessuna incertezza.
 *
 * Layout dashboard astratta su sfondo CHIARO (cambio tono cinematico
 * dopo la sezione scura dei problemi).
 *
 * Elementi:
 *  · Frame "operations" con linee sottili.
 *  · 4 indicatori (richieste · documenti · scadenze · aggiornamenti)
 *    che si "attivano" uno dopo l'altro (sequenza workflow).
 *  · Linee che collegano i nodi (drawPath).
 *  · Counter numerici che salgono.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ensureGsap, prefersReducedMotion, drawPath } from '@/lib/animations';

const INDICATORS = [
  { code: 'I', label: 'Richieste', value: 24, suffix: 'h', note: 'Tempo medio prima risposta' },
  { code: 'II', label: 'Documenti', value: 100, suffix: '%', note: 'Trasferiti via canale digitale' },
  { code: 'III', label: 'Scadenze', value: 0, suffix: '', note: 'Termini persi negli ultimi 12 mesi' },
  { code: 'IV', label: 'Aggiornamenti', value: 1, suffix: 'wk', note: 'Cadenza standard di status' },
] as const;

export function ControlSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // Linee SVG draw
      el.querySelectorAll<SVGPathElement>('[data-control-path]').forEach((p, i) => {
        drawPath(p, { duration: 1.4, delay: 0.2 + i * 0.18, trigger: el });
      });

      // Stagger reveal indicators
      gsap.from('[data-indicator]', {
        opacity: 0,
        y: 24,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      });

      // Counters incremento numerico
      el.querySelectorAll<HTMLElement>('[data-counter]').forEach((node) => {
        const target = Number(node.dataset.counter ?? '0');
        if (reduced) {
          node.textContent = String(target);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: node, start: 'top 80%', once: true },
          onUpdate: () => {
            node.textContent = String(Math.round(obj.v));
          },
        });
      });

      // Headline word reveal (sobrio, sezione chiara)
      gsap.from('[data-control-line]', {
        y: 20,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative bg-paper text-ink"
      aria-labelledby="control-title"
    >
      <div className="container-page relative py-32 md:py-40">
        <header className="grid grid-cols-12 gap-x-[var(--gutter)]">
          <div className="col-span-12 md:col-span-5">
            <span
              data-control-line
              className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-graphite"
            >
              <span aria-hidden className="h-px w-12" style={{ background: 'rgb(var(--color-cobalt))' }} />
              Capitolo III · Controllo
            </span>
            <h2
              id="control-title"
              data-control-line
              className="mt-8 font-display"
              style={{
                fontSize: 'var(--fs-display-l)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                color: 'rgb(var(--color-cobalt-deep))',
              }}
            >
              Gestione chiara.
              <br />
              <em className="not-italic" style={{ color: 'rgb(var(--color-gold-deep))' }}>
                Nessuna incertezza.
              </em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7" data-control-line>
            <p
              className="mt-6 max-w-md text-[1.0625rem] text-ink-soft md:mt-0"
              style={{ lineHeight: 1.6 }}
            >
              Un’operatività visibile come un cruscotto: tempi di risposta,
              documenti tracciati, scadenze controllate, aggiornamenti
              regolari. Saprai sempre dove siamo nel percorso.
            </p>
          </div>
        </header>

        {/* Dashboard astratta */}
        <div className="relative mt-20 md:mt-28">
          {/* Frame */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1320 600"
            preserveAspectRatio="none"
          >
            <path
              data-control-path
              d="M 60 60 L 1260 60"
              fill="none"
              stroke="rgb(11 37 58)"
              strokeOpacity={0.18}
              strokeWidth={1}
            />
            <path
              data-control-path
              d="M 60 60 L 60 540"
              fill="none"
              stroke="rgb(11 37 58)"
              strokeOpacity={0.12}
              strokeWidth={1}
            />
            <path
              data-control-path
              d="M 1260 60 L 1260 540"
              fill="none"
              stroke="rgb(11 37 58)"
              strokeOpacity={0.12}
              strokeWidth={1}
            />
            <path
              data-control-path
              d="M 60 540 L 1260 540"
              fill="none"
              stroke="rgb(198 168 107)"
              strokeOpacity={0.5}
              strokeWidth={1}
            />
            {/* divisori */}
            <path data-control-path d="M 360 80 L 360 520" fill="none" stroke="rgb(11 37 58)" strokeOpacity={0.08} strokeWidth={1} />
            <path data-control-path d="M 660 80 L 660 520" fill="none" stroke="rgb(11 37 58)" strokeOpacity={0.08} strokeWidth={1} />
            <path data-control-path d="M 960 80 L 960 520" fill="none" stroke="rgb(11 37 58)" strokeOpacity={0.08} strokeWidth={1} />
          </svg>

          {/* Toolbar dashboard */}
          <div
            className="relative grid grid-cols-12 items-center gap-x-[var(--gutter)] border-b py-4"
            style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
          >
            <div className="col-span-6 flex items-center gap-3">
              <span aria-hidden className="h-2 w-2 rounded-full bg-gold" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-graphite">
                Operatività studio · MMXXVI
              </span>
            </div>
            <div className="col-span-6 flex items-center justify-end gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-graphite">
              <span>live</span>
              <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: 'rgb(var(--color-success))' }} />
            </div>
          </div>

          {/* Indicatori */}
          <div className="relative grid grid-cols-2 lg:grid-cols-4">
            {INDICATORS.map((it, i) => (
              <article
                key={it.code}
                data-indicator
                className="relative px-5 py-10 md:px-8 md:py-14"
                style={{
                  borderRight:
                    i < INDICATORS.length - 1
                      ? '1px solid rgb(var(--color-rule) / 0.06)'
                      : 'none',
                }}
              >
                <span className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-graphite">
                  {it.code} · {it.label}
                </span>
                <div className="mt-6 flex items-baseline gap-1">
                  <span
                    data-counter={it.value}
                    className="font-display"
                    style={{
                      fontSize: 'clamp(2.75rem, 5vw, 4rem)',
                      lineHeight: 0.95,
                      fontStyle: 'italic',
                      fontWeight: 500,
                      color: 'rgb(var(--color-cobalt-deep))',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    0
                  </span>
                  <span
                    className="font-display"
                    style={{
                      fontSize: '1.25rem',
                      color: 'rgb(var(--color-gold-deep))',
                    }}
                  >
                    {it.suffix}
                  </span>
                </div>
                <p className="mt-4 max-w-[14rem] text-[0.875rem] leading-[1.5] text-graphite">
                  {it.note}
                </p>
              </article>
            ))}
          </div>

          {/* Footer dashboard */}
          <div
            className="relative grid grid-cols-12 gap-x-[var(--gutter)] border-t py-4 font-mono text-[10.5px] uppercase tracking-[0.28em] text-graphite"
            style={{ borderColor: 'rgb(var(--color-gold) / 0.5)' }}
          >
            <span className="col-span-6">Cadenza · settimanale</span>
            <span className="col-span-6 text-right">Versione · 2026.3</span>
          </div>
        </div>
      </div>
    </section>
  );
}
