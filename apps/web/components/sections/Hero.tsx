'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { SectionMarker } from './SectionMarker';

/**
 * HERO — Studio Miotti (editorial v2)
 *
 * Densità informativa alzata, tipografia gerarchizzata:
 * - § cobalt + label "Cap. 01 / Lo Studio" in col 1-2, baseline-aligned
 *   con la prima riga della headline
 * - Headline su 2 righe gerarchizzate: "Diritto come dialogo," (display-l, ink)
 *   poi "non come distanza." (display-m, italic, cobalt, opacity 0.85)
 * - "San Bonifacio · Verona" baseline della seconda riga, a destra
 * - Lead paragraph + CTA in fondo, con info card 3-stats sopra (border-top rule)
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const numeroY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={containerRef}
      className="relative isolate overflow-hidden bg-paper pt-32 pb-24 md:pt-40 md:pb-32"
      aria-labelledby="hero-headline"
    >
      <SectionMarker numeral="I" label="Lo Studio" align="right" />

      {/* Grid guides — 12 colonne sottili, statement editoriale */}
      <div
        aria-hidden
        className="container-page absolute inset-x-0 top-0 h-full pointer-events-none"
      >
        <div className="grid h-full grid-cols-12 gap-x-[var(--gutter)]">
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              className="h-full w-px bg-ink/[0.04]"
              style={{ gridColumn: `${i + 1}`, justifySelf: 'start' }}
            />
          ))}
        </div>
      </div>

      <div className="container-page relative">
        {/* § + headline */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-10">
          {/* § col 1-2 — parallax leggero, baseline-aligned con la prima riga headline */}
          <motion.div
            style={{ y: numeroY }}
            className="col-span-12 md:col-span-2 flex md:flex-col items-baseline md:items-stretch gap-4 md:gap-0"
          >
            <span
              className="font-display text-cobalt leading-none md:pt-3"
              style={{ fontSize: 'clamp(4rem, 7vw, 6rem)' }}
            >
              §
            </span>
            <div className="md:mt-12 md:text-right">
              <span
                aria-hidden
                className="hidden md:inline-block h-px w-6 bg-rule mb-2"
              />
              <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-graphite">
                Cap. 01 / Lo Studio
              </span>
            </div>
          </motion.div>

          {/* Headline col 3-12 */}
          <div className="col-span-12 md:col-span-10">
            <h1 id="hero-headline" className="font-display">
              <RevealWord delay={0}>
                <span
                  className="block text-ink"
                  style={{
                    fontSize: 'var(--fs-display-l)',
                    lineHeight: 1.0,
                    letterSpacing: '-0.02em',
                    fontWeight: 400,
                  }}
                >
                  Diritto come dialogo,
                </span>
              </RevealWord>

              <span className="flex items-baseline justify-between gap-6 mt-2 md:mt-3">
                <RevealWord delay={0.16}>
                  <span
                    className="italic text-cobalt"
                    style={{
                      fontSize: 'var(--fs-display-m)',
                      lineHeight: 1.0,
                      letterSpacing: '-0.015em',
                      fontWeight: 400,
                      opacity: 0.85,
                    }}
                  >
                    non come distanza.
                  </span>
                </RevealWord>

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="hidden md:inline-block shrink-0 not-italic font-mono text-[10px] uppercase tracking-[0.18em] text-graphite whitespace-nowrap"
                >
                  San Bonifacio · Verona
                </motion.span>
              </span>
            </h1>

            {/* Filetto */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="my-10 md:my-12 h-px w-full origin-left bg-ink/30"
            />

            {/* Lead + CTA row */}
            <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-12 md:col-span-7 text-graphite"
                style={{ fontSize: 'var(--fs-body-l)', lineHeight: 1.55 }}
              >
                Lo Studio dell'Avv. Massimiliano Miotti assiste privati e
                imprese con un metodo che mette al primo posto la chiarezza:
                del problema, della strategia.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-12 md:col-span-5 flex flex-col gap-4 md:items-end"
              >
                <Link
                  href="/prenota"
                  className="group inline-flex items-baseline gap-3 text-ink"
                >
                  <span className="font-display text-xl border-b border-ink pb-1 group-hover:border-cobalt group-hover:opacity-70 transition-colors">
                    Prenota un primo confronto
                  </span>
                  <span className="text-cobalt transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link href="/aree-di-competenza" className="link-inline text-sm">
                  Le aree di competenza dello Studio
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Sub-component: parola che entra con clip-path bottom→top.
 */
function RevealWord({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="inline-block overflow-hidden align-baseline whitespace-pre">
      <motion.span
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
