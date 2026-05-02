'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, Scale, Shield, Mail, Lock } from 'lucide-react';
import { SITE_DATA } from '@/lib/site-data';

/**
 * SITE FOOTER · v2026
 *
 * Innovazioni:
 *  · Typewall finale: "MIOTTI" in display gigante, 60vw, stroke-only paper.
 *    Decorativo, evocativo, mai cliccabile (aria-hidden).
 *  · Status live: pill "Studio aperto / Studio chiuso" con dot pulsante,
 *    calcolato in client (rispetta orari Lun-Ven 9-13 / 15-19).
 *  · Trust row: 4 badge editoriali con icona stroke (Foro, GDPR, PEC, Albo).
 *  · Newsletter inline single-field (placeholder). Hairline gold separa.
 *  · Mappa OSM in scala di grigio profondo.
 *  · Hairline cobalt-oro nel border-top — segno editoriale.
 */
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

  /* Live status */
  const [openStatus, setOpenStatus] = useState<'open' | 'closed'>('open');
  useEffect(() => {
    function compute() {
      const now = new Date();
      const day = now.getDay();
      const minutes = now.getHours() * 60 + now.getMinutes();
      const isWeekday = day >= 1 && day <= 5;
      const morningOpen = minutes >= 9 * 60 && minutes < 13 * 60;
      const afternoonOpen = minutes >= 15 * 60 && minutes < 19 * 60;
      setOpenStatus(isWeekday && (morningOpen || afternoonOpen) ? 'open' : 'closed');
    }
    compute();
    const id = window.setInterval(compute, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer
      className="relative bg-paper pt-16 md:pt-24 overflow-hidden"
      role="contentinfo"
    >
      {/* Hairline cobalt-oro top */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgb(var(--color-cobalt)/0.5) 35%, rgb(var(--color-gold)/0.6) 65%, transparent 100%)',
        }}
      />

      <div className="container-page relative">
        {/* ─── BIG CTA BLOCK — sopra il footer denso ──────────────── */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8 pb-16 md:pb-20 border-b border-rule">
          <div className="col-span-12 md:col-span-7">
            <span className="eyebrow-live mb-5" data-status={openStatus}>
              {openStatus === 'open' ? 'Studio aperto · Risposta entro la giornata' : 'Studio chiuso · Risposta entro 24 h lavorative'}
            </span>
            <p
              className="font-display text-balance text-ink mt-3"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.015em',
              }}
            >
              Una telefonata.{' '}
              <span className="italic text-cobalt">Quindici minuti.</span>
              <br />
              Nessun costo, nessun impegno.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 flex md:items-end md:justify-end gap-4">
            <Link href="/prenota" className="btn-primary group">
              Prenota un primo confronto
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* ─── TRUST BADGES ROW ───────────────────────────────────── */}
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule/30 border-y border-rule/30 mt-10 md:mt-14 mb-12">
          <TrustBadge
            icon={<Scale size={18} strokeWidth={1.4} />}
            label="Foro di Verona"
            sub="Iscritto albo dal 2003"
          />
          <TrustBadge
            icon={<Shield size={18} strokeWidth={1.4} />}
            label="Conformità GDPR"
            sub="Riservatezza professionale"
          />
          <TrustBadge
            icon={<Mail size={18} strokeWidth={1.4} />}
            label="PEC professionale"
            sub="Comunicazione legale certificata"
          />
          <TrustBadge
            icon={<Lock size={18} strokeWidth={1.4} />}
            label="Conversazioni cifrate"
            sub="HTTPS / TLS sui canali digitali"
          />
        </ul>

        {/* ─── PRIMA RIGA — 12 col dense ──────────────────────────── */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12 pb-12">
          {/* Identità studio · col 1-3 */}
          <div className="col-span-12 md:col-span-3">
            <p className="font-display text-[28px] tracking-[0.18em] text-ink leading-none">
              MIOTTI
            </p>
            <p className="mt-3 text-[13px] text-ink leading-snug">
              Studio Legale · Avv. Massimiliano Miotti
            </p>
            <p className="mt-4 text-[13px] text-graphite italic">
              Diritto come dialogo, non come distanza.
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
            <div className="relative border border-rule overflow-hidden">
              <iframe
                title={`Mappa Studio Miotti — ${address.street}`}
                src={osmEmbed}
                loading="lazy"
                className="block w-full grayscale-[0.9]"
                style={{ height: '160px' }}
              />
              {/* Pin overlay decorativo */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center gap-0.5"
              >
                <span className="block w-3 h-3 bg-cobalt rotate-45 -mb-2" />
                <span className="block w-2 h-2 rounded-full bg-paper border border-cobalt" />
              </span>
            </div>
            <dl className="mt-4 flex items-baseline gap-2 whitespace-nowrap">
              <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite">
                Orari
              </dt>
              <span className="text-graphite/60" aria-hidden>—</span>
              <dd className="text-[12px] text-ink leading-snug">
                {hours.short}
              </dd>
            </dl>
          </div>
        </div>

        {/* ─── TYPEWALL — MIOTTI gigante decorativo ───────────────── */}
        <div
          aria-hidden
          className="relative -mx-[var(--gutter)] mt-4 mb-0 select-none pointer-events-none"
        >
          <p
            className="font-display text-stroke leading-none whitespace-nowrap text-center"
            style={{
              fontSize: 'clamp(6rem, 22vw, 22rem)',
              letterSpacing: '0.02em',
              fontWeight: 300,
            }}
          >
            MIOTTI
          </p>
        </div>

        {/* ─── SECONDA RIGA — legal info + privacy links ──────────── */}
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

        {/* ─── TERZA RIGA — credit ────────────────────────────────── */}
        <div className="mt-6 pb-8 pt-6 border-t border-rule flex flex-wrap items-center justify-between gap-y-2 font-mono text-[10px] tracking-[0.06em] text-graphite">
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

function TrustBadge({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <li className="bg-paper p-5 md:p-6 flex items-start gap-3">
      <span className="text-cobalt mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
          {label}
        </p>
        <p className="text-[12px] text-graphite leading-snug mt-1">{sub}</p>
      </div>
    </li>
  );
}
