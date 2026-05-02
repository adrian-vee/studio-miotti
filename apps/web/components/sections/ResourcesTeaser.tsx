'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight, FileText, BookOpen, Clock } from 'lucide-react';

/**
 * GUIDE & CONTENUTI
 *
 * Articoli/guide pratiche, linguaggio semplice, orientati SEO long-tail
 * (es. "come fare diffida ad adempiere", "incidente stradale cosa fare").
 *
 * Le card mostrano: categoria, titolo, tempo di lettura, formato.
 * Cursor spotlight + hairline gold progress su hover.
 */

const guides = [
  {
    slug: 'separazione-consensuale-checklist',
    cat: 'Famiglia',
    title: 'Separazione consensuale: la checklist degli 8 passi',
    excerpt: 'Documenti, tempi, costi e cosa concordare prima di andare dall\'avvocato.',
    pages: 12,
    minutes: 6,
    ico: FileText,
  },
  {
    slug: 'diffida-ad-adempiere-modello',
    cat: 'Civile',
    title: 'Diffida ad adempiere: modello editabile e istruzioni',
    excerpt: 'Cosa scrivere, come notificare, quando trasforma il contratto in titolo eseguibile.',
    pages: 6,
    minutes: 4,
    ico: BookOpen,
  },
  {
    slug: 'incidente-stradale-prime-24-ore',
    cat: 'Risarcimento',
    title: 'Incidente stradale: cosa fare nelle prime 24 ore',
    excerpt: 'I 7 passaggi che proteggono il risarcimento, dal CID alla denuncia all\'assicurazione.',
    pages: 8,
    minutes: 5,
    ico: Clock,
  },
];

export function ResourcesTeaser() {
  return (
    <section
      className="relative bg-paper py-20 md:py-28 overflow-hidden"
      aria-labelledby="risorse-heading"
    >
      <div className="container-page">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-5">
            <span className="eyebrow">06 — Guide</span>
            <h2
              id="risorse-heading"
              className="font-display text-balance mt-5 text-ink"
              style={{
                fontSize: 'var(--fs-display-m)',
                lineHeight: 1.08,
                letterSpacing: '-0.018em',
                fontWeight: 500,
              }}
            >
              Guide pratiche,{' '}
              <span className="italic text-cobalt">in italiano semplice.</span>
            </h2>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7 self-end">
            <p className="text-graphite text-lg leading-relaxed max-w-xl">
              Documenti scaricabili, modelli editabili e checklist operative.
              Pensati per orientarsi prima ancora di prendere appuntamento —
              gratuiti e senza richiesta di email.
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

  const Ico = g.ico;

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
        className="block p-7 md:p-8 h-full focus:outline-none"
      >
        <div className="flex items-start justify-between mb-8">
          <span
            aria-hidden
            className="inline-flex items-center justify-center w-11 h-11 bg-vellum border border-gold/40 text-cobalt"
            style={{ borderRadius: 'var(--radius-sm)' }}
          >
            <Ico size={20} strokeWidth={1.4} />
          </span>
          <span className="pill" data-variant="gold">
            {g.cat}
          </span>
        </div>

        <h3
          className="font-display text-xl md:text-[1.375rem] leading-snug mb-3 text-balance text-ink"
          style={{ fontWeight: 500, letterSpacing: '-0.01em' }}
        >
          {g.title}
        </h3>
        <p className="text-graphite text-sm leading-relaxed mb-7">
          {g.excerpt}
        </p>

        <div className="pt-5 border-t border-rule">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-3 text-xs text-graphite font-mono">
              <span className="inline-flex items-center gap-1">
                <FileText size={12} /> PDF · {g.pages} pp.
              </span>
              <span aria-hidden className="text-rule">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={12} /> {g.minutes} min
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-cobalt text-xs font-mono uppercase tracking-wider">
              Leggi
              <ArrowUpRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>

          <span
            aria-hidden
            className="block h-px bg-gold/30 origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] scale-x-50 group-hover:scale-x-100"
          />
        </div>
      </Link>
    </motion.li>
  );
}
