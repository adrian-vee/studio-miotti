'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';

/**
 * HERO — Studio Miotti
 *
 * Direzione: editoriale-architettonica.
 * - Composizione asimmetrica con griglia 12 colonne palese (linee guida visibili al 4% opacity)
 * - Headline serif gigante "spezzata" su tre linee con reveal letter-by-letter
 * - Filetto orizzontale che si disegna a 1.2s
 * - Numero capitolo tipografico ("§ 1") in cobalt come ancoraggio editoriale
 * - SVG decorativo: bilancia astratta a due trapezi (custom, no icon-pack)
 * - Parallax leggero su scroll del numero § (NO sul testo, perché distrae)
 * - Eyebrow con coordinate geografiche dello studio (dettaglio "luxury hotel")
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const numeroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const balanceY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const balanceOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative isolate overflow-hidden bg-paper pt-32 pb-24 md:pt-40 md:pb-32"
      aria-labelledby="hero-headline"
    >
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
        {/* Eyebrow: coordinate + posizione */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-12 gap-x-[var(--gutter)] mb-16 md:mb-24"
        >
          <div className="col-span-12 md:col-span-6 flex items-center gap-3 text-graphite">
            <span className="font-mono text-xs tracking-widest">
              45.391°N · 11.275°E
            </span>
            <span className="h-px w-8 bg-rule" />
            <span className="text-xs uppercase tracking-[0.18em] font-medium">
              San Bonifacio · Verona
            </span>
          </div>
          <div className="hidden md:flex col-span-6 justify-end items-center gap-3 text-graphite">
            <span className="text-xs uppercase tracking-[0.18em] font-medium">
              Anno {new Date().getFullYear()}
            </span>
            <span className="h-px w-8 bg-rule" />
            <span className="font-mono text-xs">Vol. I</span>
          </div>
        </motion.div>

        {/* Numero capitolo + headline */}
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12">
          {/* § 01 — paragrafo legale, parallax leggero */}
          <motion.div
            style={{ y: numeroY }}
            className="col-span-12 md:col-span-2 flex md:flex-col items-baseline md:items-start gap-3"
          >
            <span className="font-display text-cobalt text-[5rem] md:text-[7rem] leading-none">
              §
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-graphite md:mt-4">
              Cap. 01
              <br className="hidden md:block" />
              <span className="md:block">Lo Studio</span>
            </span>
          </motion.div>

          {/* Headline */}
          <div className="col-span-12 md:col-span-10">
            <h1
              id="hero-headline"
              className="font-display tracking-tight"
              style={{ fontSize: 'var(--fs-display-xl)', lineHeight: 0.95 }}
            >
              <RevealWord delay={0}>Diritto</RevealWord>
              <RevealWord delay={0.08}> come dialogo,</RevealWord>
              <br />
              <span className="block italic text-cobalt">
                <RevealWord delay={0.16}>non come</RevealWord>
                <RevealWord delay={0.22}> distanza.</RevealWord>
              </span>
            </h1>

            {/* Filetto disegnato */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="my-10 h-px w-full origin-left bg-ink/30"
            />

            <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-12 md:col-span-7 text-graphite"
                style={{ fontSize: 'var(--fs-body-l)', lineHeight: 1.55 }}
              >
                Lo Studio dell'Avv. Massimiliano Miotti assiste
                privati e imprese nella Bassa Veronese con un metodo
                che mette al primo posto la chiarezza: del problema, della
                strategia, e del costo.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-12 md:col-span-5 flex flex-col gap-4 md:items-end"
              >
                <Link href="/prenota" className="btn-primary group">
                  <span>Prenota un primo confronto</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link href="/aree-di-competenza" className="link-inline text-sm">
                  Le aree di competenza dello Studio
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bilancia astratta — a due trapezi, parallax up */}
        <motion.div
          style={{ y: balanceY, opacity: balanceOpacity }}
          aria-hidden
          className="pointer-events-none absolute right-[var(--gutter)] top-32 hidden lg:block"
        >
          <AbstractBalance />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-24 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-graphite"
        >
          <ArrowDown size={14} className="animate-bounce" />
          <span>Continua a leggere</span>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Sub-component: parola che entra con clip-path bottom→top.
 * Più editoriale di un fade banale: simula il "tipografo che svela il piombo".
 */
function RevealWord({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden align-baseline">
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

/**
 * Bilancia astratta: due trapezi sospesi, no allegoria pesante.
 * Composizione minimale che richiama l'oggetto senza essere kitsch.
 */
function AbstractBalance() {
  return (
    <svg
      width="180"
      height="220"
      viewBox="0 0 180 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Asta verticale */}
      <line x1="90" y1="0" x2="90" y2="120" stroke="rgb(var(--color-ink))" strokeWidth="1" />
      {/* Trave orizzontale */}
      <line x1="20" y1="80" x2="160" y2="80" stroke="rgb(var(--color-ink))" strokeWidth="1" />
      {/* Cordini */}
      <line x1="30" y1="80" x2="30" y2="130" stroke="rgb(var(--color-ink))" strokeWidth="0.5" />
      <line x1="150" y1="80" x2="150" y2="130" stroke="rgb(var(--color-ink))" strokeWidth="0.5" />
      {/* Trapezio sinistro (piatto sospeso) */}
      <motion.path
        d="M 12 130 L 48 130 L 42 160 L 18 160 Z"
        stroke="rgb(var(--color-cobalt))"
        strokeWidth="1"
        fill="rgb(var(--color-cobalt) / 0.06)"
        initial={{ y: -8 }}
        animate={{ y: 0 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
      {/* Trapezio destro */}
      <motion.path
        d="M 132 130 L 168 130 L 162 160 L 138 160 Z"
        stroke="rgb(var(--color-cobalt))"
        strokeWidth="1"
        fill="rgb(var(--color-cobalt) / 0.06)"
        initial={{ y: 8 }}
        animate={{ y: 0 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
      {/* Punto cardine in oro — solo dettaglio editoriale */}
      <circle cx="90" cy="80" r="3" fill="rgb(var(--color-gold))" />
    </svg>
  );
}
