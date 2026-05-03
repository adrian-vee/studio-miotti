'use client';

/**
 * Hero — composizione editoriale asimmetrica (v2).
 *
 * Architettura tipografica:
 *  · Headline spezzata in 4 righe sfalsate, ognuna con indentazione propria.
 *  · Scala display-xxl (clamp fino a 9rem) — peso visivo concreto.
 *  · Riga 2 italic + cobalt come "parola chiave".
 *  · Riga 4 più piccola e demoted, fuori asse.
 *
 * Elementi proprietari:
 *  · "§" in filigrana over-sized dietro il titolo, mai stock.
 *  · Numerali romani (I–IV) come ticker verticale a sinistra (gerarchia
 *    di paragrafi giuridica reinterpretata).
 *  · Linea oro che parte dal margine sinistro, attraversa il blocco CTA
 *    e si interrompe (pattern editoriale: indica focus, non cornice).
 *  · Visual mosso fuori griglia e ridotto a sigillo + estratto pratica.
 *
 * GSAP:
 *  · Reveal parola-per-parola riga per riga (delay scalare).
 *  · Linee decorative draw-in.
 *  · Parallax leggero sul sigillo + sul visual.
 *  · Magnetic CTA primaria.
 *  · prefers-reduced-motion safe (gsap.context + skip).
 */

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, MapPin, Clock4 } from 'lucide-react';
import {
  ensureGsap,
  magnetic,
  prefersReducedMotion,
  splitToWords,
} from '@/lib/animations';
import { openLex } from '@/lib/lex';
import { SITE_DATA } from '@/lib/site-data';

