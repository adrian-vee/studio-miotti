'use client';

/**
 * Testimonianze — placeholder anonimizzati ("M.R., Verona").
 * Da sostituire con recensioni reali raccolte secondo deontologia forense:
 * il CNF consente la pubblicazione di recensioni vere e verificabili.
 */

const testimonials = [
  {
    quote: 'Trasparente fin dal primo incontro. Ci ha detto cosa era praticabile e cosa no, senza vendere illusioni.',
    who: 'M.R.',
    where: 'Soave',
    matter: 'Recupero crediti aziendale',
  },
  {
    quote: 'Una separazione gestita con un\'umanità che non mi aspettavo da un avvocato. Tempi rispettati al giorno.',
    who: 'L.B.',
    where: 'San Bonifacio',
    matter: 'Diritto di famiglia',
  },
  {
    quote: 'Avevo già parlato con tre studi prima di lui. Solo l\'Avv. Miotti mi ha spiegato la mia stessa pratica in modo da capire.',
    who: 'F.G.',
    where: 'Verona',
    matter: 'Contenzioso lavoro',
  },
  {
    quote: 'Onorari concordati per iscritto, nessuna sorpresa a fine anno. Per un\'azienda piccola come la nostra è oro.',
    who: 'A.P.',
    where: 'Monteforte d\'Alpone',
    matter: 'Consulenza continuativa',
  },
  {
    quote: 'Risposta entro la giornata, sempre. Anche solo per dirmi "lo guardo domani". Per un cliente è molto.',
    who: 'C.M.',
    where: 'Cologna Veneta',
    matter: 'Successioni',
  },
];

export function TestimonialsMarquee() {
  // Duplico l'array per loop infinito senza salto visibile
  const loop = [...testimonials, ...testimonials];

  return (
    <section
      className="bg-paper py-24 md:py-32 overflow-hidden"
      aria-labelledby="testimonianze-heading"
    >
      <div className="container-page mb-16">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow">§ 06 · Voci</span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2
              id="testimonianze-heading"
              className="font-display text-balance"
              style={{ fontSize: 'var(--fs-display-m)', lineHeight: 1.05 }}
            >
              Cosa raccontano
              <br />
              <span className="italic text-cobalt">le persone assistite.</span>
            </h2>
            <p className="mt-6 text-graphite text-sm leading-relaxed max-w-xl">
              Iniziali e località nel rispetto della riservatezza professionale.
              Le testimonianze integrali sono disponibili in studio su richiesta.
            </p>
          </div>
        </div>
      </div>

      {/* Marquee CSS-only — niente librerie */}
      <div
        className="relative"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
        }}
      >
        <ul
          className="flex gap-6 animate-[marquee_40s_linear_infinite] motion-reduce:animate-none"
          style={{ width: 'max-content' }}
        >
          {loop.map((t, i) => (
            <li
              key={i}
              className="w-[clamp(280px,80vw,420px)] shrink-0 bg-paper-warm p-8 border border-rule"
            >
              <span className="font-display text-3xl text-cobalt leading-none block mb-4">
                "
              </span>
              <blockquote className="text-graphite leading-relaxed mb-6 italic">
                {t.quote}
              </blockquote>
              <footer className="flex items-baseline justify-between text-xs">
                <cite className="not-italic font-medium text-ink">
                  {t.who} · {t.where}
                </cite>
                <span className="font-mono uppercase tracking-wider text-graphite">
                  {t.matter}
                </span>
              </footer>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 12px)); }
        }
      `}</style>
    </section>
  );
}
