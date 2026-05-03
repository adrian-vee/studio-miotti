'use client';

/**
 * DigitalStudio — "Tecnologia dove serve. Avvocato dove conta."
 *
 * Layout split:
 *  · Sx: copy + 6 feature pill (raccolta documenti, promemoria,
 *    stato richiesta, archivio, supporto LEX, area cliente futura).
 *  · Dx: dashboard mockup astratto con tab "Documenti / Stato / Cronologia"
 *    e flusso documenti.
 *
 * Fa capire che lo studio è digitale, senza sembrare una startup finta.
 */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FileCheck2, BellRing, Activity, Archive, Sparkles, UserSquare2, ChevronRight } from 'lucide-react';
import { ensureGsap, prefersReducedMotion, drawPath } from '@/lib/animations';

const FEATURES = [
  { icon: FileCheck2, label: 'Raccolta documenti guidata', body: 'Checklist personalizzata per pratica.' },
  { icon: BellRing, label: 'Promemoria automatici', body: 'Scadenze e udienze, mai dimenticate.' },
  { icon: Activity, label: 'Stato richiesta in tempo reale', body: 'Vedi a che punto siamo, sempre.' },
  { icon: Archive, label: 'Archivio ordinato', body: 'Documenti sempre consultabili.' },
  { icon: Sparkles, label: 'Supporto LEX', body: 'Assistente digitale per orientamento iniziale.' },
  { icon: UserSquare2, label: 'Area cliente (in arrivo)', body: 'Accesso riservato a pratiche e documenti.' },
] as const;

const TABS = ['Documenti', 'Stato', 'Cronologia'] as const;

const DOCUMENTS = [
  { name: 'Contratto preliminare.pdf', size: '124 KB', tone: 'done' },
  { name: 'Dichiarazione redditi 2025.pdf', size: '88 KB', tone: 'done' },
  { name: 'Visura camerale.pdf', size: '46 KB', tone: 'review' },
  { name: 'Estratto conto banca.csv', size: '12 KB', tone: 'pending' },
] as const;

