'use client';

import { motion } from 'motion/react';
import { Timer, MessagesSquare, FolderKanban, Cpu } from 'lucide-react';

/**
 * DIFFERENZIAZIONE
 *
 * Sezione chiave: cosa ci distingue da uno studio tradizionale.
 *  · Risposta rapida (24 h)
 *  · Supporto digitale (firma, video-call, condivisione documenti)
 *  · Gestione efficiente (cartelle digitali, scadenziario)
 *  · Uso tecnologia (knowledge base, automazioni interne)
 *
 * Layout: hero-strip dark con 4 card a contrasto.
 */

const items = [
  {
    icon: Timer,
    title: 'Risposta entro 24 h',
    body: 'Ogni nuova richiesta ha un primo riscontro in giornata lavorativa. Niente settimane di silenzio in attesa di sapere se la pratica può essere presa.',
  },
  {
    icon: MessagesSquare,
    title: 'Supporto digitale',
    body: 'Video-consulenze, firma digitale dei mandati, condivisione documenti via canale riservato. Lei sceglie il canale più comodo, noi lo rendiamo legalmente valido.',
  },
  {
    icon: FolderKanban,
    title: 'Gestione efficiente dei casi',
    body: 'Ogni pratica ha la sua cartella digitale con scadenze, documenti e cronologia delle azioni. Quando ci chiama, abbiamo tutto sott\'occhio in pochi secondi.',
  },
  {
    icon: Cpu,
    title: 'Tecnologia al servizio',
    body: 'Strumenti interni di ricerca giurisprudenziale e automazione delle attività ripetitive. Più tempo dedicato a ragionare sul caso, meno alle pratiche burocratiche.',
  },
];

export function Differentiation() {
  return (
    <section
      className="relative isolate overflow-hidden bg-aurora-dark text-paper py-24 md:py-32"
      aria-labelledby="diff-heading"
    >
      {/* Pattern grid sottile */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--color-paper)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-paper)) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Hairline gold top */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgb(var(--color-gold)/0.6) 50%, transparent)',
        }}
      />

      <div className="container-page relative">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow text-paper/60">04 — Differenze</span>
            <h2
              id="diff-heading"
              className="font-display text-balance mt-5 text-paper"
              style={{
                fontSize: 'var(--fs-display-m)',
                lineHeight: 1.08,
                letterSpacing: '-0.018em',
                fontWeight: 500,
              }}
            >
              Veloci dove serve.{' '}
              <span className="italic text-gold">Precisi sempre.</span>
            </h2>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7 self-end">
            <p className="text-paper/75 text-lg leading-relaxed max-w-xl">
              La differenza fra uno studio che lavora come negli anni '90 e
              uno che lavora oggi non sta nel parcelle: sta nei tempi, nella
              chiarezza e in quanto le facciamo perdere tempo. Noi puntiamo a
              farle risparmiare tempo.
            </p>
          </div>
        </div>

        {/* 4 differenziatori */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper/15">
          {items.map((it, i) => (
            <motion.li
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-cobalt-deep p-8 md:p-10 flex gap-5"
            >
              <span
                aria-hidden
                className="shrink-0 inline-flex items-center justify-center w-12 h-12 border border-paper/15 text-gold"
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                <it.icon size={22} strokeWidth={1.4} />
              </span>
              <div>
                <h3
                  className="font-display text-2xl text-paper"
                  style={{ fontWeight: 500, letterSpacing: '-0.01em' }}
                >
                  {it.title}
                </h3>
                <p className="mt-3 text-paper/70 leading-relaxed text-[15px]">
                  {it.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
