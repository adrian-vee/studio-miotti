'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE_DATA } from '@/lib/site-data';

type NavLink = { label: string; href: string; mega?: boolean };

const navLinks: readonly NavLink[] = [
  { label: 'Lo Studio', href: '/studio' },
  { label: 'Aree', href: '/aree-di-competenza', mega: true },
  { label: 'Guide', href: '/guide' },
  { label: 'Tariffe', href: '/tariffe' },
  { label: 'Contatti', href: '/contatti' },
];

const PRACTICE_AREAS = [
  {
    title: 'Diritto Civile',
    href: '/aree-di-competenza/diritto-civile',
    blurb: 'Contratti, obbligazioni, condominio, responsabilità.',
  },
  {
    title: 'Diritto di Famiglia',
    href: '/aree-di-competenza/diritto-famiglia',
    blurb: 'Separazioni, divorzi, affidamento, successioni.',
  },
  {
    title: 'Diritto del Lavoro',
    href: '/aree-di-competenza/diritto-lavoro',
    blurb: 'Licenziamenti, mobbing, vertenze sindacali.',
  },
  {
    title: 'Recupero Crediti',
    href: '/aree-di-competenza/recupero-crediti',
    blurb: 'Decreti ingiuntivi, pignoramenti, esecuzioni.',
  },
  {
    title: 'Diritto Immobiliare',
    href: '/aree-di-competenza/diritto-immobiliare',
    blurb: 'Compravendita, locazioni, usucapione.',
  },
  {
    title: 'Responsabilità Civile',
    href: '/aree-di-competenza/responsabilita-civile',
    blurb: 'Sinistri stradali, malasanità, danni.',
  },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 24);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  function openMega() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setMegaOpen(true);
  }

  function scheduleCloseMega() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 150);
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 inset-x-0 z-[var(--z-sticky)] transition-all duration-500',
          scrolled
            ? 'bg-paper/95 backdrop-blur-lg border-b border-rule/60'
            : 'bg-paper/0',
        )}
      >
        {/* Top-bar — phone, orari, IT/EN */}
        <div className="hidden md:block bg-paper-warm border-b border-rule/60">
          <div className="container-page">
            <div className="flex items-center justify-between h-9">
              <a
                href={`tel:${SITE_DATA.phoneTel}`}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-ink hover:text-cobalt transition-colors"
              >
                <Phone size={12} className="text-cobalt" aria-hidden />
                <span>{SITE_DATA.phoneDisplay}</span>
              </a>

              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-graphite">
                Studio aperto · {SITE_DATA.hours.short}
              </span>

              <span
                className="font-mono text-[11px] tracking-[0.12em] text-graphite select-none"
                aria-label="Lingua del sito (italiano)"
              >
                <span className="text-ink">IT</span>
                <span className="mx-1 text-rule">/</span>
                <span aria-hidden>EN</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main row */}
        <div className="container-page">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logotype + sottotitolo */}
            <Link
              href="/"
              className="group flex flex-col gap-1"
              aria-label="Studio Legale Miotti — homepage"
            >
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite hidden sm:inline">
                  Studio Legale
                </span>
                <span className="font-display text-2xl tracking-[0.18em] text-ink group-hover:text-cobalt transition-colors">
                  MIOTTI
                </span>
              </span>
              <span className="hidden sm:block font-mono text-[9px] uppercase tracking-[0.2em] text-graphite">
                Studio Legale · Avvocato in Verona
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-10"
              aria-label="Navigazione principale"
            >
              {navLinks.map((link) =>
                link.mega ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                  >
                    <Link
                      href={link.href as never}
                      onFocus={openMega}
                      onBlur={scheduleCloseMega}
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      className="text-sm font-medium text-ink hover:text-cobalt transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-cobalt origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </Link>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href as never}
                    className="text-sm font-medium text-ink hover:text-cobalt transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-cobalt origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </Link>
                ),
              )}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="/prenota"
                className="hidden md:inline-flex btn-primary !py-2.5 !text-sm"
              >
                Prenota
              </Link>
              <button
                type="button"
                className="lg:hidden p-2 -mr-2"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Chiudi menu' : 'Apri menu'}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega-menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={openMega}
              onMouseLeave={scheduleCloseMega}
              className="hidden lg:block absolute top-full left-0 right-0 bg-paper border-b border-rule shadow-[0_24px_48px_rgba(15,34,64,0.08)]"
              role="menu"
            >
              <div className="container-page py-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-graphite mb-8">
                  Aree di competenza
                </p>
                <ul className="grid grid-cols-12 gap-x-[var(--gutter)] gap-y-8">
                  {PRACTICE_AREAS.map((area) => (
                    <li key={area.href} className="col-span-4">
                      <Link
                        href={area.href as never}
                        onClick={() => setMegaOpen(false)}
                        className="group block border-l-2 border-transparent pl-4 -ml-[18px] hover:border-cobalt transition-colors"
                      >
                        <p className="font-display text-[20px] leading-tight text-ink group-hover:text-cobalt transition-colors">
                          {area.title}
                        </p>
                        <p className="mt-1 text-[13px] text-graphite leading-snug">
                          {area.blurb}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 pt-6 border-t border-rule">
                  <Link
                    href="/aree-di-competenza"
                    onClick={() => setMegaOpen(false)}
                    className="link-inline text-sm"
                  >
                    Vedi tutte le aree di competenza →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu overlay */}
      <motion.div
        id="mobile-menu"
        initial={false}
        animate={
          open
            ? { opacity: 1, pointerEvents: 'auto' }
            : { opacity: 0, pointerEvents: 'none' }
        }
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[var(--z-overlay)] bg-paper lg:hidden"
        aria-hidden={!open}
      >
        <div className="container-page pt-24 pb-12 h-full flex flex-col">
          <nav className="flex-1" aria-label="Navigazione mobile">
            <ul className="space-y-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: open ? 0.1 + i * 0.05 : 0,
                  }}
                >
                  <Link
                    href={link.href as never}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-display text-3xl border-b border-rule"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <Link
            href="/prenota"
            onClick={() => setOpen(false)}
            className="btn-primary w-full justify-center mt-8"
          >
            Prenota un primo confronto
          </Link>
        </div>
      </motion.div>
    </>
  );
}
