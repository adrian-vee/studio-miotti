import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import { Sparkles, MessageCircle, Calendar, Phone } from 'lucide-react';

export const metadata = pageMeta({
  title: 'Prenota un Primo Confronto · 15 minuti gratuiti',
  description:
    "Prenoti online il primo incontro con l'Avv. Miotti. 15 minuti gratuiti, in studio o al telefono.",
  path: '/prenota/',
});

const channels = [
  {
    icon: <Sparkles size={24} className="text-gold" />,
    title: 'Parla con Lex',
    duration: 'Disponibile 24/7',
    body: "Il nostro assistente digitale risponde a domande generali, qualifica il caso e propone slot per la consulenza.",
    cta: 'Avvia chat',
    style: 'feature',
    href: '#open-lex',
  },
  {
    icon: <Calendar size={20} />,
    title: 'Calendario online',
    duration: 'Slot in tempo reale',
    body: "Sceglie data e ora compatibili con la disponibilità dello studio. Conferma immediata via email.",
    cta: 'Apri calendario',
    href: '{{TODO_CALENDLY_URL}}',
  },
  {
    icon: <Phone size={20} />,
    title: 'Telefono',
    duration: 'Lun-Ven 9-13 / 15-19',
    body: 'Chiamata diretta con la segreteria dello studio. Risposta in giornata.',
    cta: '045 95 86 116',
    href: 'tel:+390459586116',
  },
  {
    icon: <MessageCircle size={20} />,
    title: 'Modulo scritto',
    duration: 'Risposta entro 24h',
    body: 'Compili il form contatti con i dettagli. Le rispondiamo in giornata lavorativa.',
    cta: 'Compila il modulo',
    href: '/contatti',
  },
];

export default function PrenotaPage() {
  return (
    <>
      <section className="bg-paper pt-32 md:pt-40 pb-12">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
            <div className="col-span-12 md:col-span-2">
              <span className="font-display text-cobalt text-7xl md:text-8xl leading-none">§</span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite mt-4">
                Cap. 06<br />Prenota
              </p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <span className="eyebrow mb-6">Primo confronto · 15 min</span>
              <h1 className="font-display text-balance" style={{ fontSize: 'var(--fs-display-l)', lineHeight: 1 }}>
                Quattro modi per <span className="italic text-cobalt">iniziare.</span>
              </h1>
              <p className="mt-8 text-graphite text-lg leading-relaxed max-w-2xl">
                Tutti portano allo stesso risultato: una conversazione di 15 minuti, gratuita
                e senza impegno, per capire se posso essere utile alla Sua questione.
                Scelga quello che preferisce.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-warm py-20 md:py-28">
        <div className="container-page">
          <ul className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
            {channels.map((c, i) => (
              <li
                key={c.title}
                className={`col-span-12 ${
                  c.style === 'feature' ? 'lg:col-span-6 lg:row-span-2' : 'lg:col-span-6'
                }`}
              >
                <Link
                  href={c.href as never}
                  className={`group block h-full p-8 md:p-10 transition-all duration-500 hover:shadow-[0_8px_24px_rgba(15,34,64,0.08)] ${
                    c.style === 'feature'
                      ? 'bg-cobalt-deep text-paper border border-cobalt-deep'
                      : 'bg-paper border border-rule hover:border-cobalt/60'
                  }`}
                >
                  <div className={`flex items-start justify-between mb-8 ${c.style === 'feature' ? '' : ''}`}>
                    <span
                      className={`flex h-12 w-12 items-center justify-center ${
                        c.style === 'feature' ? 'bg-paper/10' : 'bg-cobalt/10 text-cobalt'
                      }`}
                    >
                      {c.icon}
                    </span>
                    <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                      c.style === 'feature' ? 'text-paper/60' : 'text-graphite'
                    }`}>
                      {c.duration}
                    </span>
                  </div>

                  <h2 className={`font-display ${c.style === 'feature' ? 'text-4xl md:text-5xl' : 'text-2xl'} mb-4`}>
                    {c.title}
                  </h2>
                  <p className={`leading-relaxed mb-8 ${c.style === 'feature' ? 'text-paper/70 text-lg' : 'text-graphite text-sm'}`}>
                    {c.body}
                  </p>

                  <span
                    className={`inline-flex items-center gap-2 text-sm font-medium ${
                      c.style === 'feature' ? 'text-gold' : 'text-cobalt'
                    }`}
                  >
                    {c.cta} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
