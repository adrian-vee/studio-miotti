'use client';

/**
 * 08 · CTA FINALE — "Parla con lo studio."
 *
 * Sfondo blu notte profondo. Headline gigante asimmetrica.
 * Pulsante magnetico con glow oro.
 * Sotto: contatti minimal in mono caps.
 */

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Phone, MapPin, Clock4 } from 'lucide-react';
import {
  ensureGsap,
  magnetic,
  prefersReducedMotion,
  splitToChars,
} from '@/lib/animations';
import { openLex } from '@/lib/lex';
import { SITE_DATA } from '@/lib/site-data';

export function FinalCTASection() {
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
      // Char reveal headline
      const headline = el.querySelector<HTMLElement>('[data-cta-headline]');
      if (headline) {
        const chars = splitToChars(headline);
        if (reduced) {
          gsap.set(chars, { opacity: 1, y: 0 });
        } else {
          gsap.from(chars, {
            opacity: 0,
            y: 24,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.015,
            scrollTrigger: { trigger: el, start: 'top 70%', once: true },
          });
        }
      }

      gsap.from('[data-cta-meta]', {
        opacity: 0,
        y: 18,
        duration: 0.95,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.3,
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-night text-paper"
      aria-labelledby="final-cta"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgb(198 168 107 / 0.18) 0%, transparent 60%)',
        }}
      />

      <div className="container-page relative py-32 md:py-44">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12">
          <div className="col-span-12 md:col-span-9 lg:col-span-8">
            <span
              data-cta-meta
              className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em]"
              style={{ color: 'rgb(var(--color-gold))' }}
            >
              <span aria-hidden className="h-px w-12 bg-gold" />
              Capitolo VI · Contatto
            </span>
            <h2
              id="final-cta"
              data-cta-headline
              className="mt-10 font-display"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                lineHeight: 0.96,
                letterSpacing: '-0.025em',
                fontWeight: 500,
                color: 'rgb(var(--color-paper))',
              }}
            >
              Parla con lo studio.
            </h2>
            <p
              data-cta-meta
              className="mt-10 max-w-xl text-[1.0625rem]"
              style={{ color: 'rgb(var(--color-paper) / 0.7)', lineHeight: 1.6 }}
            >
              Descrivi la tua situazione in poche righe. Risposta in 24–48
              ore lavorative con i passi successivi e una stima dei costi,
              prima di qualsiasi mandato.
            </p>

            <div data-cta-meta className="mt-12 flex flex-wrap items-center gap-4">
              <button
                ref={ctaRef}
                type="button"
                onClick={() =>
                  openLex(
                    'cta-contact',
                    'Raccontami in poche righe il caso: cosa è successo, cosa ti aspetti, e i tempi che hai. Lo passo allo studio già strutturato.',
                  )
                }
                className="group relative inline-flex items-center gap-3 px-8 py-5 font-medium tracking-[0.01em] transition-all duration-500"
                style={{
                  background: 'rgb(var(--color-gold))',
                  color: 'rgb(var(--color-cobalt-deep))',
                  borderRadius: '4px',
                  boxShadow: 'var(--shadow-glow-gold)',
                  fontSize: '1rem',
                }}
              >
                <span className="relative z-10">Parla con lo studio</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 transition-transform duration-500 group-hover:translate-x-1"
                />
                {/* glow layer */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'linear-gradient(115deg, transparent 30%, rgb(255 253 248 / 0.35) 50%, transparent 70%)',
                  }}
                />
              </button>
              <Link
                href="/contatti"
                className="text-[0.9375rem] font-medium underline-offset-[6px] transition-opacity hover:underline"
                style={{ color: 'rgb(var(--color-paper) / 0.7)' }}
              >
                Modulo classico →
              </Link>
            </div>
          </div>

          {/* Contatti diretti */}
          <aside
            data-cta-meta
            className="col-span-12 md:col-span-3 md:col-start-10"
            aria-label="Contatti diretti"
          >
            <ul className="divide-y" style={{ borderColor: 'rgb(244 242 238 / 0.12)' }}>
              <ContactRow icon={<Phone size={13} />} label="Telefono" value={SITE_DATA.phoneDisplay} href={`tel:${SITE_DATA.phoneTel}`} />
              <ContactRow
                icon={<MapPin size={13} />}
                label="Sede"
                value={`${SITE_DATA.address.city} (${SITE_DATA.address.province})`}
              />
              <ContactRow icon={<Clock4 size={13} />} label="Orari" value={SITE_DATA.hours.short} />
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
        style={{ color: 'rgb(var(--color-paper) / 0.55)' }}
      >
        {icon}
        {label}
      </span>
      <span
        className="font-display"
        style={{
          fontSize: '1rem',
          lineHeight: 1.35,
          color: 'rgb(var(--color-paper))',
        }}
      >
        {value}
      </span>
    </div>
  );

  return (
    <li
      className="border-t first:border-t-0"
      style={{ borderColor: 'rgb(244 242 238 / 0.12)' }}
    >
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
