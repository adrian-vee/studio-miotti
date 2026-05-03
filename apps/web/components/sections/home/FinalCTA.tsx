'use client';

/**
 * FinalCTA — chiusura conversion-oriented, compatta enterprise.
 *
 * Layout split:
 *  · Sx (col 7): titolo + lead + CTA + mini form (nome + email + topic)
 *    pre-compila e invia a /contatti.
 *  · Dx (col 5): action panel telefono/sede/orari/prenotazione.
 *
 * Niente sezioni vuote, gerarchia: titolo → testo → form → contatti.
 */

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');

  useEffect(() => {
    if (!ctaRef.current) return;
    return magnetic(ctaRef.current, 18);
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
            scrollTrigger: { trigger: el, start: 'top 75%', once: true },
          });
      }

      gsap.from('[data-cta-meta]', {
        y: 16,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.07,
        delay: 0.15,
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });

      gsap.from('[data-cta-action]', {
        y: 18,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: '[data-cta-panel]', start: 'top 82%', once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (name) params.set('nome', name);
    if (email) params.set('email', email);
    if (topic) params.set('oggetto', topic);
    router.push(`/contatti?${params.toString()}`);
  }

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

      <div className="container-page relative py-20 md:py-28">
        <div className="grid grid-cols-12 items-start gap-x-[var(--gutter)] gap-y-10">
          {/* Sx */}
          <div className="col-span-12 md:col-span-7">
            <span
              data-cta-meta
              className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: 'rgb(var(--color-gold))' }}
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              Capitolo VI · Contatto
            </span>
            <h2
              id="cta-title"
              data-cta-headline
              className="mt-5 font-display"
              style={{
                fontSize: 'clamp(2rem, 4.6vw, 3.75rem)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                fontWeight: 500,
                color: 'rgb(var(--color-paper))',
              }}
            >
              Parla con lo studio.
            </h2>
            <p
              data-cta-meta
              className="mt-5 max-w-xl text-[1rem]"
              style={{ color: 'rgb(var(--color-paper) / 0.78)', lineHeight: 1.6 }}
            >
              Descrivi la tua situazione in poche righe. Risposta in 24–48 ore
              lavorative con i passi successivi e una stima dei costi, prima di
              qualsiasi mandato.
            </p>

            {/* Mini form */}
            <form
              data-cta-meta
              onSubmit={handleSubmit}
              className="mt-7 grid max-w-xl grid-cols-2 gap-2.5"
            >
              <FieldInput
                label="Nome"
                value={name}
                onChange={setName}
                placeholder="Mario Rossi"
                required
              />
              <FieldInput
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="mario@azienda.it"
                required
              />
              <FieldSelect
                className="col-span-2"
                label="Oggetto"
                value={topic}
                onChange={setTopic}
              />
              <div className="col-span-2 mt-1 flex flex-wrap items-center gap-2.5">
                <button
                  ref={ctaRef}
                  type="submit"
                  className="group relative inline-flex items-center gap-2 px-5 py-3 font-medium transition-all duration-500"
                  style={{
                    background: 'rgb(var(--color-gold))',
                    color: 'rgb(var(--color-cobalt-deep))',
                    borderRadius: '4px',
                    boxShadow: 'var(--shadow-glow-gold)',
                    fontSize: '0.875rem',
                  }}
                >
                  Invia richiesta
                  <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openLex(
                      'cta-contact',
                      'Raccontami in poche righe il caso: cosa è successo, cosa ti aspetti, e i tempi che hai. Lo passo allo studio già strutturato.',
                    )
                  }
                  className="inline-flex items-center gap-2 px-4 py-3 text-[0.875rem] font-medium transition-colors"
                  style={{
                    border: '1px solid rgb(244 242 238 / 0.22)',
                    color: 'rgb(var(--color-paper))',
                    borderRadius: '4px',
                  }}
                >
                  <Sparkles size={13} strokeWidth={1.6} />
                  Inizia con LEX
                </button>
              </div>
              <p
                data-cta-meta
                className="col-span-2 mt-1 text-[0.75rem] font-mono uppercase tracking-[0.22em]"
                style={{ color: 'rgb(var(--color-paper) / 0.45)' }}
              >
                Conferma e privacy completa nella pagina contatti
              </p>
            </form>
          </div>

          {/* Dx: action panel */}
          <aside
            data-cta-panel
            className="col-span-12 md:col-span-5 lg:col-span-4 lg:col-start-9"
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
                className="flex items-center justify-between border-b px-4 py-2.5"
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
                  icon={<Phone size={13} />}
                  label="Telefono"
                  value={SITE_DATA.phoneDisplay}
                  href={`tel:${SITE_DATA.phoneTel}`}
                />
                <ActionRow
                  data-cta-action
                  icon={<MapPin size={13} />}
                  label="Sede"
                  value={`${SITE_DATA.address.street}, ${SITE_DATA.address.cap} ${SITE_DATA.address.city}`}
                />
                <ActionRow
                  data-cta-action
                  icon={<Clock4 size={13} />}
                  label="Orari"
                  value={SITE_DATA.hours.long}
                />
                <ActionRow
                  data-cta-action
                  icon={<CalendarDays size={13} />}
                  label="Prenotazione"
                  value="Prenota un appuntamento"
                  href="/prenota"
                />
              </ul>

              <div
                className="border-t px-4 py-3"
                style={{ borderColor: 'rgb(244 242 238 / 0.10)' }}
              >
                <p className="text-[0.75rem]" style={{ color: 'rgb(var(--color-paper) / 0.6)', lineHeight: 1.5 }}>
                  Le informazioni inviate sono riservate. La presa in carico
                  avviene solo dopo conferma dello studio.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function FieldInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span
        className="font-mono text-[9.5px] uppercase tracking-[0.22em]"
        style={{ color: 'rgb(var(--color-paper) / 0.55)' }}
      >
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="rounded-[3px] border px-3 py-2.5 text-[0.875rem] outline-none transition-colors focus:border-[rgb(var(--color-gold))]"
        style={{
          background: 'rgb(244 242 238 / 0.04)',
          borderColor: 'rgb(244 242 238 / 0.18)',
          color: 'rgb(var(--color-paper))',
        }}
      />
    </label>
  );
}

