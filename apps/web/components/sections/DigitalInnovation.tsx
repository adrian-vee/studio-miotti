'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight, FileSignature, Calendar, Database, ShieldCheck } from 'lucide-react';

/**
 * INNOVAZIONE DIGITALE
 *
 * Riferimento esplicito agli strumenti digitali dello studio:
 *  · Firma digitale del mandato e dei documenti
 *  · Calendario condiviso per scadenze e udienze
 *  · Knowledge base interna per ricerca rapida giurisprudenza
 *  · Comunicazioni cifrate e protezione dati a norma GDPR
 *
 * NIENTE chatbot visibile in homepage (LEX è solo floating button).
 * Niente termini buzzword vuoti — descriviamo solo strumenti reali.
 */

const tools = [
  {
    icon: FileSignature,
    title: 'Firma digitale',
    body: 'Mandato, procure e documenti firmati a distanza con valore legale. Niente più stampe e scansioni di andata e ritorno.',
  },
  {
    icon: Calendar,
    title: 'Scadenziario condiviso',
    body: 'Le scadenze procedurali e le udienze sono tracciate in tempo reale. Lei riceve un promemoria, noi lavoriamo sul pezzo.',
  },
  {
    icon: Database,
    title: 'Ricerca giurisprudenziale',
    body: 'Strumenti interni che riducono i tempi di ricerca dei precedenti, in modo da arrivare prima alla strategia giusta.',
  },
  {
    icon: ShieldCheck,
    title: 'Comunicazioni protette',
    body: 'Canale riservato per scambiare documenti, conformità GDPR e cifratura TLS sui canali digitali. Riservatezza prima di tutto.',
  },
];

export function DigitalInnovation() {
  return (
    <section
      className="relative bg-paper-warm py-20 md:py-28 overflow-hidden"
      aria-labelledby="innovazione-heading"
    >
      {/* Hairline gold top */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgb(var(--color-gold)/0.5) 50%, transparent)',
        }}
      />

      <div className="container-page">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow">05 — Tecnologia</span>
            <h2
              id="innovazione-heading"
              className="font-display text-balance mt-5 text-ink"
              style={{
                fontSize: 'var(--fs-display-m)',
                lineHeight: 1.08,
                letterSpacing: '-0.018em',
                fontWeight: 500,
              }}
            >
              Strumenti digitali,{' '}
              <span className="italic text-cobalt">attenzione umana.</span>
            </h2>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7 self-end">
            <p className="text-graphite text-lg leading-relaxed max-w-xl">
              La tecnologia non sostituisce l'avvocato: gli libera tempo per
              quello che conta — capire la sua situazione e costruire una
              strategia. Lo Studio adotta strumenti digitali per essere più
              veloce, mai meno preciso.
            </p>
          </div>
        </div>

        {/* Tools grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-rule/40 border border-rule/40">
          {tools.map((t, i) => (
            <motion.li
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-paper p-7 md:p-8"
            >
              <span
                aria-hidden
                className="inline-flex items-center justify-center w-11 h-11 bg-vellum text-cobalt border border-gold/40 mb-6"
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                <t.icon size={20} strokeWidth={1.4} />
              </span>
              <h3
                className="font-display text-xl text-ink"
                style={{ fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.2 }}
              >
                {t.title}
              </h3>
              <p className="mt-3 text-sm text-graphite leading-relaxed">
                {t.body}
              </p>
            </motion.li>
          ))}
        </ul>

        {/* Footer note + link allo studio */}
        <div className="mt-12 grid grid-cols-12 gap-x-[var(--gutter)] gap-y-4 items-end">
          <p className="col-span-12 md:col-span-7 text-sm text-graphite leading-relaxed max-w-2xl">
            Tutti gli strumenti digitali sono opzionali: se preferisce la
            firma in studio, il faldone cartaceo o il telefono fisso, nessun
            problema. La tecnologia serve lei, non viceversa.
          </p>
          <div className="col-span-12 md:col-span-5 md:text-right">
            <Link href="/studio" className="link-inline text-sm">
              Come lavoriamo in studio →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
