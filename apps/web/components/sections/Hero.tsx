'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionMarker } from './SectionMarker';

/**
 * HERO — Studio Miotti · v2026
 *
 * Innovazioni 2026 (sobria, adatta a uno studio legale):
 *  · Live-status pill in apertura (calcola in client se lo studio è aperto ora)
 *  · Mesh "aurora" cobalto/oro dietro la colonna § — luce editoriale, mai
 *    saturata, opacità minima (≤ 0.08).
 *  · CTA primaria con effetto magnetico (translate verso il cursore) e
 *    shimmer oro al hover. CTA secondaria editoriale a contrasto.
 *  · Scroll cue minimale in basso, hairline cobalt animata.
 *  · Headline su 2 righe gerarchizzate, parallax leggera del §.
 *
 * Niente AI gradient, niente glassmorphism. Estetica editoriale densa.
 */

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const numeroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const auroraY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  /* Live status — studio aperto se Lun-Ven 9-13 / 15-19 in fuso Europe/Rome */
  const [openStatus, setOpenStatus] = useState<'open' | 'closed'>('open');
  const [nowLabel, setNowLabel] = useState<string>('');

  useEffect(() => {
    function compute() {
      const now = new Date();
      // Approssimazione: usa l'orario locale del browser. Per Italia
      // corrisponde a Europe/Rome se l'utente è in Italia.
      const day = now.getDay(); // 0=dom 6=sab
      const h = now.getHours();
      const m = now.getMinutes();
      const minutes = h * 60 + m;
      const isWeekday = day >= 1 && day <= 5;
      const morningOpen = minutes >= 9 * 60 && minutes < 13 * 60;
      const afternoonOpen = minutes >= 15 * 60 && minutes < 19 * 60;
      setOpenStatus(isWeekday && (morningOpen || afternoonOpen) ? 'open' : 'closed');

      const fmt = new Intl.DateTimeFormat('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setNowLabel(fmt.format(now));
    }
    compute();
    const id = window.setInterval(compute, 60_000);
    return () => window.clearInterval(id);
  }, []);

  /* Magnetic CTA — translate il bottone primario verso il cursore */
  function handleMagnetic(e: React.MouseEvent<HTMLAnchorElement>) {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
  }

  function resetMagnetic() {
    if (ctaRef.current) ctaRef.current.style.transform = '';
  }

  return (
    <section
      ref={containerRef}
      className="relative isolate overflow-hidden bg-paper pt-32 pb-20 md:pt-40 md:pb-28"
      aria-labelledby="hero-headline"
    >
      <SectionMarker numeral="I" label="Lo Studio" align="right" showLabel={false} />

      {/* Mesh aurora di sfondo — sottile, parallax leggera */}
      <motion.div
        aria-hidden
        style={{ y: auroraY }}
        className="absolute inset-0 -z-10 bg-aurora"
      />

      {/* Grid guides — 12 colonne sottili, statement editoriale */}
      <div
        aria-hidden
        className="container-page absolute inset-x-0 top-0 h-full pointer-events-none"
      >
        <div className="grid h-full grid-cols-12 gap-x-[var(--gutter)]">
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              className="h-full w-px bg-ink/[0.04]"
              style={{ gridColumn: `${i + 1}`, justifySelf: 'start' }}
            />
          ))}
        </div>
      </div>

      <div className="container-page relative">
        {/* Live status row */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14 flex flex-wrap items-center justify-between gap-y-3 gap-x-6"
        >
          <span
            className="eyebrow-live"
            data-status={openStatus}
            aria-live="polite"
          >
            {openStatus === 'open' ? 'Studio aperto · Risposta entro la giornata' : 'Studio chiuso · Risposta entro 24 h lavorative'}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-graphite">
            {nowLabel && <>Verona · ore {nowLabel}</>}
          </span>
        </motion.div>

        {/* § + headline */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-10">
          {/* § col 1-2 — parallax leggero, baseline-aligned con la prima riga headline */}
          <motion.div
            style={{ y: numeroY }}
            className="col-span-12 md:col-span-2 flex md:flex-col items-baseline md:items-stretch gap-4 md:gap-0"
          >
            <span
              className="font-display leading-none md:pt-3 text-grad-display"
              style={{ fontSize: 'clamp(4rem, 7vw, 6rem)' }}
            >
              §
            </span>
            <div className="md:mt-12 md:text-right">
              <span
                aria-hidden
                className="hidden md:inline-block h-px w-6 bg-rule mb-2"
              />
              <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-graphite">
                Cap. 01 / Lo Studio
              </span>
            </div>
          </motion.div>

          {/* Headline col 3-12 */}
          <div className="col-span-12 md:col-span-10">
            <h1 id="hero-headline" className="font-display">
              <RevealWord delay={0}>
                <span
                  className="block text-ink"
                  style={{
                    fontSize: 'var(--fs-display-l)',
                    lineHeight: 1.0,
                    letterSpacing: '-0.02em',
                    fontWeight: 400,
                  }}
                >
                  Diritto come dialogo,
                </span>
              </RevealWord>

              <span className="flex items-baseline justify-between gap-6 mt-2 md:mt-3">
                <RevealWord delay={0.16}>
                  <span
                    className="italic text-cobalt"
                    style={{
                      fontSize: 'var(--fs-display-m)',
                      lineHeight: 1.0,
                      letterSpacing: '-0.015em',
                      fontWeight: 400,
                      opacity: 0.85,
                    }}
                  >
                    non come distanza.
                  </span>
                </RevealWord>

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="hidden md:inline-block shrink-0 not-italic font-mono text-[10px] uppercase tracking-[0.18em] text-graphite whitespace-nowrap"
                >
                  San Bonifacio · Verona
                </motion.span>
              </span>
            </h1>

            {/* Filetto cobalt-oro animato */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="my-10 md:my-12 h-px w-full origin-left"
              style={{
                background:
                  'linear-gradient(90deg, rgb(var(--color-ink)/0.35) 0%, rgb(var(--color-cobalt)/0.5) 50%, rgb(var(--color-gold)/0.5) 100%)',
              }}
            />

            {/* Lead + CTA row */}
            <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-10">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-12 md:col-span-7 text-graphite"
                style={{ fontSize: 'var(--fs-body-l)', lineHeight: 1.55 }}
              >
                Lo Studio dell'Avv. Massimiliano Miotti assiste privati e
                imprese con un metodo che mette al primo posto la chiarezza:
                del problema, della strategia, dei costi.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-12 md:col-span-5 flex flex-col gap-4 md:items-end"
              >
                <Link
                  ref={ctaRef}
                  href="/prenota"
                  onMouseMove={handleMagnetic}
                  onMouseLeave={resetMagnetic}
                  className="btn-primary group"
                >
                  Prenota un primo confronto
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/aree-di-competenza"
                  className="link-inline text-sm md:text-right"
                >
                  Le aree di competenza dello Studio →
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll cue — ornamentale, non bloccante */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-20 md:mt-28 flex items-center gap-3 text-graphite"
          aria-hidden
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
            Scorri per leggere
          </span>
          <motion.span
            className="block h-px bg-cobalt origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ width: 64 }}
          />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Sub-component: parola che entra con clip-path bottom→top.
 */
function RevealWord({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="inline-block overflow-hidden align-baseline whitespace-pre">
      <motion.span
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
