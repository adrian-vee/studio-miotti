'use client';

/**
 * DigitalInnovation — innovazione interna allo studio.
 *
 * IMPORTANTE: LEX non viene presentato come sezione qui. È solo una
 * delle feature ("AI-ready architecture") in pill, e vive come floating
 * button. Questa sezione parla di gestione digitale concreta.
 *
 * Layout split asimmetrico:
 *  · Sinistra: copy editoriale + lista pill feature.
 *  · Destra: dashboard mockup astratta con nodi/flusso animati e scan-line.
 *
 * Animazioni: stagger reveal feature + draw line schema flusso + scan
 * leggerissima sul mockup (loop infinito ma bassa opacità).
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  ensureGsap,
  prefersReducedMotion,
} from '@/lib/animations';
import { DIGITAL_FEATURES } from '@/lib/site-data';
import { CheckCircle2 } from 'lucide-react';

export function DigitalInnovation() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      gsap.from('[data-di-reveal]', {
        opacity: 0,
        y: 24,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });

      // Schema flusso: connetti nodi
      const lines = el.querySelectorAll<SVGPathElement>('[data-di-line]');
      lines.forEach((line) => {
        const len = line.getTotalLength?.() ?? 100;
        line.style.strokeDasharray = String(len);
        line.style.strokeDashoffset = String(len);
      });

      if (!reduced) {
        gsap.to('[data-di-line]', {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: 'power2.out',
          stagger: 0.18,
          scrollTrigger: { trigger: el, start: 'top 70%', once: true },
        });

        // Scan leggera infinita
        gsap.to('[data-di-scan]', {
          y: '100%',
          duration: 4.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // Pulse nodi
        gsap.to('[data-di-node]', {
          scale: 1.18,
          duration: 1.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.2,
          transformOrigin: 'center',
        });
      } else {
        gsap.set('[data-di-line]', { strokeDashoffset: 0 });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="innovazione"
      className="relative bg-paper-warm py-24 md:py-32"
      aria-labelledby="digital-title"
    >
      <div className="container-page">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12">
          {/* ── Sinistra: copy + features ── */}
          <div className="col-span-12 md:col-span-6">
            <span className="eyebrow-num" data-di-reveal>
              <strong>05 ·</strong> Innovazione digitale
            </span>
            <h2
              id="digital-title"
              data-di-reveal
              className="mt-6 font-display text-ink"
              style={{ fontSize: 'var(--fs-display-l)', lineHeight: 1.04, letterSpacing: '-0.02em' }}
            >
              Tecnologia al servizio della relazione professionale,{' '}
              <span className="italic text-cobalt">non al suo posto.</span>
            </h2>
            <p
              data-di-reveal
              className="mt-8 max-w-xl text-lg text-ink-soft"
              style={{ lineHeight: 1.55 }}
            >
              Un’infrastruttura digitale costruita sul lavoro reale: meno
              email perse, meno documenti rincorsi, più tempo dedicato al
              merito della pratica.
            </p>

            <ul className="mt-10 space-y-5">
              {DIGITAL_FEATURES.map((f) => (
                <li
                  key={f.label}
                  data-di-reveal
                  className="flex items-start gap-4"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full"
                    style={{
                      background: 'rgb(var(--color-vellum))',
                      border: '1px solid rgb(var(--color-gold) / 0.45)',
                      color: 'rgb(var(--color-gold-deep))',
                    }}
                  >
                    <CheckCircle2 size={13} strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3
                      className="font-display text-ink"
                      style={{ fontSize: '1.125rem', lineHeight: 1.25 }}
                    >
                      {f.label}
                    </h3>
                    <p className="mt-1 text-[0.9375rem] leading-[1.55] text-graphite">
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Destra: schema flusso astratto ── */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-8">
            <div data-di-reveal className="relative">
              <FlowMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Mockup dashboard astratto ── */
function FlowMockup() {
  return (
    <div
      className="relative aspect-[4/4.6] w-full overflow-hidden"
      style={{
        background: 'rgb(var(--color-vellum))',
        border: '1px solid rgb(var(--color-rule) / 0.18)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      {/* Header mockup */}
      <div
        className="flex items-center justify-between border-b px-5 py-3"
        style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: 'rgb(var(--color-rule) / 0.4)' }} />
          <span className="h-2 w-2 rounded-full" style={{ background: 'rgb(var(--color-rule) / 0.4)' }} />
          <span className="h-2 w-2 rounded-full" style={{ background: 'rgb(var(--color-gold))' }} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
          Cliente · pratica #2026-018
        </span>
      </div>

      {/* Stage SVG schema */}
      <div className="relative h-full">
        <svg
          viewBox="0 0 320 380"
          className="h-full w-full"
          aria-hidden
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Linee flusso */}
          <path
            data-di-line
            d="M60 60 L160 60 L160 180 L260 180"
            fill="none"
            stroke="rgb(var(--color-cobalt))"
            strokeWidth={1}
            strokeOpacity={0.5}
          />
          <path
            data-di-line
            d="M60 60 L60 200 L160 200 L160 320"
            fill="none"
            stroke="rgb(var(--color-cobalt))"
            strokeWidth={1}
            strokeOpacity={0.4}
          />
          <path
            data-di-line
            d="M260 180 L260 320"
            fill="none"
            stroke="rgb(var(--color-gold))"
            strokeWidth={1}
            strokeOpacity={0.7}
          />

          {/* Nodi */}
          <g data-di-node>
            <circle cx={60} cy={60} r={6} fill="rgb(var(--color-cobalt))" />
          </g>
          <g data-di-node>
            <circle cx={160} cy={180} r={6} fill="rgb(var(--color-cobalt))" />
          </g>
          <g data-di-node>
            <circle cx={260} cy={180} r={6} fill="rgb(var(--color-gold))" />
          </g>
          <g data-di-node>
            <circle cx={160} cy={320} r={6} fill="rgb(var(--color-cobalt))" />
          </g>
          <g data-di-node>
            <circle cx={260} cy={320} r={6} fill="rgb(var(--color-cobalt))" />
          </g>

          {/* Label */}
          <text x={70} y={48} fontSize={9} fontFamily="ui-monospace" fill="rgb(var(--color-graphite))" letterSpacing="2">
            RICHIESTA
          </text>
          <text x={170} y={170} fontSize={9} fontFamily="ui-monospace" fill="rgb(var(--color-graphite))" letterSpacing="2">
            DOCUMENTI
          </text>
          <text x={208} y={170} fontSize={9} fontFamily="ui-monospace" fill="rgb(var(--color-gold-deep))" letterSpacing="2">
            AI ASSIST
          </text>
          <text x={170} y={310} fontSize={9} fontFamily="ui-monospace" fill="rgb(var(--color-graphite))" letterSpacing="2">
            STRATEGIA
          </text>
          <text x={208} y={310} fontSize={9} fontFamily="ui-monospace" fill="rgb(var(--color-graphite))" letterSpacing="2">
            CHIUSURA
          </text>
        </svg>

        {/* Scan line leggerissima */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgb(var(--color-gold) / 0.06) 50%, transparent 100%)',
          }}
          data-di-scan
        />
      </div>

      {/* Footer status mockup */}
      <div
        className="absolute inset-x-0 bottom-0 grid grid-cols-3 border-t px-5 py-3"
        style={{
          borderColor: 'rgb(var(--color-rule) / 0.12)',
          background: 'rgb(var(--color-vellum))',
        }}
      >
        <Stat label="In corso" value="3" tone="cobalt" />
        <Stat label="In attesa" value="1" tone="gold" />
        <Stat label="Chiuse" value="12" tone="ink" />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'cobalt' | 'gold' | 'ink';
}) {
  const color =
    tone === 'cobalt'
      ? 'rgb(var(--color-cobalt))'
      : tone === 'gold'
        ? 'rgb(var(--color-gold-deep))'
        : 'rgb(var(--color-ink))';
  return (
    <div className="flex flex-col">
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-graphite">
        {label}
      </span>
      <span className="font-display" style={{ fontSize: '1.25rem', lineHeight: 1.1, color }}>
        {value}
      </span>
    </div>
  );
}
