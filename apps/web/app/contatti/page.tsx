import { pageMeta } from '@/lib/seo';
import { ContactForm } from '@/components/forms/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SITE_DATA } from '@/lib/site-data';

export const metadata = pageMeta({
  title: 'Contatti · Studio Legale Miotti · San Bonifacio',
  description:
    "Studio in Via S. Giovanni Bosco 29/E, San Bonifacio (VR). Tel. 045 95 86 116. Apertura Lun-Ven 9-13/15-19.",
  path: '/contatti/',
});

export default function ContattiPage() {
  return (
    <>
      <section className="bg-paper pt-32 md:pt-40 pb-12">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
            <div className="col-span-12 md:col-span-2">
              <span className="font-display text-cobalt text-7xl md:text-8xl leading-none">§</span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-graphite mt-4">
                Cap. 05<br />Contatti
              </p>
            </div>
            <div className="col-span-12 md:col-span-10">
              <span className="eyebrow mb-6">Come trovarci</span>
              <h1 className="font-display text-balance" style={{ fontSize: 'var(--fs-display-l)', lineHeight: 1 }}>
                Ci scriva. <span className="italic text-cobalt">Le rispondiamo.</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-20 md:pb-28">
        <div className="container-page">
          <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12">
            {/* Form */}
            <div className="col-span-12 lg:col-span-7">
              <ContactForm />
            </div>

            {/* Info pratiche */}
            <aside className="col-span-12 lg:col-span-5 lg:pl-8 lg:border-l border-rule space-y-8">
              <div>
                <h2 className="text-xs uppercase tracking-[0.18em] text-graphite mb-4">Dove siamo</h2>
                <div className="flex gap-3">
                  <MapPin size={18} className="text-cobalt mt-1 shrink-0" />
                  <p className="text-ink leading-relaxed">
                    Via S. Giovanni Bosco, 29/E<br />
                    37047 San Bonifacio (VR)<br />
                    <a
                      href="https://www.google.com/maps?q=Via+San+Giovanni+Bosco+29+San+Bonifacio+VR"
                      target="_blank"
                      rel="noopener"
                      className="link-inline text-sm mt-2 inline-block"
                    >
                      Apri in Google Maps →
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xs uppercase tracking-[0.18em] text-graphite mb-4">Telefono</h2>
                <a href="tel:+390459586116" className="flex gap-3 hover:text-cobalt transition-colors">
                  <Phone size={18} className="text-cobalt mt-0.5 shrink-0" />
                  <span className="text-lg">045 95 86 116</span>
                </a>
                <p className="text-graphite text-sm mt-2 ml-9">
                  Risposta in segreteria oltre orario di studio
                </p>
              </div>

              {(SITE_DATA.email || SITE_DATA.pec) && (
                <div>
                  <h2 className="text-xs uppercase tracking-[0.18em] text-graphite mb-4">Email & PEC</h2>
                  {SITE_DATA.email && (
                    <a href={`mailto:${SITE_DATA.email}`} className="flex gap-3 mb-2 hover:text-cobalt transition-colors">
                      <Mail size={18} className="text-cobalt mt-0.5 shrink-0" />
                      <span>{SITE_DATA.email}</span>
                    </a>
                  )}
                  {SITE_DATA.pec && (
                    <a href={`mailto:${SITE_DATA.pec}`} className="flex gap-3 hover:text-cobalt transition-colors text-sm text-graphite">
                      <span className="ml-9 font-mono">PEC: {SITE_DATA.pec}</span>
                    </a>
                  )}
                </div>
              )}

              <div>
                <h2 className="text-xs uppercase tracking-[0.18em] text-graphite mb-4">Orari</h2>
                <div className="flex gap-3">
                  <Clock size={18} className="text-cobalt mt-0.5 shrink-0" />
                  <div>
                    <p className="text-ink">Lunedì – Venerdì</p>
                    <p className="text-graphite text-sm">9:00–13:00 · 15:00–19:00</p>
                    <p className="text-graphite text-sm mt-3">
                      Su appuntamento anche fuori orario
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative h-[400px] md:h-[500px] bg-paper-warm">
        <iframe
          title="Mappa studio Miotti"
          src="https://www.openstreetmap.org/export/embed.html?bbox=11.270%2C45.388%2C11.280%2C45.395&layer=mapnik&marker=45.3919%2C11.2747"
          className="absolute inset-0 h-full w-full grayscale"
          loading="lazy"
        />
      </section>
    </>
  );
}
