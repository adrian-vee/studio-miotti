import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SITE_DATA } from '@/lib/site-data';

export const metadata = pageMeta({
  title: "Lo Studio · Avv. Massimiliano Miotti",
  description:
    "Conosca l'Avv. Massimiliano Miotti, avvocato a San Bonifacio (VR). Formazione, esperienza, metodo di lavoro e principi dello Studio.",
  path: '/studio/',
  keywords: ['avvocato san bonifacio', 'massimiliano miotti', 'studio legale verona'],
});

export default function StudioPage() {
  return (
    <>
      {/* Hero pagina */}
      <section className="bg-paper pt-32 md:pt-40 pb-20">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12">
            <div className="col-span-12 md:col-span-2">
              <span className="font-display text-cobalt text-7xl md:text-8xl leading-none">§</span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite mt-4">
                Cap. 01<br />Lo Studio
              </p>
            </div>

            <div className="col-span-12 md:col-span-10">
              <span className="eyebrow mb-6">Profilo professionale</span>
              <h1
                className="font-display tracking-tight"
                style={{ fontSize: 'var(--fs-display-l)', lineHeight: 1 }}
              >
                Avv. Massimiliano <span className="italic text-cobalt">Miotti</span>
              </h1>

              <div className="my-10 h-px w-full bg-ink/30" />

              <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
                <div className="col-span-12 md:col-span-7 space-y-6 text-graphite text-lg leading-relaxed">
                  {SITE_DATA.bio.intro ? (
                    <p className="text-ink">{SITE_DATA.bio.intro}</p>
                  ) : (
                    <p className="text-ink italic text-graphite">
                      Profilo professionale in aggiornamento.
                    </p>
                  )}
                  {SITE_DATA.bio.formazione && <p>{SITE_DATA.bio.formazione}</p>}
                  {SITE_DATA.bio.esperienza && <p>{SITE_DATA.bio.esperienza}</p>}
                  {SITE_DATA.bio.filosofia && <p>{SITE_DATA.bio.filosofia}</p>}
                </div>

                <aside className="col-span-12 md:col-span-5 md:pl-8 md:border-l border-rule">
                  <h2 className="text-xs uppercase tracking-[0.18em] text-graphite mb-6">
                    Dati professionali
                  </h2>
                  <dl className="space-y-5 text-sm">
                    <div>
                      <dt className="text-graphite mb-1">Foro di iscrizione</dt>
                      <dd>Ordine degli Avvocati di Verona</dd>
                    </div>
                    {SITE_DATA.barNumber && (
                      <div>
                        <dt className="text-graphite mb-1">N. iscrizione</dt>
                        <dd className="font-mono">{SITE_DATA.barNumber}</dd>
                      </div>
                    )}
                    {SITE_DATA.barYear && (
                      <div>
                        <dt className="text-graphite mb-1">Anno iscrizione</dt>
                        <dd className="font-mono">{SITE_DATA.barYear}</dd>
                      </div>
                    )}
                    {SITE_DATA.languages && (
                      <div>
                        <dt className="text-graphite mb-1">Lingue di lavoro</dt>
                        <dd>{SITE_DATA.languages}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-graphite mb-1">Codice Fiscale</dt>
                      <dd className="font-mono text-xs">{SITE_DATA.cf}</dd>
                    </div>
                  </dl>

                  <Link
                    href="/prenota"
                    className="btn-primary mt-10 w-full justify-center group"
                  >
                    Fissi un primo confronto
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filosofia */}
      <section className="bg-paper-warm py-20 md:py-28">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
            <div className="col-span-12 md:col-span-4">
              <span className="eyebrow">§ 02 · Filosofia</span>
            </div>
            <div className="col-span-12 md:col-span-8">
              <blockquote className="font-display text-3xl md:text-5xl leading-tight text-balance">
                "Il diritto non è una stanza chiusa con una porta segreta.
                <span className="italic text-cobalt"> È un linguaggio.</span>
                Il mio lavoro è tradurlo per chi mi affida la sua questione."
              </blockquote>
              <p className="mt-8 text-sm text-graphite font-mono uppercase tracking-wider">
                — Avv. Massimiliano Miotti
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
