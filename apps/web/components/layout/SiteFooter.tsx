import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SITE_DATA } from '@/lib/site-data';

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { address, hours, email, pec, piva, cf, barNumber, barYear } = SITE_DATA;

  return (
    <footer className="bg-paper border-t border-rule pb-24 md:pb-28" role="contentinfo">
      <div className="container-page py-20 md:py-24">
        {/* Big logotype + tagline */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12 pb-16 border-b border-rule">
          <div className="col-span-12 md:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite mb-4">
              Studio Legale
            </p>
            <p className="font-display text-[clamp(3rem,8vw,5rem)] leading-none tracking-[0.06em]">
              MIOTTI
            </p>
            <p className="mt-6 italic text-cobalt text-lg">
              {SITE_DATA.tagline}
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <h2 className="text-xs uppercase tracking-[0.18em] text-graphite mb-6">
              Studio
            </h2>
            <ul className="space-y-4 text-sm">
              <FooterLink href="/studio">Chi siamo</FooterLink>
              <FooterLink href="/aree-di-competenza">Aree di competenza</FooterLink>
              <FooterLink href="/tariffe">Trasparenza onorari</FooterLink>
              <FooterLink href="/domande-frequenti">Domande frequenti</FooterLink>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <h2 className="text-xs uppercase tracking-[0.18em] text-graphite mb-6">
              Risorse
            </h2>
            <ul className="space-y-4 text-sm">
              <FooterLink href="/guide">Guide gratuite</FooterLink>
              <FooterLink href="/risorse-gratuite">PDF scaricabili</FooterLink>
              <FooterLink href="/newsletter">Newsletter</FooterLink>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-2">
            <h2 className="text-xs uppercase tracking-[0.18em] text-graphite mb-6">
              Contatto
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-2">
                <MapPin size={14} className="text-cobalt mt-0.5 shrink-0" />
                <span>
                  {address.street}
                  <br />
                  {address.cap} {address.city} ({address.province})
                </span>
              </li>
              <li>
                <a
                  href={`tel:${SITE_DATA.phoneTel}`}
                  className="flex gap-2 hover:text-cobalt transition-colors"
                >
                  <Phone size={14} className="text-cobalt mt-0.5 shrink-0" />
                  {SITE_DATA.phoneDisplay}
                </a>
              </li>
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex gap-2 hover:text-cobalt transition-colors"
                  >
                    <Mail size={14} className="text-cobalt mt-0.5 shrink-0" />
                    {email}
                  </a>
                </li>
              )}
              <li className="flex gap-2">
                <Clock size={14} className="text-cobalt mt-0.5 shrink-0" />
                <span>{hours.short}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal info row */}
        <div className="pt-12 grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
          <div className="col-span-12 md:col-span-7 space-y-2 text-xs text-graphite leading-relaxed">
            <p>
              <strong className="text-ink">{SITE_DATA.legalName}</strong>
              {' · '}Iscritto all'Ordine degli Avvocati di Verona
              {barYear ? ` dal ${barYear}` : ''}
              {barNumber ? ` · N. ${barNumber}` : ''}
            </p>
            <p>
              Foro di Verona
              {piva ? ` · P. IVA ${piva}` : ''}
              {' · '}CF {cf}
            </p>
            {pec && (
              <p>
                PEC: <a href={`mailto:${pec}`} className="link-inline">{pec}</a>
              </p>
            )}
            <p className="pt-2">
              Onorari concordati nel rispetto del DM 55/2014 e successive modificazioni.
              I contenuti del sito non costituiscono parere legale.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5 md:text-right">
            <ul className="flex flex-wrap md:justify-end gap-x-6 gap-y-2 text-xs">
              <li><Link href="/privacy-policy" className="hover:text-cobalt transition-colors">Privacy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-cobalt transition-colors">Cookie</Link></li>
              <li><Link href="/termini-di-servizio" className="hover:text-cobalt transition-colors">Termini</Link></li>
              <li><Link href="/accessibilita" className="hover:text-cobalt transition-colors">Accessibilità</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-cobalt transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom credit */}
        <div className="mt-12 pt-8 border-t border-rule flex flex-wrap items-center justify-between gap-4 text-xs text-graphite">
          <p>© {year} {SITE_DATA.legalName} · Tutti i diritti riservati</p>
          <p>
            Sito sviluppato da{' '}
            <a
              href="https://adrianvee.dev"
              target="_blank"
              rel="noopener"
              className="link-inline"
            >
              Adrian Vee
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href as never}
        className="hover:text-cobalt transition-colors duration-200"
      >
        {children}
      </Link>
    </li>
  );
}