const ROMAN = ['I', 'II', 'III', 'IV'];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const ctaPrimary = useRef<HTMLButtonElement>(null);

  // Magnetic CTA
  useEffect(() => {
    if (!ctaPrimary.current) return;
    return magnetic(ctaPrimary.current, 16);
  }, []);

  // Scenografia GSAP
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // Reveal parola-per-parola, ogni riga con delay scalare
      const lines = el.querySelectorAll<HTMLElement>('[data-hero-line]');
      lines.forEach((line, i) => {
        const words = splitToWords(line);
        if (reduced) {
          gsap.set(words, { y: 0, opacity: 1 });
          return;
        }
        gsap.from(words, {
          y: '110%',
          opacity: 0,
          duration: 1.05,
          ease: 'power3.out',
          stagger: 0.04,
          delay: 0.18 + i * 0.12,
        });
      });

      // Stack secondario (subhead, CTA, prove fiducia)
      gsap.from('[data-hero-stack] > *', {
        y: 22,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.95,
      });

      // Linee decorative draw-in (orizzontali + filetto CTA + numerali)
      gsap.from('[data-hero-draw]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.4,
      });

      // Numerali romani con fade scalare
      gsap.from('[data-hero-roman]', {
        opacity: 0,
        x: -8,
        duration: 0.9,
        ease: 'power2.out',
        stagger: 0.08,
        delay: 0.6,
      });

      // Sigillo + visual reveal
      gsap.from('[data-hero-mark]', {
        opacity: 0,
        scale: 0.96,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.3,
      });
      gsap.from('[data-hero-visual]', {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.7,
      });

      // Parallax leggero
      if (!reduced) {
        gsap.to('[data-hero-mark]', {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
        gsap.to('[data-hero-parallax]', {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative bg-aurora overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32"
      aria-labelledby="hero-title"
    >
      {/* Texture grain */}
      <div className="grain absolute inset-0" aria-hidden />

      {/* Filetti verticali (grid editoriale) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[calc(var(--gutter)+1.5rem)] hidden w-px md:block"
        style={{ background: 'rgb(var(--color-rule) / 0.08)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-[calc(var(--gutter)+1.5rem)] hidden w-px md:block"
        style={{ background: 'rgb(var(--color-rule) / 0.06)' }}
      />

      {/* ── Sigillo § over-sized in filigrana ── */}
      <div
        data-hero-mark
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-[-4%] hidden select-none items-center md:flex"
        style={{ zIndex: 0 }}
      >
        <span
          className="font-display italic"
          style={{
            fontSize: 'clamp(28rem, 56vw, 56rem)',
            lineHeight: 0.78,
            color: 'rgb(var(--color-cobalt) / 0.05)',
            letterSpacing: '-0.06em',
          }}
        >
          §
        </span>
      </div>

      <div className="container-page relative" style={{ zIndex: 1 }}>
        {/* ── Eyebrow + numerali romani sui margini ── */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)]">
          <div className="col-span-12 md:col-span-7 lg:col-span-8">
            <span className="eyebrow-num">
              <strong>01 ·</strong> Studio Legale a San Bonifacio (VR)
            </span>
            <span
              data-hero-draw
              aria-hidden
              className="mt-4 block h-px w-32"
              style={{ background: 'rgb(var(--color-cobalt))' }}
            />
          </div>
          <div className="col-span-12 hidden md:col-span-4 lg:col-span-3 lg:col-start-10 md:flex md:items-start md:justify-end">
            <ul
              aria-hidden
              className="hidden flex-col items-end gap-2 lg:flex"
            >
              {ROMAN.map((r, i) => (
                <li
                  key={r}
                  data-hero-roman
                  className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite"
                >
                  <span className="font-display italic" style={{ fontSize: '0.875rem', color: i === 0 ? 'rgb(var(--color-cobalt))' : 'inherit' }}>
                    {r}
                  </span>
                  <span>
                    {[ 'studio', 'metodo', 'territorio', 'fiducia' ][i]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Headline asimmetrica ── */}
        <h1
          id="hero-title"
          className="relative mt-10 font-display text-ink md:mt-16"
          style={{
            fontWeight: 500,
            letterSpacing: '-0.025em',
          }}
        >
          {/* Riga 1 — flush left, peso normale */}
          <span
            data-hero-line
            className="block"
            style={{
              fontSize: 'clamp(3.25rem, 9.5vw, 8.25rem)',
              lineHeight: 0.92,
            }}
          >
            Soluzioni
          </span>

          {/* Riga 2 — italic, cobalt, indent +1 col */}
          <span
            data-hero-line
            className="mt-1 block italic md:mt-3"
            style={{
              fontSize: 'clamp(3.5rem, 10.5vw, 9rem)',
              lineHeight: 0.94,
              color: 'rgb(var(--color-cobalt))',
              paddingLeft: 'clamp(1.5rem, 6vw, 6rem)',
              letterSpacing: '-0.03em',
            }}
          >
            legali
          </span>

          {/* Riga 3 — extra-large, indent +2 col */}
          <span
            data-hero-line
            className="mt-1 block md:mt-3"
            style={{
              fontSize: 'clamp(3.25rem, 9.5vw, 8.25rem)',
              lineHeight: 0.92,
              paddingLeft: 'clamp(3rem, 12vw, 12rem)',
            }}
          >
            concrete.
          </span>

          {/* Riga 4 — sottoscala, off-axis right, demoted */}
          <span
            data-hero-line
            className="mt-4 block text-graphite md:mt-6 md:text-right"
            style={{
              fontSize: 'clamp(1.125rem, 1.6vw, 1.5rem)',
              lineHeight: 1.3,
              letterSpacing: '0.005em',
              fontStyle: 'italic',
              fontWeight: 400,
            }}
          >
            <span className="inline-flex items-center gap-3">
              <span
                data-hero-draw
                aria-hidden
                className="hidden h-px w-12 md:block"
                style={{ background: 'rgb(var(--color-gold))' }}
              />
              per imprese e privati.
            </span>
          </span>
        </h1>

        {/* ── Stack subheadline + CTA + trust ── */}
        <div
          data-hero-stack
          className="mt-14 grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8 md:mt-20"
        >
          {/* Sub headline + CTA: indented per ritmo */}
          <div className="col-span-12 md:col-span-7 lg:col-span-6 lg:col-start-2">
            {/* Linea oro che fa da "segnalibro" al blocco */}
            <span
              data-hero-draw
              aria-hidden
              className="mb-6 block h-px w-16"
              style={{ background: 'rgb(var(--color-gold))' }}
            />

            <p
              className="max-w-xl text-ink-soft"
              style={{ fontSize: '1.0625rem', lineHeight: 1.6 }}
            >
              Ti aiutiamo a gestire problemi legali in modo chiaro e ordinato.
              <span className="text-graphite">
                {' '}Risposte rapide, costi indicati prima del mandato,
                aggiornamenti costanti.
              </span>
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                ref={ctaPrimary}
                type="button"
                onClick={() =>
                  openLex(
                    'cta-hero',
                    'Posso aiutarti a descrivere la tua situazione prima di parlare con l’avvocato. Iniziamo dal motivo per cui ti serve consulenza?',
                  )
                }
                className="btn-primary group"
              >
                Richiedi consulenza
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
              <Link href="/studio" className="btn-secondary">
                Scopri lo studio
              </Link>
            </div>

            {/* Trust microcopy */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span
                className="pill pill-live"
                style={{ fontSize: '0.6875rem', paddingInline: '0.7rem' }}
              >
                Studio operativo · {SITE_DATA.hours.short}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                · risposta in 24–48 ore lavorative
              </span>
            </div>
          </div>

          {/* Visual editoriale fuori griglia (estratto pratica) */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4 lg:col-start-9">
            <div data-hero-visual className="md:translate-y-[-2rem]">
              <div data-hero-parallax>
                <PracticeExtract />
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer-row del hero (fact strip editoriale) ── */}
        <div className="relative mt-20 md:mt-28">
          <div
            data-hero-draw
            aria-hidden
            className="absolute -top-10 left-0 right-0 h-px"
            style={{ background: 'rgb(var(--color-rule) / 0.18)' }}
          />
          <dl className="grid grid-cols-2 gap-x-[var(--gutter)] gap-y-8 md:grid-cols-4">
            <HeroFact
              roman="I"
              kicker="Sede"
              value="San Bonifacio"
              note={SITE_DATA.address.street}
              icon={<MapPin size={13} />}
            />
            <HeroFact
              roman="II"
              kicker="Orari"
              value="Lun – Ven"
              note="9–13 / 15–19"
              icon={<Clock4 size={13} />}
            />
            <HeroFact
              roman="III"
              kicker="Approccio"
              value="Civile · Lavoro · Famiglia"
              note="Imprese e privati del territorio"
            />
            <HeroFact
              roman="IV"
              kicker="Metodo"
              value="Analisi → strategia → chiusura"
              note="Aggiornamenti costanti, niente silenzi"
            />
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ─── Estratto pratica (visual editoriale fuori griglia) ─────────── */
function PracticeExtract() {
  return (
    <figure
      className="relative ml-auto max-w-[22rem]"
      role="img"
      aria-label="Estratto editoriale: nota di pratica civile"
    >
      {/* Stamp oro */}
      <div
        aria-hidden
        className="absolute -left-3 -top-3 inline-flex h-12 w-12 items-center justify-center rounded-full"
        style={{
          background: 'rgb(var(--color-vellum))',
          border: '1px solid rgb(var(--color-gold) / 0.5)',
          color: 'rgb(var(--color-gold-deep))',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: '1.1rem',
          lineHeight: 1,
        }}
      >
        M
      </div>

      <div
        className="relative border bg-vellum p-6 shadow-card"
        style={{
          borderColor: 'rgb(var(--color-rule) / 0.18)',
          borderRadius: '2px',
        }}
      >
        {/* Header nota */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
            Estratto · pratica civile
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-graphite">
            #2026/047
          </span>
        </div>

        {/* Filetto cobalt */}
        <span
          aria-hidden
          className="mt-4 block h-px w-full"
          style={{ background: 'rgb(var(--color-cobalt) / 0.2)' }}
        />

        {/* Quote display */}
        <blockquote
          className="mt-4 font-display italic text-ink"
          style={{ fontSize: '1.15rem', lineHeight: 1.35 }}
        >
          «La controparte ha 30 giorni. Nel frattempo, mettiamo al sicuro la posizione.»
        </blockquote>

        {/* Filetto oro */}
        <span
          aria-hidden
          className="mt-5 block h-px w-full"
          style={{ background: 'rgb(var(--color-gold) / 0.5)' }}
        />

        {/* Footer nota */}
        <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-graphite">
          <span>Avv. M. Miotti</span>
          <span>VR · 37047</span>
        </div>
      </div>

      {/* Footnote tipografica fuori card */}
      <figcaption className="mt-3 flex items-start gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
        <span className="font-display italic" style={{ fontSize: '0.8rem', lineHeight: 1, color: 'rgb(var(--color-cobalt))' }}>
          ¶
        </span>
        nota di studio · 2026
      </figcaption>
    </figure>
  );
}

/* ─── Fact tile con numerale romano ─────────────────────────────── */
function HeroFact({
  roman,
  kicker,
  value,
  note,
  icon,
}: {
  roman: string;
  kicker: string;
  value: string;
  note: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline gap-2">
        <span
          className="font-display italic text-cobalt"
          style={{ fontSize: '0.95rem', lineHeight: 1 }}
        >
          {roman}
        </span>
        <span
          aria-hidden
          className="h-px flex-1"
          style={{ background: 'rgb(var(--color-rule) / 0.18)', maxWidth: 16 }}
        />
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
          {icon}
          {kicker}
        </span>
      </div>
      <span className="font-display text-ink" style={{ fontSize: '1.125rem', lineHeight: 1.2 }}>
        {value}
      </span>
      <span className="text-sm text-graphite">{note}</span>
    </div>
  );
}
