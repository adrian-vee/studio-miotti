'use client';

/**
 * FinalCTA — chiusura conversion-oriented.
 *
 * Layout split:
 *  · Sx (col 7): grande messaggio + CTA primaria + opzione LEX.
 *  · Dx (col 5): action panel — telefono, sede, orari, prenotazione,
 *    micro form non funzionale (placeholder per quando contatti backend
 *    sarà integrato — la submit punta a /contatti).
 */

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Phone, MapPin, Clock4, CalendarDays, Sparkles } from 'lucide-react';
import {
  ensureGsap,
  magnetic,
  prefersReducedMotion,
  splitToWords,
} from '@/lib/animations';
import { openLex } from '@/lib/lex';
import { SITE_DATA } from '@/lib/site-data';

export function FinalCTA() {
  const root = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;
    return magnetic(ctaRef.current, 22);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const headline = el.querySelector<HTMLElement>('[data-cta-headline]');
      if (headline) {
        const words = splitToWords(headline);
        if (reduced) gsap.set(words, { y: 0, opacity: 1 });
        else
          gsap.from(words, {
            y: '105%',
            opacity: 0,
            duration: 0.95,
            ease: 'power3.out',
            stagger: 0.04,
            scrollTrigger: { trigger: el, start: 'top 70%', once: true },
          });
      }

      gsap.from('[data-cta-meta]', {
        y: 18,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out',
        stagger: 0.08,
        delay: 0.2,
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      });

      gsap.from('[data-cta-action]', {
        y: 24,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-cta-panel]', start: 'top 80%', once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="contatti"
      className="relative overflow-hidden bg-night text-paper"
      aria-labelledby="cta-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 30% 100%, rgb(198 168 107 / 0.18) 0%, transparent 60%)',
        }}
      />

      <div className="container-page relative py-28 md:py-36">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12">
          {/* Sx */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7">
            <span
              data-cta-meta
              className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em]"
              style={{ color: 'rgb(var(--color-gold))' }}
            >
              <span aria-hidden className="h-px w-12 bg-gold" />
              Capitolo VI · Contatto
            </span>
            <h2
              id="cta-title"
              data-cta-headline
              className="mt-8 font-display"
              style={{
                fontSize: 'clamp(2.75rem, 7vw, 6rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.025em',
                fontWeight: 500,
                color: 'rgb(var(--color-paper))',
              }}
            >
              Parla con lo studio.
            </h2>
            <p
              data-cta-meta
              className="mt-8 max-w-xl text-[1.0625rem]"
              style={{ color: 'rgb(var(--color-paper) / 0.78)', lineHeight: 1.6 }}
            >
              Descrivi la tua situazione in poche righe. Risposta in 24–48
              ore lavorative con i passi successivi e una stima dei costi,
              prima di qualsiasi mandato.
            </p>

            <div data-cta-meta className="mt-10 flex flex-wrap items-center gap-3">
              <button
                ref={ctaRef}
                type="button"
                onClick={() =>
                  openLex(
                    'cta-contact',
                    'Raccontami in poche righe il caso: cosa è successo, cosa ti aspetti, e i tempi che hai. Lo passo allo studio già strutturato.',
                  )
                }
                className="group relative inline-flex items-center gap-3 px-7 py-4 font-medium tracking-[0.005em] transition-all duration-500"
                style={{
                  background: 'rgb(var(--color-gold))',
                  color: 'rgb(var(--color-cobalt-deep))',
                  borderRadius: '4px',
                  boxShadow: 'var(--shadow-glow-gold)',
                  fontSize: '0.9375rem',
                }}
              >
                <Sparkles size={14} strokeWidth={1.6} />
                <span className="relative z-10">Inizia con LEX</span>
                <ArrowRight size={14} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
              <Link
                href="/contatti"
                className="inline-flex items-center gap-2 px-5 py-4 text-[0.9375rem] font-medium transition-colors"
                style={{
                  border: '1px solid rgb(244 242 238 / 0.22)',
                  color: 'rgb(var(--color-paper))',
                  borderRadius: '4px',
                }}
              >
                Modulo classico
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Dx: action panel */}
          <aside
            data-cta-panel
            className="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9"
            aria-label="Contatti diretti e prenotazione"
          >
            <div
              className="overflow-hidden border"
              style={{
                borderColor: 'rgb(244 242 238 / 0.14)',
                background: 'rgb(244 242 238 / 0.04)',
                borderRadius: '6px',
                backdropFilter: 'blur(6px)',
              }}
            >
              <div
                className="flex items-center justify-between border-b px-5 py-3"
                style={{ borderColor: 'rgb(244 242 238 / 0.10)' }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: 'rgb(var(--color-gold))' }}>
                  Action panel
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'rgb(var(--color-paper) / 0.55)' }}>
                  Studio · live
                </span>
              </div>

              <ul className="divide-y" style={{ borderColor: 'rgb(244 242 238 / 0.10)' }}>
                <ActionRow
                  data-cta-action
                  icon={<Phone size={14} />}
                  label="Telefono"
                  value={SITE_DATA.phoneDisplay}
                  href={`tel:${SITE_DATA.phoneTel}`}
                />
                <ActionRow
                  data-cta-action
                  icon={<MapPin size={14} />}
                  label="Sede"
                  value={`${SITE_DATA.address.street}, ${SITE_DATA.address.cap} ${SITE_DATA.address.city}`}
                />
                <ActionRow
                  data-cta-action
                  icon={<Clock4 size={14} />}
                  label="Orari"
                  value={SITE_DATA.hours.long}
                />
                <ActionRow
                  data-cta-action
                  icon={<CalendarDays size={14} />}
                  label="Prenotazione"
                  value="Prenota un appuntamento"
                  href="/prenota"
                />
              </ul>

              <div
                className="border-t px-5 py-4"
                style={{ borderColor: 'rgb(244 242 238 / 0.10)' }}
              >
                <p className="text-[0.8125rem]" style={{ color: 'rgb(var(--color-paper) / 0.65)', lineHeight: 1.5 }}>
                  Le informazioni inviate saranno trattate con riservatezza. La
                  presa in carico avviene solo dopo conferma dello studio.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ActionRow({
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
    <div className="flex items-center gap-4 px-5 py-4">
      <span
        aria-hidden
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{
          color: 'rgb(var(--color-gold))',
          background: 'rgb(244 242 238 / 0.05)',
          border: '1px solid rgb(244 242 238 / 0.12)',
        }}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'rgb(var(--color-paper) / 0.55)' }}>
          {label}
        </span>
        <span className="block truncate font-display" style={{ fontSize: '0.9375rem', color: 'rgb(var(--color-paper))' }}>
          {value}
        </span>
      </div>
      {href && <ArrowRight size={13} style={{ color: 'rgb(var(--color-paper) / 0.5)' }} />}
    </div>
  );

  return (
    <li>
      {href ? (
        <a href={href} className="block transition-opacity duration-300 hover:opacity-80">
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}
