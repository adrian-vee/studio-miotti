'use client';

/**
 * Territory — "San Bonifacio. Operatività reale."
 *
 * Mappa concettuale, niente Google Maps. Sei nodi (San Bonifacio
 * centrale + 5 città servite frequentemente), connessi da linee oro,
 * griglia coordinate tipografica con leggero parallax.
 *
 * Copy: concreto, niente metafore.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Phone, MapPin, Building2 } from 'lucide-react';
import { ensureGsap, prefersReducedMotion, drawPath } from '@/lib/animations';
import { SITE_DATA } from '@/lib/site-data';

const NODES = [
  { id: 'verona', label: 'Verona', sub: 'Foro', x: 22, y: 26, central: false },
  { id: 'sb', label: 'San Bonifacio', sub: 'Studio', x: 50, y: 50, central: true },
  { id: 'soave', label: 'Soave', sub: 'Tribunale', x: 60, y: 36, central: false },
  { id: 'lonigo', label: 'Lonigo', sub: '', x: 78, y: 56, central: false },
  { id: 'arzignano', label: 'Arzignano', sub: '', x: 70, y: 22, central: false },
  { id: 'legnago', label: 'Legnago', sub: '', x: 32, y: 78, central: false },
] as const;

export function Territory() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      gsap.from('[data-terr-head]', {
        y: 22,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 78%', once: true },
      });

      el.querySelectorAll<SVGPathElement>('[data-terr-link]').forEach((p, i) => {
        drawPath(p, { duration: 1.4, delay: 0.3 + i * 0.16, trigger: el });
      });

      const dots = el.querySelectorAll<SVGCircleElement>('[data-terr-node]');
      if (reduced) gsap.set(dots, { opacity: 1, scale: 1 });
      else
        gsap.from(dots, {
          opacity: 0,
          scale: 0,
          duration: 0.7,
          ease: 'back.out(2)',
          stagger: 0.14,
          transformOrigin: 'center',
          scrollTrigger: { trigger: el, start: 'top 70%', once: true },
        });

      gsap.from('[data-terr-label]', {
        opacity: 0,
        y: 6,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        delay: 0.6,
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      });

      // Parallax leggero della griglia
      if (!reduced) {
        gsap.to('[data-terr-grid]', {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
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
      className="relative overflow-hidden bg-cobalt-deep text-paper"
      aria-labelledby="terr-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 50%, rgb(198 168 107 / 0.08) 0%, transparent 65%)',
        }}
      />

      <div className="container-page relative py-28 md:py-36">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12">
          {/* Sx */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <span
              data-terr-head
              className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em]"
              style={{ color: 'rgb(var(--color-gold))' }}
            >
              <span aria-hidden className="h-px w-12 bg-gold" />
              Capitolo III · Territorio
            </span>
            <h2
              id="terr-title"
              data-terr-head
              className="mt-6 font-display"
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
              data-terr-head
              className="mt-7 max-w-md text-[1.0625rem]"
              style={{ color: 'rgb(var(--color-paper) / 0.78)', lineHeight: 1.6 }}
            >
              Uno studio fisico nella provincia di Verona, con un’organizzazione
              digitale pensata per ridurre tempi, passaggi inutili e incertezze.
            </p>

            <ul
              data-terr-head
              className="mt-8 divide-y"
              style={{ borderColor: 'rgb(244 242 238 / 0.12)' }}
            >
              <TerrRow icon={<Building2 size={13} />} label="Sede operativa" value={`${SITE_DATA.address.street} · ${SITE_DATA.address.cap} ${SITE_DATA.address.city}`} />
              <TerrRow icon={<MapPin size={13} />} label="Foro di competenza" value="Verona · Vicenza · province limitrofe" />
              <TerrRow icon={<Phone size={13} />} label="Telefono" value={SITE_DATA.phoneDisplay} href={`tel:${SITE_DATA.phoneTel}`} />
            </ul>
          </div>

          {/* Dx: mappa */}
          <div className="col-span-12 md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden border"
              style={{ borderColor: 'rgb(244 242 238 / 0.12)', background: 'rgb(244 242 238 / 0.02)' }}
            >
              <svg
                aria-hidden
                viewBox="0 0 100 75"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <g data-terr-grid>
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
                </g>

                {NODES.filter((n) => !n.central).map((n) => {
                  const sb = NODES.find((x) => x.central)!;
                  return (
                    <path
                      key={n.id}
                      data-terr-link
                      d={`M ${sb.x} ${sb.y} L ${n.x} ${n.y}`}
                      fill="none"
                      stroke="rgb(198 168 107)"
                      strokeOpacity={0.5}
                      strokeWidth={0.16}
                    />
                  );
                })}

                {NODES.map((n) => (
                  <g key={n.id} data-terr-node>
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={n.central ? 1.5 : 0.9}
                      fill={n.central ? 'rgb(198 168 107)' : 'rgb(244 242 238)'}
                    />
                    {n.central && (
                      <>
                        <circle cx={n.x} cy={n.y} r={2.4} fill="none" stroke="rgb(198 168 107)" strokeOpacity={0.6} strokeWidth={0.15}>
                          <animate attributeName="r" values="2;4.5;2" dur="3s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" repeatCount="indefinite" />
                        </circle>
                      </>
                    )}
                  </g>
                ))}
              </svg>

              {/* Label sovrapposte */}
              {NODES.map((n) => (
                <div
                  key={n.id}
                  data-terr-label
                  className="absolute"
                  style={{
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    transform: 'translate(10px, -50%)',
                  }}
                >
                  <span
                    className="block font-mono text-[9.5px] uppercase tracking-[0.22em]"
                    style={{ color: n.central ? 'rgb(var(--color-gold))' : 'rgb(244 242 238 / 0.7)' }}
                  >
                    {n.label}
                  </span>
                  {n.sub && (
                    <span
                      className="block font-mono text-[8.5px] uppercase tracking-[0.22em]"
                      style={{ color: 'rgb(244 242 238 / 0.4)' }}
                    >
                      {n.sub}
                    </span>
                  )}
                </div>
              ))}

              {/* Coordinate angolari */}
              <span aria-hidden className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: 'rgb(244 242 238 / 0.4)' }}>
                45.5° N
              </span>
              <span aria-hidden className="absolute right-3 top-3 font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: 'rgb(244 242 238 / 0.4)' }}>
                11.5° E
              </span>
              <span aria-hidden className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: 'rgb(244 242 238 / 0.4)' }}>
                45.2° N
              </span>
              <span aria-hidden className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: 'rgb(var(--color-gold))' }}>
                Studio · 0
              </span>

              {/* Etichetta posizionale top-left */}
              <div
                aria-hidden
                className="absolute left-3 top-10 flex items-center gap-2 rounded-[3px] border px-2.5 py-1.5"
                style={{
                  borderColor: 'rgb(244 242 238 / 0.14)',
                  background: 'rgb(11 37 58 / 0.65)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--color-gold))', animation: 'pulse-dot 2.4s ease-out infinite' }} />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.22em]" style={{ color: 'rgb(var(--color-paper))' }}>
                  Live · studio operativo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TerrRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex flex-col gap-1.5 py-4">
      <span
        className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: 'rgb(var(--color-paper) / 0.55)' }}
      >
        {icon}
        {label}
      </span>
      <span
        className="font-display"
        style={{ fontSize: '1rem', lineHeight: 1.35, color: 'rgb(var(--color-paper))' }}
      >
        {value}
      </span>
    </div>
  );

  return (
    <li className="border-t first:border-t-0" style={{ borderColor: 'rgb(244 242 238 / 0.12)' }}>
      {href ? (
        <a href={href} className="block transition-opacity duration-300 hover:opacity-80">
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}