const TOPICS = [
  '— Seleziona un argomento —',
  'Recupero crediti',
  'Contratti e accordi',
  'Diritto civile',
  'Diritto del lavoro',
  'Famiglia e successioni',
  'Imprese e professionisti',
  'Contenzioso',
  'Altro',
];

function FieldSelect({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1 ${className ?? ''}`}>
      <span
        className="font-mono text-[9.5px] uppercase tracking-[0.22em]"
        style={{ color: 'rgb(var(--color-paper) / 0.55)' }}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-[3px] border px-3 py-2.5 text-[0.875rem] outline-none transition-colors focus:border-[rgb(var(--color-gold))]"
        style={{
          background: 'rgb(244 242 238 / 0.04)',
          borderColor: 'rgb(244 242 238 / 0.18)',
          color: 'rgb(var(--color-paper))',
        }}
      >
        {TOPICS.map((t, i) => (
          <option key={t} value={i === 0 ? '' : t} style={{ background: 'rgb(11 37 58)' }}>
            {t}
          </option>
        ))}
      </select>
    </label>
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
    <div className="flex items-center gap-3 px-4 py-3">
      <span
        aria-hidden
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
        style={{
          color: 'rgb(var(--color-gold))',
          background: 'rgb(244 242 238 / 0.05)',
          border: '1px solid rgb(244 242 238 / 0.12)',
        }}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <span className="block font-mono text-[9.5px] uppercase tracking-[0.22em]" style={{ color: 'rgb(var(--color-paper) / 0.55)' }}>
          {label}
        </span>
        <span className="block truncate font-display" style={{ fontSize: '0.875rem', color: 'rgb(var(--color-paper))' }}>
          {value}
        </span>
      </div>
      {href && <ArrowRight size={12} style={{ color: 'rgb(var(--color-paper) / 0.5)' }} />}
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
