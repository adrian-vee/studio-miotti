'use client';

/**
 * SiteHeader — sticky luminoso, minimal, premium.
 *
 *  · Compattazione allo scroll (riduce padding + applica vetro chiaro).
 *  · Underline animato sui link (ScaleX 0→1 origine sinistra).
 *  · CTA primaria con hover magnetico leggero (lib/animations).
 *  · Lang switch placeholder IT.
 *  · Mobile menu fullscreen con stagger reveal e blocco scroll body.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { NAV_LINKS, SITE_DATA } from '@/lib/site-data';
import { ensureGsap, magnetic, prefersReducedMotion } from '@/lib/animations';
import { openLex } from '@/lib/lex';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  // La home ha sequenza narrativa scuro→chiaro→scuro: l'header in cima
  // sta sopra il blu notte. Quando l'utente non ha ancora scrollato,
  // serve testo paper (chiaro su scuro). Allo scroll torna paper-aware.
  const isHomeDark = pathname === '/' && !scrolled;
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!ctaRef.current) return;
    return magnetic(ctaRef.current, 14);
  }, []);

  // Active section indicator (solo home): IntersectionObserver
  useEffect(() => {
    if (!isHome) {
      setActiveId(null);
      return;
    }
    const ids = ['metodo', 'aree', 'innovazione', 'contatti'];
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prendi l'ultima entry "intersecting" più vicina al top viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!mobileOpen) return;
    ensureGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-mobile-link]', {
        y: 32,
        opacity: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.05,
      });
    });
    return () => ctx.revert();
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        data-scrolled={scrolled}
        className="sticky top-0 z-[100] w-full transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? 'rgb(var(--color-vellum) / 0.78)'
            : 'rgb(var(--color-paper) / 0)',
          backdropFilter: scrolled ? 'saturate(180%) blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(18px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgb(var(--color-rule) / 0.10)'
            : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 0 0 rgb(var(--color-paper) / 0.6) inset, 0 8px 24px rgb(11 37 58 / 0.04)' : 'none',
        }}
      >
        <div className="container-page">
          <div
            className="flex items-center justify-between transition-[padding] duration-500"
            style={{ paddingBlock: scrolled ? '0.85rem' : '1.4rem' }}
          >
            {/* ── Logo ── */}
            <Link
              href="/"
              className="group flex items-baseline gap-3"
              aria-label="Studio Legale Miotti — home"
            >
              <span
                aria-hidden
                className="font-display"
                style={{
                  fontSize: '1.6rem',
                  lineHeight: 1,
                  fontStyle: 'italic',
                  color: isHomeDark ? 'rgb(var(--color-gold))' : 'rgb(var(--color-cobalt))',
                  transition: 'color 400ms var(--ease-out)',
                }}
              >
                §
              </span>
              <span className="leading-none">
                <span
                  className="block font-display"
                  style={{
                    fontSize: '1.05rem',
                    letterSpacing: '0.005em',
                    color: isHomeDark ? 'rgb(var(--color-paper))' : 'rgb(var(--color-ink))',
                    transition: 'color 400ms var(--ease-out)',
                  }}
                >
                  Studio Legale{' '}
                  <em
                    className="not-italic"
                    style={{
                      color: isHomeDark ? 'rgb(var(--color-gold))' : 'rgb(var(--color-cobalt))',
                    }}
                  >
                    Miotti
                  </em>
                </span>
                <span
                  className="mt-0.5 block font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{
                    color: isHomeDark
                      ? 'rgb(var(--color-paper) / 0.55)'
                      : 'rgb(var(--color-graphite))',
                    transition: 'color 400ms var(--ease-out)',
                  }}
                >
                  San Bonifacio · VR
                </span>
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <nav
              className="hidden items-center gap-8 lg:flex"
              aria-label="Navigazione principale"
            >
              {NAV_LINKS.map((link) => {
                // Detect attivo: link che punta a /#anchor di una sezione attiva
                const anchor = link.href.startsWith('/#') ? link.href.slice(2) : null;
                const isActive = isHome && anchor !== null && activeId === anchor;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className="group relative inline-flex items-center gap-2 text-[0.875rem] font-medium transition-colors"
                    style={{
                      color: isActive
                        ? isHomeDark
                          ? 'rgb(var(--color-gold))'
                          : 'rgb(var(--color-cobalt-deep))'
                        : isHomeDark
                          ? 'rgb(var(--color-paper) / 0.85)'
                          : 'rgb(var(--color-ink-soft))',
                    }}
                  >
                    {/* Dot oro per active */}
                    {isActive && (
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{
                          background: 'rgb(var(--color-gold))',
                          boxShadow: '0 0 0 3px rgb(198 168 107 / 0.18)',
                        }}
                      />
                    )}
                    <span className="relative">
                      {link.label}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left transition-transform duration-500 ease-out"
                        style={{
                          background: isHomeDark
                            ? 'rgb(var(--color-gold))'
                            : 'rgb(var(--color-cobalt))',
                          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                        }}
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                        style={{
                          background: isHomeDark
                            ? 'rgb(var(--color-gold))'
                            : 'rgb(var(--color-cobalt))',
                        }}
                      />
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* ── Right cluster ── */}
            <div className="hidden items-center gap-4 lg:flex">
              <button
                type="button"
                disabled
                title="Italiano (predefinito)"
                aria-label="Cambia lingua (solo italiano per ora)"
                className="cursor-default font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{
                  color: isHomeDark
                    ? 'rgb(var(--color-paper) / 0.55)'
                    : 'rgb(var(--color-graphite))',
                }}
              >
                IT
              </button>
              <span
                aria-hidden
                className="h-4 w-px"
                style={{ background: 'rgb(var(--color-rule) / 0.18)' }}
              />
              <button
                ref={ctaRef}
                type="button"
                onClick={() =>
                  openLex(
                    'cta-header',
                    'Da dove vuoi partire? Posso aiutarti a inquadrare la richiesta prima della consulenza con l’avvocato.',
                  )
                }
                className="btn-primary"
                style={
                  isHomeDark
                    ? {
                        padding: '0.7rem 1.25rem',
                        background: 'rgb(var(--color-gold))',
                        borderColor: 'rgb(var(--color-gold))',
                        color: 'rgb(var(--color-cobalt-deep))',
                      }
                    : { padding: '0.7rem 1.25rem' }
                }
              >
                Richiedi consulenza
              </button>
            </div>

            {/* ── Mobile toggle ── */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 lg:hidden"
              aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                color: isHomeDark ? 'rgb(var(--color-paper))' : 'rgb(var(--color-ink))',
              }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu fullscreen ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[1090] flex flex-col bg-vellum lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principale"
        >
          <div className="container-page flex items-center justify-between py-5">
            <span className="font-display text-cobalt italic text-2xl leading-none">§</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center p-2"
              aria-label="Chiudi menu"
            >
              <X size={22} />
            </button>
          </div>
          <nav
            className="container-page flex-1 overflow-y-auto pb-12 pt-6"
            aria-label="Navigazione mobile"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <li
                  key={link.href}
                  className="border-b"
                  style={{ borderColor: 'rgb(var(--color-rule) / 0.12)' }}
                  data-mobile-link
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-5 font-display text-3xl text-ink"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-graphite">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-4" data-mobile-link>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openLex(
                    'cta-header',
                    'Da dove vuoi partire? Posso aiutarti a inquadrare la richiesta prima della consulenza con l’avvocato.',
                  );
                }}
                className="btn-primary w-full"
              >
                Richiedi consulenza
              </button>
              <a
                href={`tel:${SITE_DATA.phoneTel}`}
                className="flex items-center justify-center gap-2 text-sm text-graphite"
              >
                <Phone size={14} />
                {SITE_DATA.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
