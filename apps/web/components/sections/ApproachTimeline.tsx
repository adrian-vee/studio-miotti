'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { SectionMarker } from './SectionMarker';

const steps = [
  {
    n: 'I',
    title: 'Ascolto',
    duration: '15 min · gratuito',
    body: 'Primo confronto telefonico o in studio per inquadrare la situazione, identificare l\'area di diritto coinvolta e capire l\'urgenza.',
  },
  {
    n: 'II',
    title: 'Analisi',
    duration: '24-72 ore',
    body: 'Esame della documentazione, ricerca giurisprudenziale, valutazione delle azioni esperibili con relative probabilità di successo.',
  },
  {
    n: 'III',
    title: 'Proposta',
    duration: 'Per iscritto',
    body: 'Strategia operativa con tempi stimati, costi a forfait o per fasi, alternative percorribili. Lei decide se procedere.',
  },
  {
    n: 'IV',
    title: 'Esecuzione',
    duration: 'Aggiornamenti settimanali',
    body: 'Conduzione della pratica con report periodici. Lei sa sempre a che punto siamo, senza dover chiedere.',
  },
];

export function ApproachTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section
      ref={ref}
      className="relative bg-ink text-paper py-24 md:py-32"
      aria-labelledby="metodo-heading"
    >
      <SectionMarker numeral="IV" label="Metodo" align="right" variant="dark" />

      <div className="container-page">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8 mb-20">
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow text-paper/60">§ 04 · Metodo</span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              id="metodo-heading"
              className="font-display text-balance"
              style={{ fontSize: 'var(--fs-display-m)', lineHeight: 1.05 }}
            >
              Quattro tempi.
              <br />
              <span className="italic text-gold">Sempre gli stessi.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-[var(--gutter)] relative">
          {/* Linea verticale animata che cresce con lo scroll */}
          <div className="hidden md:block col-start-3 col-span-1 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-paper/15 -translate-x-1/2">
              <motion.div
                style={{ height: lineHeight }}
                className="absolute top-0 left-0 w-full bg-gold origin-top"
              />
            </div>
          </div>

          {/* Steps */}
          <div className="col-span-12 md:col-span-9 md:col-start-4 space-y-16 md:space-y-24">
            {steps.map((step, i) => (
              <motion.article
                key={step.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-3"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="font-display text-3xl md:text-4xl text-gold">
                    {step.n}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-11">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                    <h3 className="font-display text-3xl md:text-4xl">{step.title}</h3>
                    <span className="font-mono text-xs uppercase tracking-widest text-paper/50">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-paper/70 text-lg leading-relaxed max-w-2xl">
                    {step.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
