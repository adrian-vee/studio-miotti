/**
 * SiteFooter — chiusura premium, profondità visiva, niente grigio morto.
 *
 * Top: blocco scuro (blu notte) con identità + colonne ordinate.
 * Bottom: bottom bar chiara con legali e credits.
 * Wordmark "Miotti" gigante come texture in basso, colore controllato.
 */

import Link from 'next/link';
import { Phone, MapPin, Clock4 } from 'lucide-react';
import { SITE_DATA, PRACTICE_AREAS } from '@/lib/site-data';

const STUDIO_LINKS = [
  { label: 'Lo Studio', href: '/studio' },
  { label: 'Metodo', href: '/#metodo' },
  { label: 'Studio digitale', href: '/#innovazione' },
  { label: 'Risorse e guide', href: '/guide' },
  { label: 'Tariffe', href: '/tariffe' },
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
    <footer className="relative overflow-hidden bg-cobalt-deep text-paper">
      {/* Mesh aurora alto */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgb(198 168 107 / 0.10) 0%, transparent 60%)',
        }}
      />

      <div className="container-page relative pt-16 pb-10 md:pt-20">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12">
          {/* Identità studio */}
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden
                className="font-display italic"
                style={{ fontSize: '1.5rem', lineHeight: 1, color: 'rgb(var(--color-gold))' }}
              >
                §
              </span>
              <span className="leading-none">
                <span className="block font-display" style={{ fontSize: '1.1rem', color: 'rgb(var(--color-paper))' }}>
                  Studio Legale{' '}
                  <em className="not-italic" style={{ color: 'rgb(var(--color-gold))' }}>
                    Miotti
                  </em>
                </span>
                <span
                  className="mt-0.5 block font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: 'rgb(var(--color-paper) / 0.55)' }}
                >
                  San Bonifacio · VR
                </span>
              </span>
            </div>

            <p
              className="mt-6 max-w-sm text-[0.9375rem]"
              style={{ color: 'rgb(var(--color-paper) / 0.7)', lineHeight: 1.6 }}
            >
              Soluzioni legali concrete per imprese e privati. Risposta in
              24–48 ore lavorative, costi indicati prima del mandato,
              gestione digitale delle pratiche.
            </p>

            <ul className="mt-7 space-y-3 text-sm">
              <li className="flex items-start gap-2.5" style={{ color: 'rgb(var(--color-paper) / 0.85)' }}>
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: 'rgb(var(--color-gold))' }} />
                <span>
                  {SITE_DATA.address.street}
                  <br />
                  {SITE_DATA.address.cap} {SITE_DATA.address.city} ({SITE_DATA.address.province})
                </span>
              </li>
              <li className="flex items-center gap-2.5" style={{ color: 'rgb(var(--color-paper) / 0.85)' }}>
                <Phone size={14} style={{ color: 'rgb(var(--color-gold))' }} />
                <a
                  href={`tel:${SITE_DATA.phoneTel}`}
                  className="transition-colors hover:text-[rgb(var(--color-gold))]"
                >
                  {SITE_DATA.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5" style={{ color: 'rgb(var(--color-paper) / 0.85)' }}>
                <Clock4 size={14} style={{ color: 'rgb(var(--color-gold))' }} />
                <span>{SITE_DATA.hours.short}</span>
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
            <h4
              className="font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: 'rgb(var(--color-gold))' }}
            >
              Contatti
            </h4>
            <ul className="mt-5 space-y-3 text-sm" style={{ color: 'rgb(var(--color-paper) / 0.85)' }}>
              <li>
                <Link
                  href="/contatti"
                  className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-[rgb(var(--color-gold))] hover:underline"
                >
                  Modulo richiesta →
                </Link>
              </li>
              <li>
                <Link
                  href="/prenota"
                  className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-[rgb(var(--color-gold))] hover:underline"
                >
                  Prenota appuntamento →
                </Link>
              </li>
              <li className="text-[0.875rem]" style={{ color: 'rgb(var(--color-paper) / 0.55)' }}>
                Risposta media: 24–48 h lavorative
              </li>
            </ul>
          </div>
        </div>

        {/* Wordmark elegante (non dominante) */}
        <div
          className="mt-12 flex items-baseline justify-between gap-6 border-t pt-6"
          style={{ borderColor: 'rgb(244 242 238 / 0.10)' }}
        >
          <p
            aria-hidden
            className="font-display"
            style={{
              fontSize: 'clamp(1.25rem, 2.4vw, 2rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              fontStyle: 'italic',
              fontWeight: 500,
              color: 'rgb(var(--color-paper) / 0.85)',
            }}
          >
            Miotti — <span style={{ color: 'rgb(var(--color-gold))' }}>Studio Legale.</span>
          </p>
          <span
            className="hidden font-mono text-[10px] uppercase tracking-[0.28em] md:inline"
            style={{ color: 'rgb(var(--color-paper) / 0.45)' }}
          >
            San Bonifacio · Verona · MMXXVI
          </span>
        </div>

        {/* Bottom row */}
        <div
          className="mt-6 grid grid-cols-1 gap-4 border-t pt-5 md:grid-cols-2"
          style={{ borderColor: 'rgb(244 242 238 / 0.10)' }}
        >
          <div className="flex flex-col gap-2 text-xs" style={{ color: 'rgb(var(--color-paper) / 0.55)' }}>
            <span>
              © {year} {SITE_DATA.legalName} · C.F. {SITE_DATA.cf}
            </span>
            <span>
              {SITE_DATA.brandName} · {SITE_DATA.address.city} ({SITE_DATA.address.province})
            </span>
          </div>

          <ul
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:justify-end"
            style={{ color: 'rgb(var(--color-paper) / 0.55)' }}
          >
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-[rgb(var(--color-gold))]"
                >
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
                className="transition-colors hover:text-[rgb(var(--color-gold))]"
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
      <h4
        className="font-mono text-[10px] uppercase tracking-[0.28em]"
        style={{ color: 'rgb(var(--color-gold))' }}
      >
        {title}
      </h4>
      <ul className="mt-5 space-y-3 text-sm">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="group relative inline-flex items-center transition-colors"
              style={{ color: 'rgb(var(--color-paper) / 0.85)' }}
            >
              <span className="relative">
                {it.label}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                  style={{ background: 'rgb(var(--color-gold))' }}
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
