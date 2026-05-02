'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight, FileText, Download } from 'lucide-react';
import { SectionMarker } from './SectionMarker';

/**
 * RESOURCES TEASER · v2026
 *
 * Card con cursor spotlight (gold radial) e CTA "Scarica" inline.
 * Indicatore "PDF · N pagine · IT" più una progress hairline che cresce
 * al hover (100% delle pagine già scritte = 100% disponibile).
 *
 * Le risorse sono pensate per intercettare keyword di problema
 * ("come funziona la separazione consensuale", "modello diffida ad
 * adempiere"). Niente lead-magnet aggressivi.
 */

const guides = [
  {
    slug: 'separazione-consensuale-checklist',
    cat: 'Famiglia',
    title: 'Separazione consensuale: la checklist degli 8 passi',
    pages: 12,
    ico: '§',
    ready: true,
  },
  {
    slug: 'diffida-ad-adempiere-modello',
    cat: 'Civile',
    title: 'Diffida ad adempiere: modello editabile e istruzioni',
    pages: 6,
    ico: '◊',
    ready: true,
  },
  {
    slug: 'incidente-stradale-prime-24-ore',
    cat: 'Risarcimento',
    title: 'Incidente stradale: cosa fare nelle prime 24 ore',
    pages: 8,
    ico: '✦',
    ready: true,
  },
];

export function ResourcesTeaser() {
  return (
    <section
      className="relative bg-paper py-20 md:py-28 overflow-hidden"
      aria-labelledby="risorse-heading"
    >
      <SectionMarker numeral="VI" label="Risorse" align="right" />

      {/* Hairline gold orizzontale top */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgb(var(--color-gold)/0.5) 50%, transparent)',
        }}
      />

      <div className="container-page">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8 mb-16">
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow">§ 06 · Risorse</span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              id="risorse-heading"
              className="font-display text-balance"
              style={{ fontSize: 'var(--fs-display-m)', lineHeight: 1.05 }}
            >
              Guide gratuite,
              <br />
              <span className="italic text-cobalt">in linguaggio chiaro.</span>
            </h2>
            <p className="mt-6 text-graphite text-lg leading-relaxed max-w-xl">
              Documenti scaricabili in PDF. Argomenti pratici, modelli editabili,
              checklist operative. Pensati perché possa orientarsi prima ancora di
              parlare con un avvocato.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
          {guides.map((g, i) => (
            <GuideCard key={g.slug} guide={g} index={i} />
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Link href="/guide" className="btn-secondary">
            Tutte le guide →
          </Link>
        </div>
      </div>
    </section>
  );
}

function GuideCard({
  guide: g,
  index: i,
}: {
  guide: (typeof guides)[number];
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-12 sm:col-span-6 lg:col-span-4 card-spotlight group"
    >
      <Link
        href={`/guide/${g.slug}` as never}
        className="block p-8 h-full focus:outline-none"
      >
        <div className="flex items-start justify-between mb-12">
          <span className="font-display text-4xl text-cobalt leading-none transition-transform duration-500 group-hover:-translate-y-0.5">
            {g.ico}
          </span>
          <span className="pill" data-variant="gold">
            {g.cat}
          </span>
        </div>

        <h3 className="font-display text-xl md:text-[1.5rem] leading-snug mb-6 text-balance">
          {g.title}
        </h3>

        <div className="pt-6 border-t border-rule">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-2 text-xs text-graphite font-mono">
              <FileText size={12} /> PDF · {g.pages} pp. · IT
            </span>
            <span className="inline-flex items-center gap-1.5 text-cobalt text-xs font-mono uppercase tracking-wider">
              <Download size={12} /> Scarica
              <ArrowUpRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>

          {/* Hairline progress che cresce al hover — segno che la guida è pronta */}
          <span
            aria-hidden
            className="block h-px bg-gold/30 origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] scale-x-50 group-hover:scale-x-100"
          />
        </div>
      </Link>
    </motion.li>
  );
}
