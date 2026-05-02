'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Sparkles, Zap, Eye } from 'lucide-react';

/**
 * APPROCCIO
 *
 * I 3 pilastri di metodo che il brief richiede:
 *  · Semplicità — linguaggio chiaro, niente legalese
 *  · Velocità — risposta entro 24 h, decisioni in giorni non mesi
 *  · Trasparenza — strategia, costi e tempi dichiarati subito
 *
 * Layout: alternato testo↔visual con linea verticale che cresce.
 */

const pillars = [
  {
    icon: Sparkles,
    n: '01',
    title: 'Semplicità',
    headline: 'Il legalese è uno strumento, non un muro.',
    body: 'Le spieghiamo il caso e la strategia in italiano. Capire cosa stiamo facendo è il primo diritto del cliente.',
    bullet: ['Linguaggio chiaro', 'Documenti leggibili', 'Domande sempre benvenute'],
  },
  {
    icon: Zap,
    n: '02',
    title: 'Velocità',
    headline: 'Risposte in ore, non settimane.',
    body: 'Ogni nuova richiesta riceve un primo riscontro entro 24 h lavorative. Le decisioni operative si prendono in giorni, non in mesi.',
    bullet: ['Riscontro entro 24 h', 'Aggiornamenti settimanali', 'Tempi indicati a priori'],
  },
  {
    icon: Eye,
    n: '03',
    title: 'Trasparenza',
    headline: 'Niente sorprese su costi e tempi.',
    body: 'Onorari concordati per iscritto prima di iniziare. Le chiediamo se procedere solo dopo averle dato il quadro completo.',
    bullet: ['Preventivo scritto', 'Costi a forfait quando possibile', 'Nessun costo nascosto'],
  },
];

export function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section
      ref={ref}
      className="relative bg-paper-warm py-20 md:py-28 overflow-hidden"
      aria-labelledby="approccio-heading"
    >
      <div className="container-page">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow">02 — Approccio</span>
            <h2
              id="approccio-heading"
              className="font-display text-balance mt-5 text-ink"
              style={{
                fontSize: 'var(--fs-display-m)',
                lineHeight: 1.08,
                letterSpacing: '-0.018em',
                fontWeight: 500,
              }}
            >
              Tre principi.{' '}
              <span className="italic text-cobalt">Sempre gli stessi.</span>
            </h2>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7 self-end">
            <p className="text-graphite text-lg leading-relaxed max-w-xl">
              Lavoriamo in modo da farle risparmiare tempo, mal di testa e
              spesso anche denaro. Non promettiamo l'impossibile: indichiamo
              gli scenari realistici e i tempi presumibili fin dal primo
              incontro.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule/40 border border-rule/40">
          {pillars.map((p, i) => (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-paper p-8 md:p-10 flex flex-col"
            >
              <div className="flex items-start justify-between mb-8">
                <p.icon
                  size={28}
                  strokeWidth={1.3}
                  className="text-cobalt"
                  aria-hidden
                />
                <span className="font-mono text-xs text-graphite tabular-nums tracking-wider">
                  {p.n} / 03
                </span>
              </div>

              <h3
                className="font-display text-2xl md:text-[1.75rem] text-ink"
                style={{ lineHeight: 1.1, fontWeight: 500 }}
              >
                {p.title}
              </h3>
              <p className="text-cobalt italic mt-2 text-base">
                {p.headline}
              </p>

              <p className="mt-5 text-graphite leading-relaxed">{p.body}</p>

              <ul className="mt-6 space-y-2 pt-5 border-t border-rule">
                {p.bullet.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-3 text-sm text-ink"
                  >
                    <span
                      aria-hidden
                      className="block w-1.5 h-1.5 bg-gold rounded-full shrink-0"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
