'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

/**
 * HERO · Studio Miotti
 *
 * Posizionamento: studio moderno, vicino al cliente, accessibile.
 * Tono diretto: niente headline poetiche o aristocratiche.
 *
 * Layout: 2 colonne desktop (testo + visual), stack mobile.
 *  · Sx — eyebrow live + headline + sub + 2 CTA + stats inline
 *  · Dx — illustrazione SVG dello studio (libreria + scrivania + lampada)
 *    line-art elegante. Si può sostituire con foto reale appena disponibile
 *    (sostituire <StudioIllustration /> con <Image src="/hero-studio.jpg" />).
 */

export function Hero() {
  /* Live status + ora */
  const [openStatus, setOpenStatus] = useState<'open' | 'closed'>('open');
  const [nowLabel, setNowLabel] = useState<string>('');

  useEffect(() => {
    function compute() {
      const now = new Date();
      const day = now.getDay();
      const minutes = now.getHours() * 60 + now.getMinutes();
      const isWeekday = day >= 1 && day <= 5;
      const morningOpen = minutes >= 9 * 60 && minutes < 13 * 60;
      const afternoonOpen = minutes >= 15 * 60 && minutes < 19 * 60;
      setOpenStatus(isWeekday && (morningOpen || afternoonOpen) ? 'open' : 'closed');
      setNowLabel(
        new Intl.DateTimeFormat('it-IT', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(now),
      );
    }
    compute();
    const id = window.setInterval(compute, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      className="relative isolate overflow-hidden bg-paper pt-32 pb-20 md:pt-40 md:pb-28"
      aria-labelledby="hero-headline"
    >
      {/* Mesh aurora di sfondo */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-aurora" />

      <div className="container-page">
        <div className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-12 md:gap-y-16 items-center">
          {/* ─── COL TESTO ─── */}
          <div className="col-span-12 lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow-live mb-6"
              data-status={openStatus}
              aria-live="polite"
            >
              {openStatus === 'open'
                ? `Studio aperto · Verona · ${nowLabel}`
                : `Studio chiuso · Risposta entro 24 h`}
            </motion.span>

            <h1
              id="hero-headline"
              className="font-display text-balance text-ink"
              style={{
                fontSize: 'var(--fs-display-l)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                fontWeight: 500,
              }}
            >
              <RevealLine delay={0}>Soluzioni legali concrete</RevealLine>
              <RevealLine delay={0.12}>
                <span className="italic text-cobalt">per imprese e privati.</span>
              </RevealLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-7 max-w-xl text-graphite"
              style={{ fontSize: 'var(--fs-body-l)', lineHeight: 1.6 }}
            >
              Risposte chiare, tempi certi, soluzioni che funzionano. Lo Studio
              dell'Avv. Massimiliano Miotti affianca aziende, professionisti e
              famiglie del territorio veronese con un metodo diretto e
              strumenti digitali moderni.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-9 flex flex-col sm:flex-row gap-3"
            >
              <Link href="/prenota" className="btn-primary group">
                Richiedi consulenza
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <a href="tel:+390459586116" className="btn-secondary group">
                <Phone size={15} />
                Contatto rapido
              </a>
            </motion.div>

            {/* Mini-stats inline */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="mt-12 grid grid-cols-3 gap-4 max-w-md border-t border-rule pt-6"
            >
              <MiniStat n="22+" label="Anni di esperienza" />
              <MiniStat n="24h" label="Tempo di risposta" />
              <MiniStat n="VR" label="Foro di Verona" />
            </motion.dl>
          </div>

          {/* ─── COL VISUAL ─── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-5 relative"
          >
            <StudioIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────── */

function RevealLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function MiniStat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <dt className="font-display text-2xl text-ink leading-none">{n}</dt>
      <dd className="mt-1 text-[11px] uppercase tracking-[0.14em] text-graphite leading-tight">
        {label}
      </dd>
    </div>
  );
}

/**
 * StudioIllustration — line-art SVG di uno studio legale.
 *
 * Disegna scrivania + sedia + lampada da tavolo + libreria sullo sfondo.
 * Stroke 1.4 cobalt, dettagli oro. Quando si avrà foto reale dello studio
 * sostituirla con next/image qui.
 */
function StudioIllustration() {
  return (
    <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
      {/* Backdrop card */}
      <div
        aria-hidden
        className="absolute inset-0 bg-vellum border border-rule"
        style={{ borderRadius: 'var(--radius-md)' }}
      />

      {/* Hairline gold accent corners */}
      <span
        aria-hidden
        className="absolute -top-px left-8 right-8 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgb(var(--color-gold)) 50%, transparent)',
        }}
      />

      <svg
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustrazione di uno studio legale: libreria, scrivania, lampada, sedia."
        className="absolute inset-0 w-full h-full p-6"
      >
        {/* Pavimento + linea orizzonte */}
        <line
          x1="20"
          y1="380"
          x2="380"
          y2="380"
          stroke="rgb(var(--color-graphite))"
          strokeOpacity="0.25"
          strokeWidth="1"
        />

        {/* Libreria sfondo */}
        <g
          stroke="rgb(var(--color-cobalt))"
          strokeWidth="1.4"
          strokeLinecap="square"
        >
          <rect x="40" y="60" width="170" height="290" />
          <line x1="40" y1="120" x2="210" y2="120" />
          <line x1="40" y1="180" x2="210" y2="180" />
          <line x1="40" y1="240" x2="210" y2="240" />
          <line x1="40" y1="300" x2="210" y2="300" />
          {/* Libri ripiani */}
          {[70, 130, 190, 250].map((y) => (
            <g key={y}>
              <line x1="50" y1={y} x2="50" y2={y + 50} />
              <line x1="60" y1={y} x2="60" y2={y + 50} />
              <line x1="74" y1={y + 8} x2="74" y2={y + 50} />
              <line x1="84" y1={y} x2="84" y2={y + 50} />
              <line x1="100" y1={y + 4} x2="100" y2={y + 50} />
              <line x1="110" y1={y} x2="110" y2={y + 50} />
              <line x1="125" y1={y} x2="125" y2={y + 50} />
              <line x1="138" y1={y + 6} x2="138" y2={y + 50} />
              <line x1="152" y1={y} x2="152" y2={y + 50} />
              <line x1="170" y1={y + 2} x2="170" y2={y + 50} />
              <line x1="184" y1={y} x2="184" y2={y + 50} />
              <line x1="198" y1={y + 4} x2="198" y2={y + 50} />
            </g>
          ))}
        </g>

        {/* Scrivania (in primo piano) */}
        <g
          stroke="rgb(var(--color-cobalt-deep))"
          strokeWidth="1.6"
          strokeLinecap="square"
          fill="rgb(var(--color-paper))"
        >
          <rect x="220" y="280" width="160" height="14" />
          <line x1="232" y1="294" x2="232" y2="380" />
          <line x1="368" y1="294" x2="368" y2="380" />
          {/* Cassetto */}
          <rect x="240" y="304" width="120" height="20" fill="none" />
        </g>

        {/* Lampada da tavolo (oro) */}
        <g
          stroke="rgb(var(--color-gold-deep))"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M250 280 L250 230 L270 200 L300 200" />
          <path d="M295 200 Q310 195 318 210 L304 220 Z" fill="rgb(var(--color-gold) / 0.25)" />
          <circle cx="250" cy="280" r="4" fill="rgb(var(--color-gold))" />
        </g>

        {/* Cono di luce dalla lampada */}
        <path
          d="M310 215 L260 280 L355 280 Z"
          fill="rgb(var(--color-gold) / 0.10)"
          stroke="none"
        />

        {/* Documento sulla scrivania */}
        <g
          stroke="rgb(var(--color-cobalt))"
          strokeWidth="1"
          fill="rgb(var(--color-paper))"
        >
          <rect x="280" y="248" width="60" height="32" />
          <line x1="288" y1="258" x2="332" y2="258" />
          <line x1="288" y1="265" x2="324" y2="265" />
          <line x1="288" y1="272" x2="318" y2="272" />
        </g>

        {/* Sedia (silhouette) */}
        <g
          stroke="rgb(var(--color-cobalt-deep))"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="square"
        >
          <path d="M270 410 L270 340 Q270 332 278 332 L322 332 Q330 332 330 340 L330 410" />
          <line x1="265" y1="395" x2="335" y2="395" />
          <line x1="285" y1="410" x2="285" y2="450" />
          <line x1="315" y1="410" x2="315" y2="450" />
        </g>

        {/* Tappeto / linea suolo */}
        <line
          x1="60"
          y1="465"
          x2="360"
          y2="465"
          stroke="rgb(var(--color-gold))"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />

        {/* Numero romano discreto in alto a sinistra — segno editoriale */}
        <text
          x="40"
          y="40"
          fill="rgb(var(--color-graphite))"
          fontFamily="var(--font-display)"
          fontSize="14"
          letterSpacing="0.2em"
        >
          STUDIO · 2003
        </text>
      </svg>

      {/* Caption */}
      <span
        aria-hidden
        className="absolute -bottom-2 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-graphite bg-paper px-2"
      >
        <span>San Bonifacio</span>
        <span>·</span>
        <span>Foro di Verona</span>
      </span>
    </div>
  );
}
