'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight, FileText } from 'lucide-react';

const guides = [
  {
    slug: 'separazione-consensuale-checklist',
    cat: 'Famiglia',
    title: 'Separazione consensuale: la checklist degli 8 passi',
    pages: 12,
    ico: '§',
  },
  {
    slug: 'diffida-ad-adempiere-modello',
    cat: 'Civile',
    title: 'Diffida ad adempiere: modello editabile e istruzioni',
    pages: 6,
    ico: '◊',
  },
  {
    slug: 'incidente-stradale-prime-24-ore',
    cat: 'Risarcimento',
    title: 'Incidente stradale: cosa fare nelle prime 24 ore',
    pages: 8,
    ico: '✦',
  },
];

export function ResourcesTeaser() {
  return (
    <section
      className="bg-paper-warm py-20 md:py-28"
      aria-labelledby="risorse-heading"
    >
      <div className="container-page">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8 mb-16">
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow">§ 05 · Risorse</span>
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
            <motion.li
              key={g.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 sm:col-span-6 lg:col-span-4"
            >
              <Link
                href={`/guide/${g.slug}` as never}
                className="group block bg-paper p-8 h-full border border-rule hover:border-cobalt/60 transition-all duration-500 hover:shadow-[0_8px_24px_rgba(15,34,64,0.06)]"
              >
                <div className="flex items-start justify-between mb-12">
                  <span className="font-display text-4xl text-cobalt leading-none">
                    {g.ico}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite border border-rule px-2 py-1">
                    {g.cat}
                  </span>
                </div>

                <h3 className="font-display text-xl md:text-[1.5rem] leading-snug mb-6 text-balance">
                  {g.title}
                </h3>

                <div className="flex items-center justify-between pt-6 border-t border-rule">
                  <span className="flex items-center gap-2 text-xs text-graphite font-mono">
                    <FileText size={12} /> PDF · {g.pages} pp.
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-cobalt transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </Link>
            </motion.li>
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
