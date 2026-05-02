'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/**
 * AREE DI ATTIVITÀ — formulate come PROBLEMI CONCRETI
 *
 * Brief: «NON usare categorie astratte. Usare problemi concreti.»
 *
 * Ogni card parte dalla situazione reale del cliente ("Un cliente non
 * paga", "Devi firmare un contratto") e non dalla categoria giuridica
 * ("Diritto dei contratti"). Linguaggio diretto, da imprenditore.
 *
 * Le card sono link alle pagine /aree-di-competenza/[slug] esistenti.
 */

const problems = [
  {
    slug: 'recupero-crediti',
    n: '01',
    problem: 'Un cliente non paga.',
    label: 'Recupero crediti',
    body: 'Diffide, decreti ingiuntivi, pignoramenti. Recuperiamo somme da debitori privati e aziende, anche con misure cautelari quando serve essere veloci.',
    keywords: ['Diffida', 'Decreto ingiuntivo', 'Pignoramento'],
  },
  {
    slug: 'diritto-civile',
    n: '02',
    problem: 'Devi firmare (o contestare) un contratto.',
    label: 'Contratti & responsabilità',
    body: 'Verifichiamo, redigiamo e contestiamo contratti commerciali, locazioni, preliminari di vendita. Tuteliamo chi ha subìto un danno da inadempimento.',
    keywords: ['Contratti', 'Risarcimenti', 'Condominio'],
  },
  {
    slug: 'diritto-lavoro',
    n: '03',
    problem: 'Hai una vertenza di lavoro.',
    label: 'Diritto del lavoro',
    body: 'Licenziamenti, mobbing, mansioni dequalificanti, vertenze sindacali. Assistiamo lavoratori e aziende, dalla conciliazione al ricorso giudiziale.',
    keywords: ['Licenziamento', 'Mobbing', 'Vertenze sindacali'],
  },
  {
    slug: 'diritto-famiglia',
    n: '04',
    problem: 'Una separazione, un divorzio, un\'eredità.',
    label: 'Famiglia & successioni',
    body: 'Separazioni consensuali e giudiziali, divorzi, affidamento dei figli, divisioni ereditarie. Approccio rispettoso, focus sui figli quando ci sono.',
    keywords: ['Separazione', 'Divorzio', 'Eredità'],
  },
  {
    slug: 'responsabilita-civile',
    n: '05',
    problem: 'Hai avuto un incidente o un danno.',
    label: 'Risarcimento danni',
    body: 'Sinistri stradali, infortuni, responsabilità medica, danni da prodotti. Recuperiamo dalle assicurazioni il giusto risarcimento, in tempi rapidi.',
    keywords: ['Incidente', 'Infortunio', 'Malasanità'],
  },
  {
    slug: 'diritto-immobiliare',
    n: '06',
    problem: 'Una casa, un confine, uno sfratto.',
    label: 'Immobiliare',
    body: 'Compravendite, locazioni, sfratti, controversie di confine, usucapione. Verifichiamo i preliminari prima della firma per evitare problemi dopo.',
    keywords: ['Compravendita', 'Sfratto', 'Confine'],
  },
];

export function PracticeAreas() {
  return (
    <section
      className="relative bg-paper py-20 md:py-28 overflow-hidden"
      aria-labelledby="aree-heading"
    >
      <div className="container-page relative">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow">03 — Aree</span>
            <h2
              id="aree-heading"
              className="font-display text-balance mt-5 text-ink"
              style={{
                fontSize: 'var(--fs-display-m)',
                lineHeight: 1.08,
                letterSpacing: '-0.018em',
                fontWeight: 500,
              }}
            >
              In cosa possiamo{' '}
              <span className="italic text-cobalt">davvero esserle utili.</span>
            </h2>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7 self-end">
            <p className="text-graphite text-lg leading-relaxed max-w-xl">
              Sei aree di intervento, descritte come problemi concreti che
              incontra ogni giorno chi gestisce un'azienda o una famiglia.
              Trovi quella che la riguarda? Ne parliamo nei primi 15 minuti
              gratuitamente.
            </p>
          </div>
        </div>

        {/* Problem cards */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule/40 border border-rule/40">
          {problems.map((p, i) => (
            <ProblemCard key={p.slug} item={p} index={i} />
          ))}
        </ul>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-graphite">
            Non si riconosce in queste situazioni? Ce lo chieda lo stesso —
            spesso il problema è risolvibile, ci servono solo i dettagli.
          </p>
          <Link href="/aree-di-competenza" className="link-inline">
            Vedi tutte le aree →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProblemCard({
  item: p,
  index,
}: {
  item: (typeof problems)[number] extends infer T ? T : never;
  index: number;
}) {
  const cardRef = useRef<HTMLLIElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLLIElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  }

  return (
    <motion.li
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="card-spotlight group"
    >
      <Link
        href={`/aree-di-competenza/${(p as { slug: string }).slug}` as never}
        className="block p-7 md:p-9 h-full focus:outline-none"
      >
        <div className="flex items-start justify-between mb-6">
          <span className="pill" data-variant="gold">
            {(p as { label: string }).label}
          </span>
          <span className="font-mono text-xs text-graphite tabular-nums">
            {(p as { n: string }).n} / 06
          </span>
        </div>

        <p
          className="font-display text-cobalt mb-3"
          style={{
            fontSize: 'clamp(1.375rem, 1.6vw + 0.5rem, 1.75rem)',
            lineHeight: 1.15,
            fontWeight: 500,
            letterSpacing: '-0.01em',
          }}
        >
          {(p as { problem: string }).problem}
        </p>

        <p className="text-graphite leading-relaxed text-[15px] mb-6">
          {(p as { body: string }).body}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-7">
          {(p as { keywords: string[] }).keywords.map((kw) => (
            <span
              key={kw}
              className="font-mono text-[10px] uppercase tracking-wider text-graphite border border-rule px-2 py-1 transition-colors group-hover:border-cobalt/40"
            >
              {kw}
            </span>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 text-cobalt text-sm font-medium pt-5 border-t border-rule w-full">
          <span className="border-b border-cobalt/0 group-hover:border-cobalt transition-colors">
            Approfondisci
          </span>
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </Link>
    </motion.li>
  );
}
