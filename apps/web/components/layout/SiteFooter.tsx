/**
 * SiteFooter — chiusura editoriale, sobria, stratificata.
 *
 * Quattro colonne (Studio · Aree · Risorse · Contatti) + bottom row
 * con dati legali e credits.
 */

import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';
import { SITE_DATA, PRACTICE_AREAS } from '@/lib/site-data';

const STUDIO_LINKS = [
  { label: 'Lo Studio', href: '/studio' },
  { label: 'Metodo', href: '/#metodo' },
  { label: 'Innovazione', href: '/#innovazione' },
  { label: 'Risorse e guide', href: '/guide' },
];

const FOOTER_AREAS = PRACTICE_AREAS.slice(0, 6);

const LEGAL_LINKS = [
  { label: 'Privacy policy', href: '/privacy-policy' },
  { label: 'Cookie policy', href: '/cookie-policy' },
  { label: 'Termini di servizio', href: '/termini-di-servizio' },
  { label: 'Accessibilità', href: '/accessibilita' },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden bg-paper-warm"
      style={{ borderTop: '1px solid rgb(var(--color-rule) / 0.12)' }}
    >
      <div className="container-page py-20 md:py-24">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12">
          {/* Identità studio */}
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden
                className="font-display italic text-cobalt"
                style={{ fontSize: '1.5rem', lineHeight: 1 }}
              >
                §
              </span>
              <span className="leading-none">
                <span className="block font-display text-ink" style={{ fontSize: '1.05rem' }}>
                  Studio Legale <em className="not-italic text-cobalt">Miotti</em>
                </span>
                <span className="mt-0.5 block font-mono text-[10px] tracking-[0.22em] uppercase text-graphite">
                  San Bonifacio · VR
                </span>
              </span>
            </div>

            <p className="mt-6 max-w-sm text-[0.9375rem] leading-[1.55] text-graphite">
              Diritto come dialogo, non come distanza. Consulenza per imprese e
              privati nella Bassa Veronese e in tutta la provincia di Verona.
            </p>

            <ul className="mt-7 space-y-3 text-sm">
              <li className="flex items-start gap-2 text-ink-soft">
                <MapPin size={14} className="mt-0.5 shrink-0 text-graphite" />
                <span>
                  {SITE_DATA.address.street}
                  <br />
                  {SITE_DATA.address.cap} {SITE_DATA.address.city} ({SITE_DATA.address.province})
                </span>
              </li>
              <li className="flex items-center gap-2 text-ink-soft">
                <Phone size={14} className="text-graphite" />
                <a href={`tel:${SITE_DATA.phoneTel}`} className="link-inline">
                  {SITE_DATA.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* Studio links */}
          <div className="col-span-6 md:col-span-2">
            <FooterColumn title="Studio" items={STUDIO_LINKS} />
          </div>

          {/* Aree */}
          <div className="col-span-6 md:col-span-3">
            <FooterColumn
              title="Aree"
              items={FOOTER_AREAS.map((a) => ({
                label: a.title,
                href: `/aree-di-competenza/${a.slug}`,
              }))}
            />
          </div>

          {/* Contatti */}
          <div className="col-span-12 md:col-span-3">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
              Contatti
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-ink-soft">
              <li>
                <Link href="/contatti" className="link-inline">
                  Modulo richiesta
                </Link>
              </li>
              <li>
                <Link href="/prenota" className="link-inline">
                  Prenota un appuntamento
                </Link>
              </li>
              <li>{SITE_DATA.hours.long}</li>
            </ul>
          </div>
        </div>

        {/* Brand statement gigante */}
        <div className="mt-20 hidden md:block">
          <p
            aria-hidden
            className="text-stroke font-display"
            style={{
              fontSize: 'clamp(4rem, 12vw, 11rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              textWrap: 'balance',
            }}
          >
            Miotti — Studio Legale.
          </p>
        </div>

        {/* Bottom row */}
        <div
          className="mt-12 grid grid-cols-1 gap-6 border-t pt-8 md:grid-cols-2"
          style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
        >
          <div className="flex flex-col gap-2 text-xs text-graphite">
            <span>
              © {year} {SITE_DATA.legalName} · C.F. {SITE_DATA.cf}
            </span>
            <span>
              {SITE_DATA.brandName} · {SITE_DATA.address.city} ({SITE_DATA.address.province})
            </span>
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-graphite md:justify-end">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-cobalt">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              · Sito di{' '}
              <a
                href="https://adrianvee.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cobalt"
              >
                Adrian Vee
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
        {title}
      </h4>
      <ul className="mt-5 space-y-3 text-sm">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="text-ink-soft transition-colors hover:text-cobalt"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
