import { pageMeta } from '@/lib/seo';
import { PracticeAreas } from '@/components/sections/PracticeAreas';

export const metadata = pageMeta({
  title: 'Aree di Competenza · Studio Legale Miotti',
  description:
    "Diritto civile, di famiglia, del lavoro, recupero crediti, immobiliare, responsabilità civile. Le aree in cui lo Studio assiste privati e imprese a San Bonifacio e Verona.",
  path: '/aree-di-competenza/',
  keywords: [
    'avvocato civile san bonifacio',
    'avvocato famiglia verona',
    'recupero crediti san bonifacio',
    'avvocato lavoro verona',
  ],
});

export default function AreePage() {
  return (
    <>
      <section className="bg-paper pt-32 md:pt-40 pb-12">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
            <div className="col-span-12 md:col-span-2">
              <span className="font-display text-cobalt text-7xl md:text-8xl leading-none">§</span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite mt-4">
                Cap. 02<br />Aree
              </p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <span className="eyebrow mb-6">Pratica professionale</span>
              <h1 className="font-display text-balance" style={{ fontSize: 'var(--fs-display-l)', lineHeight: 1 }}>
                Sei aree, <span className="italic text-cobalt">una stessa cura.</span>
              </h1>
              <p className="mt-8 text-graphite text-lg max-w-2xl leading-relaxed">
                Lo Studio si concentra sul diritto civile in senso ampio.
                Quando una pratica esula dalle aree elencate (penale specialistico,
                tributario complesso, amministrativo), Le indichiamo un collega di fiducia
                in Verona o nelle province limitrofe.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PracticeAreas />
    </>
  );
}
