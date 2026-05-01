import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SITE_DATA } from '@/lib/site-data';

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { address, hours, email, pec, piva, cf, barNumber } = SITE_DATA;

  const mapsQuery = encodeURIComponent(
    `${address.street}, ${address.cap} ${address.city} ${address.province}`,
  );
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${
    SITE_DATA.geo.lng - 0.012
  },${SITE_DATA.geo.lat - 0.007},${SITE_DATA.geo.lng + 0.012},${
    SITE_DATA.geo.lat + 0.007
  }&layer=mapnik&marker=${SITE_DATA.geo.lat},${SITE_DATA.geo.lng}`;

  return (
    <footer
      className="bg-paper border-t border-ink/80 pt-20 pb-10"
      role="contentinfo"
    >
      <div className="container-page">
        {/* ─── PRIMA RIGA — 12 col dense ────────────────────────── */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12 pb-12">
          {/* Identità studio · col 1-3 */}
          <div className="col-span-12 md:col-span-3">
            <p className="font-display text-[28px] tracking-[0.18em] text-ink leading-none">
              MIOTTI
            </p>
            <p className="mt-3 text-[13px] text-ink leading-snug">
              Studio Legale · Avv. Massimiliano Miotti
            </p>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-graphite">
              Foro di Verona · Iscritto albo dal 2003
            </p>
          </div>

          {/* STUDIO · col 4-5 */}
          <nav className="col-span-6 md:col-span-2" aria-label="Studio">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite mb-5">
              Studio
            </h2>
            <ul className="space-y-3">
              <FooterLink href="/studio">Chi siamo</FooterLink>
              <FooterLink href="/aree-di-competenza">
                Aree di competenza
              </FooterLink>
              <FooterLink href="/tariffe">Metodo e onorari</FooterLink>
              <FooterLink href="/guide">Domande frequenti</FooterLink>
              <FooterPlaceholder>Lavora con noi</FooterPlaceholder>
            </ul>
          </nav>

          {/* RISORSE · col 6-7 */}
          <nav className="col-span-6 md:col-span-2" aria-label="Risorse">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite mb-5">
              Risorse
            </h2>
            <ul className="space-y-3">
              <FooterLink href="/guide">Guide gratuite</FooterLink>
              <FooterPlaceholder>PDF scaricabili</FooterPlaceholder>
              <FooterPlaceholder>Newsletter</FooterPlaceholder>
              <FooterPlaceholder>Glossario legale</FooterPlaceholder>
              <FooterPlaceholder>Articoli</FooterPlaceholder>
            </ul>
          </nav>

          {/* CONTATTI · col 8-9 */}
          <div className="col-span-12 md:col-span-2">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite mb-5">
              Contatti
            </h2>
            <a
              href={`tel:${SITE_DATA.phoneTel}`}
              className="block font-display text-[18px] text-ink hover:text-cobalt transition-colors leading-tight"
            >
              {SITE_DATA.phoneDisplay}
            </a>
            {email && (
              <a
                href={`mailto:${email}`}
                className="block mt-2 text-[13px] text-ink hover:text-cobalt transition-colors break-all"
              >
                {email}
              </a>
            )}
            {pec && (
              <p className="mt-2 text-[13px] text-graphite break-all">
                <span className="font-mono text-[10px] uppercase tracking-wider text-graphite mr-1">
                  PEC
                </span>
                <a
                  href={`mailto:${pec}`}
                  className="text-ink hover:text-cobalt transition-colors"
                >
                  {pec}
                </a>
              </p>
            )}
            <address className="not-italic mt-4 text-[13px] text-ink leading-relaxed">
              {address.street}
              <br />
              {address.cap} {address.city}
              <br />
              Provincia di {address.province === 'VR' ? 'Verona' : address.province}
            </address>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 mt-3 text-[13px] text-cobalt hover:text-cobalt-deep underline-offset-2 hover:underline"
            >
              Apri in Google Maps
              <ArrowUpRight size={12} />
            </a>
          </div>

          {/* MAPPA + mini-stats · col 10-12 */}
          <div className="col-span-12 md:col-span-3">
            <iframe
              title={`Mappa Studio Miotti — ${address.street}`}
              src={osmEmbed}
              loading="lazy"
              className="block w-full border border-rule grayscale-[0.9]"
              style={{ height: '140px' }}
            />
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite">
                  Orari
                </dt>
                <dd className="text-[13px] text-ink leading-snug mt-0.5">
                  {hours.short}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite">
                  Lingue
                </dt>
                <dd className="text-[13px] text-ink leading-snug mt-0.5">
                  IT · EN
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* ─── SECONDA RIGA — legal info + privacy links ───────── */}
        <div className="pt-8 grid grid-cols-12 gap-x-[var(--gutter)] gap-y-4 border-t border-rule">
          <p className="col-span-12 md:col-span-7 font-mono text-[10px] tracking-[0.06em] text-graphite leading-relaxed">
            P.IVA {piva ?? '—'}
            <span className="mx-2 text-rule">·</span>
            CF {cf}
            <span className="mx-2 text-rule">·</span>
            N. iscrizione albo {barNumber ?? '—'}
          </p>

          <ul className="col-span-12 md:col-span-5 flex flex-wrap md:justify-end gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em]">
            <li>
              <Link
                href="/privacy-policy"
                className="text-graphite hover:text-cobalt transition-colors"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/cookie-policy"
                className="text-graphite hover:text-cobalt transition-colors"
              >
                Cookie
              </Link>
            </li>
            <li>
              <Link
                href="/termini-di-servizio"
                className="text-graphite hover:text-cobalt transition-colors"
              >
                Termini
              </Link>
            </li>
            <li>
              <Link
                href="/accessibilita"
                className="text-graphite hover:text-cobalt transition-colors"
              >
                Accessibilità
              </Link>
            </li>
            <li>
              <Link
                href="/sitemap.xml"
                className="text-graphite hover:text-cobalt transition-colors"
              >
                Sitemap
              </Link>
            </li>
          </ul>
        </div>

        {/* ─── TERZA RIGA — credit ──────────────────────────────── */}
        <div className="mt-6 pt-6 border-t border-rule flex flex-wrap items-center justify-between gap-y-2 font-mono text-[10px] tracking-[0.06em] text-graphite">
          <p>
            © {year} {SITE_DATA.legalName} · Tutti i diritti riservati
          </p>
          <p>
            Sito sviluppato da{' '}
            <a
              href="https://adrianvee.dev"
              target="_blank"
              rel="noopener"
              className="text-graphite hover:text-cobalt transition-colors"
            >
              Adrian Vee
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href as never}
        className="text-[14px] text-ink hover:text-cobalt transition-colors duration-200"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterPlaceholder({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <span
        className="text-[14px] text-graphite/70 cursor-not-allowed select-none"
        aria-disabled
        title="In arrivo"
      >
        {children}
      </span>
    </li>
  );
}
