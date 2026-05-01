import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export const metadata = pageMeta({
  title: 'Metodo e Criteri Professionali · Studio Legale Miotti',
  description:
    "Come lavoriamo: preventivo scritto sempre, lavoro a forfait quando il perimetro è definito, scomposizione in fasi quando la causa è complessa.",
  path: '/tariffe/',
  keywords: [
    'metodo avvocato verona',
    'preventivo avvocato san bonifacio',
    'criteri professionali studio legale',
  ],
});

const principles = [
  {
    n: '01',
    title: 'Preventivo scritto sempre',
    body: "Prima di accettare l'incarico Le consegniamo un preventivo scritto e firmato, che descrive l'oggetto, le fasi previste, gli adempimenti e i criteri di calcolo dell'attività professionale.",
  },
  {
    n: '02',
    title: 'Forfait quando possibile',
    body: "Per pratiche dal perimetro definito (separazione consensuale, decreto ingiuntivo, sfratto) lavoriamo a forfait: l'impegno è chiaro fin dal primo giorno, senza componenti variabili.",
  },
  {
    n: '03',
    title: 'A fasi quando complesso',
    body: 'Per cause complesse suddividiamo il lavoro in fasi (studio, fase introduttiva, istruttoria, decisionale): ogni fase ha un proprio perimetro e viene rendicontata a sua chiusura.',
  },
  {
    n: '04',
    title: 'Patto di quota lite',
    body: 'In casi specifici (recupero crediti, risarcimento danni) possiamo concordare modalità correlate al risultato, sempre nei limiti deontologici e con accordo scritto.',
  },
];

export default function TariffePage() {
  return (
    <>
      <section className="bg-paper pt-32 md:pt-40 pb-16">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
            <div className="col-span-12 md:col-span-2">
              <span className="font-display text-cobalt text-7xl md:text-8xl leading-none">
                §
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite mt-4">
                Cap. 04<br />Metodo
              </p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <span className="eyebrow mb-6">Metodo professionale</span>
              <h1
                className="font-display text-balance"
                style={{ fontSize: 'var(--fs-display-l)', lineHeight: 1 }}
              >
                Il nostro metodo,{' '}
                <span className="italic text-cobalt">i nostri criteri.</span>
              </h1>
              <div className="my-10 h-px w-full bg-ink/30" />
              <p className="text-graphite text-lg leading-relaxed max-w-3xl">
                Il modo in cui lo Studio organizza il lavoro è coerente con il
                modo in cui lo comunica: niente formule generiche, niente
                "extra" non concordati. Ogni incarico parte da un perimetro
                definito per iscritto, in cui sono chiare le fasi, gli
                adempimenti e i criteri di calcolo dell'attività professionale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-warm py-20 md:py-28">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12">
            <div className="col-span-12 md:col-span-4">
              <span className="eyebrow">Quattro principi</span>
              <h2 className="font-display text-3xl md:text-4xl mt-4 leading-tight">
                Come <span className="italic text-cobalt">lavoriamo.</span>
              </h2>
            </div>

            <div className="col-span-12 md:col-span-8 space-y-px bg-rule">
              {principles.map((p) => (
                <article
                  key={p.n}
                  className="bg-paper p-8 grid grid-cols-12 gap-x-[var(--gutter)] gap-y-3"
                >
                  <div className="col-span-12 md:col-span-2">
                    <span className="font-mono text-cobalt text-sm">{p.n}</span>
                  </div>
                  <div className="col-span-12 md:col-span-10">
                    <h3 className="font-display text-xl mb-2">{p.title}</h3>
                    <p className="text-graphite leading-relaxed text-sm">
                      {p.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
            <div className="col-span-12 md:col-span-4">
              <span className="eyebrow">Cosa è incluso</span>
              <h2 className="font-display text-3xl md:text-4xl mt-4 leading-tight">
                Sempre <span className="italic text-cobalt">compreso.</span>
              </h2>
            </div>

            <ul className="col-span-12 md:col-span-8 grid sm:grid-cols-2 gap-3">
              {[
                'Studio della pratica e della documentazione',
                'Riunioni illimitate (in studio o via video)',
                'Aggiornamenti scritti periodici',
                'Comunicazioni con la controparte',
                'Atti giudiziari di parte',
                'Email e telefonate inerenti la pratica',
                'Accesso atti presso uffici giudiziari',
                'Consulenza post-sentenza per 90 giorni',
              ].map((c) => (
                <li
                  key={c}
                  className="flex gap-3 bg-paper-warm p-5 border border-rule text-sm"
                >
                  <Check size={16} className="text-cobalt shrink-0 mt-0.5" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-cobalt-deep text-paper py-20 md:py-24">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8 items-center">
            <div className="col-span-12 md:col-span-8">
              <h2
                className="font-display text-balance"
                style={{ fontSize: 'var(--fs-display-m)', lineHeight: 1.1 }}
              >
                Il primo
                <br />
                <span className="italic text-gold">confronto.</span>
              </h2>
              <p className="mt-6 text-paper/70 max-w-xl">
                Quindici minuti di colloquio iniziale, in studio o al telefono,
                dedicati a inquadrare la Sua situazione e capire se posso
                esserle utile.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <Link
                href="/prenota"
                className="inline-flex items-center justify-center gap-2 bg-paper text-ink px-7 py-4 text-sm font-medium hover:bg-gold transition-colors"
              >
                Fissa il primo confronto
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
