'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionMarker } from './SectionMarker';

/**
 * AREE DI COMPETENZA — Hub SEO
 *
 * Ogni card è la porta d'ingresso a una pagina dedicata, ottimizzata per keyword
 * tier 2 (es. "avvocato divorzio verona", "recupero crediti san bonifacio").
 *
 * Le icone sono SVG inline custom — niente icon pack standard.
 * Nascono da forme geometriche pure: cerchi, linee, angoli.
 */

const areas = [
  {
    slug: 'diritto-civile',
    n: '01',
    title: 'Diritto Civile',
    short: 'Contratti, obbligazioni, responsabilità.',
    body: 'Redazione e analisi contratti, controversie commerciali, tutela del credito, risarcimento danni, diritto immobiliare e condominiale.',
    keywords: ['contratti', 'risarcimenti', 'condominio', 'recupero crediti'],
    icon: <CivileIcon />,
  },
  {
    slug: 'diritto-famiglia',
    n: '02',
    title: 'Diritto di Famiglia',
    short: 'Separazioni, divorzi, minori, successioni.',
    body: 'Separazioni consensuali e giudiziali, divorzio, affidamento e mantenimento dei figli, successioni testamentarie e legittime, divisioni ereditarie.',
    keywords: ['separazione', 'divorzio', 'affidamento', 'eredità'],
    icon: <FamigliaIcon />,
  },
  {
    slug: 'diritto-lavoro',
    n: '03',
    title: 'Diritto del Lavoro',
    short: 'Tutele del lavoratore e dell\'azienda.',
    body: 'Impugnazione licenziamenti, vertenze sindacali, mobbing, mansioni dequalificanti, contenziosi previdenziali, contrattualistica del lavoro per imprese.',
    keywords: ['licenziamento', 'mobbing', 'vertenze', 'INPS'],
    icon: <LavoroIcon />,
  },
  {
    slug: 'recupero-crediti',
    n: '04',
    title: 'Recupero Crediti',
    short: 'Dalla diffida al pignoramento.',
    body: 'Procedure stragiudiziali e giudiziali, decreti ingiuntivi, pignoramenti mobiliari e immobiliari, recupero da debitori privati e aziende, anche con metodo cautelare.',
    keywords: ['decreto ingiuntivo', 'diffida', 'pignoramento'],
    icon: <CreditiIcon />,
  },
  {
    slug: 'diritto-immobiliare',
    n: '05',
    title: 'Diritto Immobiliare',
    short: 'Compravendita, locazioni, usucapione.',
    body: 'Verifica e redazione preliminari, contenziosi tra venditore e acquirente, sfratti, locazioni commerciali, controversie di confine, usucapione.',
    keywords: ['compravendita', 'sfratto', 'usucapione', 'preliminare'],
    icon: <ImmobiliareIcon />,
  },
  {
    slug: 'responsabilita-civile',
    n: '06',
    title: 'Responsabilità Civile',
    short: 'Danni alla persona e ai beni.',
    body: 'Sinistri stradali, infortunistica, responsabilità sanitaria, danni da prodotti, recupero risarcimenti dalle assicurazioni con copertura completa del contenzioso.',
    keywords: ['incidente', 'infortunio', 'risarcimento', 'malasanità'],
    icon: <ResponsabilitaIcon />,
  },
];

export function PracticeAreas() {
  return (
    <section
      className="bg-paper py-20 md:py-28 relative overflow-hidden"
      aria-labelledby="aree-heading"
    >
      <SectionMarker numeral="III" label="Aree" align="right" />

      <div className="container-page relative">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow">§ 03 · Aree</span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              id="aree-heading"
              className="font-display text-balance"
              style={{ fontSize: 'var(--fs-display-m)', lineHeight: 1.05 }}
            >
              Sei aree, un metodo:
              <br />
              <span className="italic text-cobalt">capire prima di rispondere.</span>
            </h2>
            <p className="mt-6 text-graphite max-w-xl text-lg leading-relaxed">
              Lo Studio segue privati e imprese in tutto il diritto civile.
              Ogni pratica viene aperta solo dopo un'analisi preliminare gratuita
              che valuta la praticabilità dell'azione e i suoi costi.
            </p>
          </div>
        </div>

        <ol className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-px bg-rule/40 border-y border-rule/40">
          {areas.map((area, i) => (
            <PracticeCard key={area.slug} area={area} index={i} />
          ))}
        </ol>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-graphite">
            Ogni area è descritta in una pagina dedicata con casi tipici, tempistiche e onorari indicativi.
          </p>
          <Link href="/aree-di-competenza" className="link-inline">
            Esplora tutte le aree →
          </Link>
        </div>
      </div>
    </section>
  );
}

function PracticeCard({
  area,
  index,
}: {
  area: (typeof areas)[number];
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-12 sm:col-span-6 lg:col-span-4 bg-paper hover:bg-paper-warm transition-colors duration-500"
    >
      <Link
        href={`/aree-di-competenza/${area.slug}` as never}
        className="group block p-8 md:p-10 h-full"
      >
        <div className="flex items-start justify-between mb-8">
          <div className="text-cobalt">{area.icon}</div>
          <span className="font-mono text-xs text-graphite tabular-nums">
            {area.n} / 06
          </span>
        </div>

        <h3 className="font-display text-2xl md:text-[1.75rem] leading-snug mb-3">
          {area.title}
        </h3>
        <p className="text-cobalt italic mb-6 text-sm">{area.short}</p>

        <p className="text-graphite text-sm leading-relaxed mb-8">{area.body}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {area.keywords.map((kw) => (
            <span
              key={kw}
              className="font-mono text-[10px] uppercase tracking-wider text-graphite border border-rule px-2 py-1"
            >
              {kw}
            </span>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 text-cobalt text-sm font-medium">
          <span>Approfondisci l'area</span>
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </Link>
    </motion.li>
  );
}

/* ─── ICONE CUSTOM SVG ─────────────────────────────────────────── */
/* Stile: stroke 1.25, geometriche pure, no fill se non per dettaglio. */

function CivileIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.25">
      <rect x="6" y="8" width="28" height="24" />
      <line x1="6" y1="14" x2="34" y2="14" />
      <line x1="12" y1="20" x2="28" y2="20" />
      <line x1="12" y1="25" x2="22" y2="25" />
    </svg>
  );
}
function FamigliaIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.25">
      <circle cx="14" cy="13" r="4" />
      <circle cx="26" cy="13" r="4" />
      <path d="M6 32c0-5 3.5-8 8-8s8 3 8 8" />
      <path d="M22 32c0-5 3-7 6-7s4 2 4 7" />
    </svg>
  );
}
function LavoroIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.25">
      <rect x="6" y="14" width="28" height="18" />
      <path d="M14 14V10h12v4" />
      <line x1="20" y1="20" x2="20" y2="26" />
    </svg>
  );
}
function CreditiIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.25">
      <rect x="6" y="12" width="28" height="18" />
      <line x1="6" y1="18" x2="34" y2="18" />
      <circle cx="13" cy="24" r="2" />
      <line x1="20" y1="24" x2="30" y2="24" />
    </svg>
  );
}
function ImmobiliareIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M6 20L20 8l14 12" />
      <path d="M10 20v12h20V20" />
      <rect x="17" y="24" width="6" height="8" />
    </svg>
  );
}
function ResponsabilitaIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M20 4l14 6v10c0 8-6 14-14 16-8-2-14-8-14-16V10z" />
      <path d="M14 20l4 4 8-8" />
    </svg>
  );
}
