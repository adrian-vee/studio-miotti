'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { SectionMarker } from './SectionMarker';

const pillars = [
  {
    n: '01',
    title: 'Chiarezza',
    body: 'Spieghiamo il caso e la strategia con parole comprensibili. Il legalese è uno strumento, non un muro.',
  },
  {
    n: '02',
    title: 'Misura',
    body: 'Non promettiamo l\'impossibile. Indichiamo gli scenari realistici e i tempi presumibili fin dal primo incontro.',
  },
  {
    n: '03',
    title: 'Trasparenza',
    body: 'Le strade possibili e quelle non percorribili, dette con chiarezza fin dal primo incontro.',
  },
  {
    n: '04',
    title: 'Continuità',
    body: 'L\'avvocato che incontra alla prima consulenza è l\'avvocato che la segue. Niente mani anonime sulla pratica.',
  },
];

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section
      ref={ref}
      data-rule-anchor="manifesto"
      className="relative isolate overflow-hidden bg-paper-warm py-20 md:py-28"
      aria-labelledby="manifesto-heading"
    >
      <SectionMarker numeral="II" label="Manifesto" align="right" />

      <div className="container-page">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow">§ 02 · Manifesto</span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              id="manifesto-heading"
              className="font-display text-balance"
              style={{ fontSize: 'var(--fs-display-m)', lineHeight: 1.05 }}
            >
              Quattro principi <span className="italic text-cobalt">non negoziabili.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.n}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col"
            >
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-mono text-sm text-cobalt tabular-nums">
                  {pillar.n}
                </span>
                <span className="h-px flex-1 bg-ink/20" />
              </div>
              <h3 className="font-display text-3xl mb-4 leading-tight">
                {pillar.title}
              </h3>
              <p className="text-graphite leading-relaxed">{pillar.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
