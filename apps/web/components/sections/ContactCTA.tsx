'use client';

/**
 * ContactCTA — chiusura editoriale.
 *
 * Sfondo cobalt-deep con mesh aurora deep e grain. Composizione asimmetrica:
 *  · Headline (col 7) + sottotesto + due CTA primarie.
 *  · Right column: contatti diretti (telefono, sede, orari).
 *
 * Animazioni: reveal (useGsapReveal) + magnetic CTA primaria.
 */

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Phone, Clock4, Sparkles } from 'lucide-react';
import { useGsapReveal } from '@/hooks/useGsapReveal';
import { magnetic } from '@/lib/animations';
import { openLex } from '@/lib/lex';
import { SITE_DATA } from '@/lib/site-data';

export function ContactCTA() {
  const ref = useGsapReveal<HTMLElement>({ y: 28, stagger: 0.06 });
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;
    return magnetic(ctaRef.current, 16);
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-aurora-deep text-vellum py-24 md:py-32"
      aria-labelledby="contact-cta-title"
    >
      <div aria-hidden className="grain absolute inset-0" />

      {/* Linee verticali sottili */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-[14%] hidden w-px md:block"
        style={{ background: 'rgb(var(--color-vellum) / 0.06)' }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-[10%] hidden w-px md:block"
        style={{ background: 'rgb(var(--color-vellum) / 0.04)' }}
      />

      <div className="container-page relative">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12">
          {/* Sinistra */}
          <div className="col-span-12 md:col-span-7">
            <span
              data-reveal
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: 'rgb(var(--color-vellum) / 0.7)' }}
            >
              <span className="h-px w-7" style={{ background: 'rgb(var(--color-gold))' }} />
              07 · Contatti
            </span>
            <h2
              id="contact-cta-title"
              data-reveal
              className="mt-6 font-display"
              style={{
                fontSize: 'var(--fs-display-xl)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
              }}
            >
              Inquadriamo insieme la tua situazione.
            </h2>
            <p
              data-reveal
              className="mt-8 max-w-xl text-lg"
              style={{ color: 'rgb(var(--color-vellum) / 0.78)', lineHeight: 1.55 }}
            >
              Descrivici il caso in poche frasi. Ti rispondiamo entro 24–48
              ore lavorative con i passi successivi e una stima dei costi,
              prima di qualsiasi mandato.
            </p>

            <div data-reveal className="mt-10 flex flex-wrap items-center gap-3">
              <button
                ref={ctaRef}
                type="button"
                onClick={() =>
                  openLex(
                    'cta-contact',
                    'Raccontami in poche righe il caso: cosa è successo, cosa ti aspetti, e i tempi che hai. Lo passo allo studio già strutturato.',
                  )
                }
                className="btn-primary"
                style={{
                  background: 'rgb(var(--color-gold))',
                  borderColor: 'rgb(var(--color-gold))',
                  color: 'rgb(var(--color-cobalt-deep))',
                }}
              >
                Contatta lo studio
                <ArrowRight size={16} />
              </button>
              <Link href="/contatti" className="btn-ghost">
                Modulo classico
              </Link>
            </div>

            {/* Hint LEX discreto */}
            <button
              type="button"
              data-reveal
              onClick={() =>
                openLex(
                  'cta-soft-hint',
                  'Posso aiutarti a inquadrare la richiesta: facciamo qualche domanda guidata e poi la passiamo allo studio?',
                )
              }
              className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] underline-offset-4 transition-opacity hover:underline"
              style={{ color: 'rgb(var(--color-vellum) / 0.65)' }}
            >
              <Sparkles size={13} strokeWidth={1.6} />
              Preferisci iniziare online? Usa l’assistente
            </button>
          </div>

          {/* Destra: contatti diretti */}
          <aside
            data-reveal
            className="col-span-12 md:col-span-4 md:col-start-9"
            aria-label="Contatti diretti"
          >
            <ul
              className="divide-y"
              style={{ borderColor: 'rgb(var(--color-vellum) / 0.12)' }}
            >
              <ContactRow
                icon={<Phone size={14} />}
                label="Telefono"
                value={SITE_DATA.phoneDisplay}
                href={`tel:${SITE_DATA.phoneTel}`}
              />
              <ContactRow
                icon={<MapPin size={14} />}
                label="Sede"
                value={`${SITE_DATA.address.street}, ${SITE_DATA.address.cap} ${SITE_DATA.address.city} (${SITE_DATA.address.province})`}
              />
              <ContactRow
                icon={<Clock4 size={14} />}
                label="Orari"
                value={SITE_DATA.hours.long}
              />
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex flex-col gap-1.5 py-5">
      <span
        className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ color: 'rgb(var(--color-vellum) / 0.55)' }}
      >
        {icon}
        {label}
      </span>
      <span
        className="font-display"
        style={{
          fontSize: '1.125rem',
          lineHeight: 1.35,
          color: 'rgb(var(--color-vellum))',
        }}
      >
        {value}
      </span>
    </div>
  );

  return (
    <li
      className="border-t first:border-t-0"
      style={{ borderColor: 'rgb(var(--color-vellum) / 0.12)' }}
    >
      {href ? (
        <a
          href={href}
          className="block transition-colors duration-300 hover:opacity-80"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}
