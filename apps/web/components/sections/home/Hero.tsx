'use client';

/**
 * Hero — apertura premium, dense ma leggibile.
 *
 * Architettura:
 *  · Sfondo blu notte profondo + mesh aurora.
 *  · Sx (col 7): headline split, subhead, 2 CTA, status pill, micro-trust row.
 *  · Dx (col 5): card workflow "Prima analisi · Documenti · Strategia"
 *    con linee animate che simulano il flusso di una pratica.
 *  · Filetti SVG che si disegnano ai 4 angoli (drawPath).
 *  · Mouse parallax molto sottile sui due blocchi.
 *
 * Animazioni GSAP isolate in gsap.context, prefers-reduced-motion safe.
 */

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ShieldCheck, Clock4, Sparkles } from 'lucide-react';
import {
  ensureGsap,
  magnetic,
  prefersReducedMotion,
  splitToWords,
  drawPath,
} from '@/lib/animations';
import { openLex } from '@/lib/lex';
import { SITE_DATA } from '@/lib/site-data';

const WORKFLOW_STEPS = [
  {
    n: 'I',
    title: 'Prima analisi',
    body: 'Colloquio iniziale, mappa dei fatti, prime priorità.',
    duration: '15–30 min',
  },
  {
    n: 'II',
    title: 'Documenti',
    body: 'Checklist guidata, raccolta strutturata, accesso digitale.',
    duration: 'in parallelo',
  },
  {
    n: 'III',
    title: 'Strategia',
    body: 'Scenari realistici, costi attesi, decisione condivisa.',
    duration: 'entro 5 g.',
  },
] as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const ctaPrimary = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ctaPrimary.current) return;
    return magnetic(ctaPrimary.current, 18);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // Headline split-word reveal con delay scalare per riga
      const lines = el.querySelectorAll<HTMLElement>('[data-hero-line]');
      lines.forEach((line, i) => {
        const words = splitToWords(line);
        if (reduced) {
          gsap.set(words, { y: 0, opacity: 1 });
          return;
        }
        gsap.from(words, {
          y: '105%',
          opacity: 0,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.04,
          delay: 0.25 + i * 0.14,
        });
      });

      gsap.from('[data-hero-meta]', {
        y: 18,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.85,
      });

      // Card workflow stagger
      gsap.from('[data-hero-card]', {
        y: 32,
        opacity: 0,
        scale: 0.985,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.55,
      });
      gsap.from('[data-hero-card-row]', {
        opacity: 0,
        x: -10,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.06,
        delay: 1.1,
      });

      // Linee SVG draw
      el.querySelectorAll<SVGPathElement>('[data-hero-path]').forEach((p, i) => {
        drawPath(p, { duration: 1.6, delay: 0.3 + i * 0.1, trigger: el });
      });

      // Mouse parallax molto sottile (desktop only)
      if (!reduced && window.matchMedia('(min-width: 1024px)').matches) {
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to('[data-hero-parallax-a]', {
            x: x * 12,
            y: y * 8,
            duration: 0.9,
            ease: 'power2.out',
            overwrite: true,
          });
          gsap.to('[data-hero-parallax-b]', {
            x: x * -8,
            y: y * -6,
            duration: 0.9,
            ease: 'power2.out',
            overwrite: true,
          });
        };
        el.addEventListener('mousemove', onMove);
        return () => el.removeEventListener('mousemove', onMove);
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-night text-paper pt-32 pb-20 md:pt-40 md:pb-24"
      aria-labelledby="hero-title"
    >
      {/* Mesh + grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 12% 35%, rgb(198 168 107 / 0.10) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 75%, rgb(198 168 107 / 0.05) 0%, transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Filetti SVG agli angoli */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1320 800"
        preserveAspectRatio="none"
      >
        <path data-hero-path d="M 60 90 L 320 90" stroke="rgb(198 168 107)" strokeOpacity={0.7} strokeWidth={1} fill="none" />
        <path data-hero-path d="M 60 90 L 60 320" stroke="rgb(244 242 238)" strokeOpacity={0.16} strokeWidth={1} fill="none" />
        <path data-hero-path d="M 1260 480 L 1260 720" stroke="rgb(198 168 107)" strokeOpacity={0.5} strokeWidth={1} fill="none" />
        <path data-hero-path d="M 980 720 L 1260 720" stroke="rgb(244 242 238)" strokeOpacity={0.16} strokeWidth={1} fill="none" />
      </svg>

      <div className="container-page relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12">
          {/* ── Sx: testo principale ── */}
          <div data-hero-parallax-a className="col-span-12 lg:col-span-7">
            <span
              data-hero-meta
              className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em]"
              style={{ color: 'rgb(var(--color-gold))' }}
            >
              <span aria-hidden className="h-px w-12 bg-gold" />
              Studio Legale a San Bonifacio (VR)
            </span>

            <h1
              id="hero-title"
              className="relative mt-10 font-display"
              style={{
                fontWeight: 500,
                letterSpacing: '-0.025em',
                color: 'rgb(var(--color-paper))',
              }}
            >
              <span
                data-hero-line
                className="block"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.02 }}
              >
                Soluzioni legali concrete,
              </span>
              <span
                data-hero-line
                className="mt-1 block italic md:mt-2"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  lineHeight: 1.02,
                  color: 'rgb(var(--color-gold))',
                }}
              >
                senza complessità inutili.
              </span>
            </h1>

            <p
              data-hero-meta
              className="mt-8 max-w-xl text-[1.0625rem]"
              style={{ color: 'rgb(var(--color-paper) / 0.78)', lineHeight: 1.6 }}
            >
              Lo Studio Legale Miotti affianca imprese, professionisti e privati
              con un metodo chiaro, digitale e orientato alla soluzione.
            </p>

            {/* CTA cluster */}
            <div data-hero-meta className="mt-9 flex flex-wrap items-center gap-3">
              <button
                ref={ctaPrimary}
                type="button"
                onClick={() =>
                  openLex(
                    'cta-hero',
                    'Posso aiutarti a descrivere la tua situazione prima di parlare con l’avvocato. Iniziamo dal motivo per cui ti serve consulenza?',
                  )
                }
                className="group relative inline-flex items-center gap-2.5 px-7 py-4 font-medium tracking-[0.005em] transition-all duration-500"
                style={{
                  background: 'rgb(var(--color-gold))',
                  color: 'rgb(var(--color-cobalt-deep))',
                  borderRadius: '4px',
                  boxShadow: 'var(--shadow-glow-gold)',
                  fontSize: '0.9375rem',
                }}
              >
                <span className="relative z-10">Richiedi consulenza</span>
                <ArrowRight
                  size={15}
                  className="relative z-10 transition-transform duration-500 group-hover:translate-x-1"
                />
              </button>
              <a
                href="#metodo"
                className="inline-flex items-center gap-2 px-5 py-4 text-[0.9375rem] font-medium transition-colors"
                style={{
                  border: '1px solid rgb(244 242 238 / 0.22)',
                  color: 'rgb(var(--color-paper))',
                  borderRadius: '4px',
                }}
              >
                Scopri il metodo
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Trust micro-row */}
            <div
              data-hero-meta
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10.5px] uppercase tracking-[0.22em]"
              style={{ color: 'rgb(var(--color-paper) / 0.55)' }}
            >
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: 'rgb(var(--color-success))' }}
                />
                Studio operativo · {SITE_DATA.hours.short}
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={12} strokeWidth={1.6} />
                Riservatezza assoluta
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock4 size={12} strokeWidth={1.6} />
                Risposta in 24–48 ore lavorative
              </span>
            </div>
          </div>

          {/* ── Dx: card workflow ── */}
          <div data-hero-parallax-b className="col-span-12 lg:col-span-5">
            <article
              data-hero-card
              className="relative overflow-hidden border backdrop-blur-sm"
              style={{
                borderColor: 'rgb(244 242 238 / 0.12)',
                background: 'rgb(244 242 238 / 0.04)',
                borderRadius: '6px',
                boxShadow: '0 18px 60px rgb(6 22 36 / 0.30)',
              }}
            >
              {/* Top bar dashboard */}
              <div
                className="flex items-center justify-between border-b px-5 py-3"
                style={{ borderColor: 'rgb(244 242 238 / 0.10)' }}
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--color-gold))' }} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: 'rgb(var(--color-paper) / 0.7)' }}>
                    Pratica · iter standard
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'rgb(var(--color-gold))' }}>
                  live
                </span>
              </div>

              {/* Workflow steps */}
              <ol className="relative px-5 py-6 md:px-6 md:py-7">
                {/* Linea verticale background */}
                <span
                  aria-hidden
                  className="absolute left-[1.95rem] top-9 bottom-9 w-px md:left-[2.2rem]"
                  style={{
                    background:
                      'linear-gradient(180deg, rgb(198 168 107 / 0.5) 0%, rgb(244 242 238 / 0.16) 100%)',
                  }}
                />

                {WORKFLOW_STEPS.map((s) => (
                  <li
                    key={s.n}
                    data-hero-card-row
                    className="relative flex items-start gap-4 py-4"
                  >
                    <span
                      aria-hidden
                      className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display italic font-medium"
                      style={{
                        background: 'rgb(11 37 58)',
                        border: '1px solid rgb(198 168 107)',
                        color: 'rgb(var(--color-gold))',
                        fontSize: '0.875rem',
                      }}
                    >
                      {s.n}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <span
                          className="font-display"
                          style={{
                            fontSize: '1.0625rem',
                            lineHeight: 1.2,
                            color: 'rgb(var(--color-paper))',
                          }}
                        >
                          {s.title}
                        </span>
                        <span
                          className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em]"
                          style={{ color: 'rgb(var(--color-paper) / 0.55)' }}
                        >
                          {s.duration}
                        </span>
                      </div>
                      <p
                        className="mt-1.5 text-[0.875rem]"
                        style={{ color: 'rgb(var(--color-paper) / 0.65)', lineHeight: 1.5 }}
                      >
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Footer card */}
              <div
                className="flex items-center justify-between border-t px-5 py-3.5"
                style={{ borderColor: 'rgb(198 168 107 / 0.4)' }}
              >
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'rgb(var(--color-gold))' }}>
                  <Sparkles size={11} strokeWidth={1.6} />
                  Avvio guidato con LEX
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'rgb(var(--color-paper) / 0.6)' }}>
                  → consulenza
                </span>
              </div>
            </article>

            {/* Caption */}
            <p
              data-hero-meta
              className="mt-4 max-w-xs font-mono text-[10.5px] uppercase tracking-[0.22em]"
              style={{ color: 'rgb(var(--color-paper) / 0.5)' }}
            >
              Esempio di iter · Studio Miotti · pratica civile
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
