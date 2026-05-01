import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
                  <p className="text-ink">
                    {`{{TODO_BIO_INTRO}}`} — Lead paragrafo: 2-3 frasi che riassumano chi è l'avvocato,
                    la sua formazione e la filosofia del lavoro.
                  </p>
                  <p>
                    {`{{TODO_BIO_FORMAZIONE}}`} — Università, eventuali specializzazioni (master,
                    Scuola di Specializzazione per le Professioni Legali), anno iscrizione albo.
                  </p>
                  <p>
                    {`{{TODO_BIO_ESPERIENZA}}`} — Anni di esperienza, principali aree di pratica
                    consolidate negli anni, eventuali ruoli accademici/associativi.
                  </p>
                  <p>
                    {`{{TODO_BIO_FILOSOFIA}}`} — La visione del lavoro: perché ha scelto la libera
                    professione, cosa lo distingue da uno studio di città.
                  </p>
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
                    <div>
                      <dt className="text-graphite mb-1">N. iscrizione</dt>
                      <dd className="font-mono">{`{{TODO_BAR_NUMBER}}`}</dd>
                    </div>
                    <div>
                      <dt className="text-graphite mb-1">Anno iscrizione</dt>
                      <dd className="font-mono">{`{{TODO_BAR_YEAR}}`}</dd>
                    </div>
                    <div>
                      <dt className="text-graphite mb-1">Lingue di lavoro</dt>
                      <dd>{`{{TODO_LANGUAGES}}`}</dd>
                    </div>
                    <div>
                      <dt className="text-graphite mb-1">Codice Fiscale</dt>
                      <dd className="font-mono text-xs">MTTMSM75D07H783Q</dd>
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
