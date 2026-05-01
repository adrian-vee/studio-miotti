import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { ArrowUpRight, FileText } from 'lucide-react';

export const metadata = pageMeta({
  title: 'Guide Legali Gratuite · Studio Legale Miotti',
  description:
    "Guide gratuite scaricabili in PDF su separazione, lavoro, recupero crediti, incidenti stradali. Linguaggio chiaro, contenuti aggiornati.",
  path: '/guide/',
  keywords: ['guide legali gratuite', 'modello diffida', 'guida separazione consensuale'],
});

const guides = [
  {
    slug: 'separazione-consensuale-checklist',
    cat: 'Diritto di Famiglia',
    title: 'Separazione consensuale: la checklist degli 8 passi',
    description: "Le otto azioni indispensabili da compiere prima, durante e dopo la separazione consensuale. Con riferimenti normativi e tempistiche realistiche.",
    pages: 12,
    type: 'PDF + checklist',
  },
  {
    slug: 'diffida-ad-adempiere-modello',
    cat: 'Diritto Civile',
    title: 'Diffida ad adempiere: modello editabile e istruzioni',
    description: "Modello di diffida personalizzabile in formato Word, con guida passo-passo per la compilazione e indicazioni sui tempi di legge.",
    pages: 6,
    type: 'PDF + .docx',
  },
  {
    slug: 'incidente-stradale-prime-24-ore',
    cat: 'Risarcimento Danni',
    title: 'Incidente stradale: cosa fare nelle prime 24 ore',
    description: "Vademecum operativo: dal CID alla denuncia, dai certificati medici alla raccolta testimonianze. Per non perdere il diritto al risarcimento.",
    pages: 8,
    type: 'PDF',
  },
];

export default function GuidePage() {
  return (
    <>
      <section className="bg-paper pt-32 md:pt-40 pb-12">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
            <div className="col-span-12 md:col-span-2">
              <span className="font-display text-cobalt text-7xl md:text-8xl leading-none">§</span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite mt-4">
                Cap. 07<br />Guide
              </p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <span className="eyebrow mb-6">Risorse gratuite</span>
              <h1 className="font-display text-balance" style={{ fontSize: 'var(--fs-display-l)', lineHeight: 1 }}>
                Guide pratiche, <span className="italic text-cobalt">linguaggio chiaro.</span>
              </h1>
              <p className="mt-8 text-graphite text-lg leading-relaxed max-w-2xl">
                Documenti scaricabili pensati per aiutarLa a orientarsi prima ancora di
                parlare con un avvocato. Aggiornati alla normativa vigente, con modelli
                editabili dove utile.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-warm py-16 md:py-24">
        <div className="container-page">
          <ul className="space-y-px bg-rule">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guide/${g.slug}` as never}
                  className="group block bg-paper p-8 md:p-10 hover:bg-paper-warm transition-colors"
                >
                  <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-4 items-start">
                    <div className="col-span-12 md:col-span-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cobalt">
                        {g.cat}
                      </span>
                    </div>
                    <div className="col-span-12 md:col-span-7">
                      <h2 className="font-display text-2xl md:text-3xl leading-snug mb-3 group-hover:text-cobalt transition-colors">
                        {g.title}
                      </h2>
                      <p className="text-graphite text-sm leading-relaxed">{g.description}</p>
                    </div>
                    <div className="col-span-12 md:col-span-3 md:text-right flex md:flex-col items-baseline md:items-end gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-graphite border border-rule px-2 py-1">
                        {g.type}
                      </span>
                      <span className="text-xs text-graphite flex items-center gap-1">
                        <FileText size={12} />
                        {g.pages} pagine
                      </span>
                      <span className="inline-flex items-center gap-1 text-cobalt text-sm mt-2 font-medium">
                        Scarica
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