export function DigitalStudio() {
  const root = useRef<HTMLElement>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]>('Documenti');

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    ensureGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      gsap.from('[data-ds-head]', {
        y: 22,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 78%', once: true },
      });
      gsap.from('[data-ds-feature]', {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: '[data-ds-features]', start: 'top 80%', once: true },
      });
      gsap.from('[data-ds-mockup]', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      });

      // Frame draw
      el.querySelectorAll<SVGPathElement>('[data-ds-path]').forEach((p, i) => {
        drawPath(p, { duration: 1.4, delay: 0.2 + i * 0.12, trigger: el });
      });

      // Stagger doc rows
      gsap.from('[data-ds-row]', {
        x: -10,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: '[data-ds-mockup]', start: 'top 80%', once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="innovazione"
      className="relative bg-paper text-ink"
      aria-labelledby="ds-title"
    >
      <div className="container-page relative py-28 md:py-36">
        <header className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-6">
          <div className="col-span-12 md:col-span-5">
            <span
              data-ds-head
              className="inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-graphite"
            >
              <span aria-hidden className="h-px w-12" style={{ background: 'rgb(var(--color-cobalt))' }} />
              Capitolo V · Studio digitale
            </span>
            <h2
              id="ds-title"
              data-ds-head
              className="mt-6 font-display"
              style={{
                fontSize: 'var(--fs-display-l)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                color: 'rgb(var(--color-cobalt-deep))',
              }}
            >
              Tecnologia dove serve.
              <br />
              <em className="not-italic" style={{ color: 'rgb(var(--color-gold-deep))' }}>
                Avvocato dove conta.
              </em>
            </h2>
          </div>
        </header>

        <div className="mt-16 grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12 md:mt-20">
          {/* Sx: features */}
          <div className="col-span-12 md:col-span-5">
            <p
              data-ds-head
              className="max-w-md text-[1.0625rem] text-ink-soft"
              style={{ lineHeight: 1.6 }}
            >
              Un’infrastruttura digitale costruita sul lavoro reale: meno
              email perse, meno documenti rincorsi, più tempo dedicato al
              merito della pratica.
            </p>

            <ul data-ds-features className="mt-9 space-y-2.5">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <li
                    key={f.label}
                    data-ds-feature
                    className="group flex items-start gap-4 rounded-[3px] border bg-vellum p-4 transition-all duration-500 hover:border-[rgb(var(--color-gold)/0.5)]"
                    style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
                  >
                    <span
                      aria-hidden
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-500 group-hover:bg-[rgb(var(--color-gold)/0.12)]"
                      style={{
                        color: 'rgb(var(--color-cobalt))',
                        background: 'rgb(var(--color-paper-warm) / 0.4)',
                      }}
                    >
                      <Icon size={15} strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0">
                      <span
                        className="font-display"
                        style={{ fontSize: '0.9375rem', lineHeight: 1.25, color: 'rgb(var(--color-cobalt-deep))' }}
                      >
                        {f.label}
                      </span>
                      <p className="mt-1 text-[0.8125rem] leading-[1.5] text-graphite">{f.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Dx: dashboard mockup */}
          <div data-ds-mockup className="col-span-12 md:col-span-6 md:col-start-7 lg:col-span-7 lg:col-start-6">
            <article
              className="relative overflow-hidden border bg-vellum"
              style={{
                borderColor: 'rgb(var(--color-rule) / 0.18)',
                borderRadius: '6px',
                boxShadow: 'var(--shadow-card-hover)',
              }}
            >
              {/* Toolbar */}
              <div
                className="flex items-center justify-between border-b px-5 py-3"
                style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--color-gold))' }} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite">
                    Pratica · #2026/047
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                  vista cliente
                </span>
              </div>

              {/* Tabs */}
              <div
                className="flex border-b"
                style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
                role="tablist"
              >
                {TABS.map((t) => {
                  const active = t === tab;
                  return (
                    <button
                      key={t}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setTab(t)}
                      className="relative px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.28em] transition-colors"
                      style={{
                        color: active ? 'rgb(var(--color-cobalt-deep))' : 'rgb(var(--color-graphite))',
                      }}
                    >
                      {t}
                      {active && (
                        <span
                          aria-hidden
                          className="absolute -bottom-px left-0 h-px w-full"
                          style={{ background: 'rgb(var(--color-gold))' }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Body */}
              <div className="relative px-5 py-6 md:px-6 md:py-7">
                <svg
                  aria-hidden
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 600 320"
                  preserveAspectRatio="none"
                >
                  <path data-ds-path d="M 30 160 L 570 160" stroke="rgb(11 37 58)" strokeOpacity={0.06} strokeWidth={1} fill="none" />
                </svg>

                {tab === 'Documenti' && (
                  <ul className="relative space-y-2.5">
                    {DOCUMENTS.map((d) => (
                      <li
                        key={d.name}
                        data-ds-row
                        className="flex items-center gap-3 rounded-[3px] border bg-paper px-4 py-3"
                        style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
                      >
                        <span
                          aria-hidden
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px]"
                          style={{
                            background: 'rgb(var(--color-paper-warm) / 0.5)',
                            color: 'rgb(var(--color-cobalt))',
                          }}
                        >
                          <FileCheck2 size={14} strokeWidth={1.6} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="block truncate text-[0.875rem] text-ink">
                            {d.name}
                          </span>
                          <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                            {d.size}
                          </span>
                        </div>
                        <span
                          className="rounded-[3px] border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.22em]"
                          style={
                            d.tone === 'done'
                              ? {
                                  borderColor: 'rgb(var(--color-success) / 0.4)',
                                  color: 'rgb(var(--color-success))',
                                  background: 'rgb(var(--color-success) / 0.06)',
                                }
                              : d.tone === 'review'
                                ? {
                                    borderColor: 'rgb(var(--color-gold) / 0.5)',
                                    color: 'rgb(var(--color-gold-deep))',
                                    background: 'rgb(var(--color-gold) / 0.08)',
                                  }
                                : {
                                    borderColor: 'rgb(var(--color-rule) / 0.18)',
                                    color: 'rgb(var(--color-graphite))',
                                  }
                          }
                        >
                          {d.tone === 'done' ? 'caricato' : d.tone === 'review' ? 'in revisione' : 'in attesa'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {tab === 'Stato' && (
                  <div className="relative space-y-3">
                    <StatusRow label="Prima risposta" tone="done" caption="entro 24 ore lavorative" />
                    <StatusRow label="Raccolta documenti" tone="active" caption="3 di 4 caricati" />
                    <StatusRow label="Analisi del caso" tone="pending" caption="in coda" />
                    <StatusRow label="Strategia" tone="pending" caption="in coda" />
                  </div>
                )}

                {tab === 'Cronologia' && (
                  <ul className="relative space-y-3">
                    {[
                      { d: '02 mag', t: 'Caricato visura camerale.' },
                      { d: '01 mag', t: 'Confermato preventivo iniziale.' },
                      { d: '28 apr', t: 'Prima analisi inviata al cliente.' },
                      { d: '26 apr', t: 'Pratica aperta · #2026/047.' },
                    ].map((e) => (
                      <li
                        key={e.d + e.t}
                        data-ds-row
                        className="flex items-start gap-4 border-l py-1 pl-4"
                        style={{ borderColor: 'rgb(var(--color-gold) / 0.4)' }}
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                          {e.d}
                        </span>
                        <span className="text-[0.875rem] text-ink-soft">{e.t}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-between border-t px-5 py-3"
                style={{ borderColor: 'rgb(var(--color-gold) / 0.5)' }}
              >
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: 'rgb(var(--color-success))' }}
                  />
                  Aggiornato ora
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: 'rgb(var(--color-gold-deep))' }}>
                  Apri pratica
                  <ChevronRight size={12} />
                </span>
              </div>
            </article>

            <p className="mt-3 max-w-md font-mono text-[10.5px] uppercase tracking-[0.22em] text-graphite">
              Mockup illustrativo · area cliente in arrivo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusRow({
  label,
  tone,
  caption,
}: {
  label: string;
  tone: 'done' | 'active' | 'pending';
  caption: string;
}) {
  const color =
    tone === 'done'
      ? 'rgb(var(--color-success))'
      : tone === 'active'
        ? 'rgb(var(--color-gold))'
        : 'rgb(var(--color-rule) / 0.4)';
  return (
    <div
      data-ds-row
      className="flex items-center gap-4 rounded-[3px] border bg-paper px-4 py-3"
      style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
    >
      <span aria-hidden className="inline-block h-2 w-2 rounded-full" style={{ background: color }} />
      <span
        className="font-display flex-1"
        style={{ fontSize: '0.9375rem', lineHeight: 1.2, color: 'rgb(var(--color-cobalt-deep))' }}
      >
        {label}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite">{caption}</span>
    </div>
  );
}
