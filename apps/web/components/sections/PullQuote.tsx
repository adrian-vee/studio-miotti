'use client';

import { motion } from 'motion/react';

/**
 * PULL QUOTE — citazione editoriale full-width
 *
 * Posizionata tra Manifesto e Aree, dà respiro alla home e fissa
 * la voce dell'avvocato.
 *
 * - Tipografia display imponente, parallax minimale del segno apertura
 * - Hairline cobalt-oro a sinistra
 * - Firma in piccolo monospace, baseline-aligned
 */

export function PullQuote() {
  return (
    <section
      className="relative bg-paper py-24 md:py-32 overflow-hidden"
      aria-label="Citazione dello Studio"
    >
      {/* Watermark § a destra, decorativo */}
      <span
        aria-hidden
        className="hidden md:block absolute right-[-2vw] top-1/2 -translate-y-1/2 font-display text-cobalt/[0.04] leading-none select-none"
        style={{ fontSize: 'clamp(20rem, 32vw, 40rem)' }}
      >
        §
      </span>

      <div className="container-page relative">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)]">
          {/* Apertura citazione + hairline */}
          <div className="col-span-12 md:col-span-2 flex md:flex-col items-baseline md:items-start gap-3">
            <span
              className="font-display text-gold leading-none"
              style={{ fontSize: 'clamp(4rem, 6vw, 6rem)' }}
              aria-hidden
            >
              &ldquo;
            </span>
            <motion.span
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block h-32 w-px bg-cobalt origin-top mt-2"
            />
          </div>

          {/* Quote body */}
          <div className="col-span-12 md:col-span-10">
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-balance text-ink"
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
                lineHeight: 1.18,
                letterSpacing: '-0.012em',
                fontWeight: 400,
              }}
            >
              Un buon avvocato non è quello che parla difficile.
              È quello che, alla fine del primo incontro,{' '}
              <span className="italic text-cobalt">le ha lasciato in mano una mappa</span>{' '}
              e non un labirinto.
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <span aria-hidden className="block h-px w-10 bg-gold" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
                Avv. Massimiliano Miotti
              </span>
              <span aria-hidden className="text-rule">·</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
                Foro di Verona
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
