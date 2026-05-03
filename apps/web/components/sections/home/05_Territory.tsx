'use client';

/**
 * 05 · TERRITORIO — astratto, no mappa classica.
 *
 * "San Bonifacio. Operatività reale."
 *
 * Composizione:
 *  · Griglia di coordinate (lat/lng tipografiche) come backdrop.
 *  · 5-6 punti che si "accendono" in sequenza, connessi da linee sottili.
 *  · Il punto centrale (San Bonifacio) ha un anello pulsante oro.
 *  · Tutto in tipografia mono, niente skin Google Maps.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ensureGsap, prefersReducedMotion, drawPath } from '@/lib/animations';

const NODES = [
  { id: 'verona', label: 'Verona', x: 22, y: 28, sub: '45.4° N · 11.0° E', central: false },
  { id: 'sb', label: 'San Bonifacio', x: 50, y: 50, sub: '45.4° N · 11.3° E', central: true },
  { id: 'soave', label: 'Soave', x: 60, y: 38, sub: '45.4° N · 11.2° E', central: false },
  { id: 'lonigo', label: 'Lonigo', x: 78, y: 56, sub: '45.4° N · 11.4° E', central: false },
  { id: 'arzignano', label: 'Arzignano', x: 70, y: 24, sub: '45.5° N · 11.3° E', central: false },
  { id: 'legnago', label: 'Legnago', x: 32, y: 78, sub: '45.2° N · 11.3° E', central: false },
] as const;

export function TerritorySection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // Linee connettore (drawPath)
      el.querySelectorAll<SVGPathElement>('[data-territory-link]').forEach((p, i) => {
        drawPath(p, {
          duration: 1.4,
          delay: 0.3 + i * 0.2,
          trigger: el,
        });
      });

      // Punti che si accendono (scale + opacità) in sequenza
      const dots = el.querySelectorAll<SVGCircleElement>('[data-territory-node]');
      if (reduced) {
        gsap.set(dots, { opacity: 1, scale: 1 });
      } else {
        gsap.from(dots, {
          opacity: 0,
          scale: 0,
          duration: 0.7,
          ease: 'back.out(2)',
          stagger: 0.16,
          transformOrigin: 'center',
          scrollTrigger: { trigger: el, start: 'top 70%', once: true },
        });
      }

      // Label fade-in
      gsap.from('[data-territory-label]', {
        opacity: 0,
        y: 6,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.6,
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      });

      // Headline reveal
      gsap.from('[data-territory-line]', {
        y: 22,
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
      className="relative overflow-hidden bg-cobalt-deep text-paper"
      aria-labelledby="territory-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 50%, rgb(198 168 107 / 0.08) 0%, transparent 65%)',
        }}
      />

      <div className="container-page relative py-32 md:py-40">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12">
          {/* ── Sinistra: testo ── */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <span
              data-territory-line
              className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em]"
              style={{ color: 'rgb(var(--color-gold))' }}
            >
              <span aria-hidden className="h-px w-12 bg-gold" />
              Capitolo IV · Territorio
            </span>
            <h2
              id="territory-title"
              data-territory-line
              className="mt-8 font-display"
              style={{
                fontSize: 'var(--fs-display-l)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'rgb(var(--color-paper))',
              }}
            >
              San Bonifacio.
              <br />
              <em className="not-italic text-gold">Operatività reale.</em>
            </h2>
            <p
              data-territory-line
              className="mt-8 max-w-md text-[1.0625rem]"
              style={{ color: 'rgb(var(--color-paper) / 0.7)', lineHeight: 1.6 }}
            >
              Studio fisico nella Bassa Veronese, in dialogo costante con
              tribunali, notai e clienti del territorio. Quando serve si va
              in udienza, in azienda, in cancelleria. Di persona.
            </p>

            <dl
              data-territory-line
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: 'rgb(var(--color-paper) / 0.7)' }}
            >
              <div>
                <dt style={{ color: 'rgb(var(--color-gold))' }}>Lat</dt>
                <dd className="mt-1">45° 23′ 31″ N</dd>
              </div>
              <div>
                <dt style={{ color: 'rgb(var(--color-gold))' }}>Lng</dt>
                <dd className="mt-1">11° 16′ 29″ E</dd>
              </div>
              <div>
                <dt style={{ color: 'rgb(var(--color-gold))' }}>Cap</dt>
                <dd className="mt-1">37047</dd>
              </div>
              <div>
                <dt style={{ color: 'rgb(var(--color-gold))' }}>Foro</dt>
                <dd className="mt-1">Verona</dd>
              </div>
            </dl>
          </div>

          {/* ── Destra: mappa astratta ── */}
          <div className="col-span-12 md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden border"
              style={{ borderColor: 'rgb(244 242 238 / 0.12)' }}
            >
              {/* Grid coordinate */}
              <svg
                aria-hidden
                viewBox="0 0 100 75"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                {/* griglia */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <line
                    key={`v${i}`}
                    x1={(i + 1) * 10}
                    y1={0}
                    x2={(i + 1) * 10}
                    y2={75}
                    stroke="rgb(244 242 238)"
                    strokeOpacity={0.05}
                    strokeWidth={0.1}
                  />
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                  <line
                    key={`h${i}`}
                    x1={0}
                    y1={(i + 1) * 10.7}
                    x2={100}
                    y2={(i + 1) * 10.7}
                    stroke="rgb(244 242 238)"
                    strokeOpacity={0.05}
                    strokeWidth={0.1}
                  />
                ))}

                {/* link da SB a tutti gli altri */}
                {NODES.filter((n) => !n.central).map((n) => {
                  const sb = NODES.find((x) => x.central)!;
                  return (
                    <path
                      key={n.id}
                      data-territory-link
                      d={`M ${sb.x} ${sb.y} L ${n.x} ${n.y}`}
                      fill="none"
                      stroke="rgb(198 168 107)"
                      strokeOpacity={0.45}
                      strokeWidth={0.18}
                    />
                  );
                })}

                {/* nodes */}
                {NODES.map((n) => (
                  <circle
                    key={n.id}
                    data-territory-node
                    cx={n.x}
                    cy={n.y}
                    r={n.central ? 1.4 : 0.9}
                    fill={n.central ? 'rgb(198 168 107)' : 'rgb(244 242 238)'}
                  />
                ))}

                {/* anello pulsante SB */}
                <circle
                  cx={NODES.find((n) => n.central)!.x}
                  cy={NODES.find((n) => n.central)!.y}
                  r={2.4}
                  fill="none"
                  stroke="rgb(198 168 107)"
                  strokeOpacity={0.6}
                  strokeWidth={0.15}
                >
                  <animate attributeName="r" values="2;4.5;2" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" repeatCount="indefinite" />
                </circle>
              </svg>

              {/* Label sovrapposte */}
              {NODES.map((n) => (
                <span
                  key={n.id}
                  data-territory-label
                  className="absolute font-mono text-[9px] uppercase tracking-[0.22em]"
                  style={{
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    transform: 'translate(8px, -50%)',
                    color: n.central ? 'rgb(var(--color-gold))' : 'rgb(244 242 238 / 0.65)',
                  }}
                >
                  {n.label}
                </span>
              ))}

              {/* Coordinate angolari */}
              <span
                aria-hidden
                className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.22em]"
                style={{ color: 'rgb(244 242 238 / 0.4)' }}
              >
                45.5° N
              </span>
              <span
                aria-hidden
                className="absolute right-3 top-3 font-mono text-[9px] uppercase tracking-[0.22em]"
                style={{ color: 'rgb(244 242 238 / 0.4)' }}
              >
                11.5° E
              </span>
              <span
                aria-hidden
                className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.22em]"
                style={{ color: 'rgb(244 242 238 / 0.4)' }}
              >
                45.2° N
              </span>
              <span
                aria-hidden
                className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.22em]"
                style={{ color: 'rgb(var(--color-gold))' }}
              >
                Studio · 0
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
