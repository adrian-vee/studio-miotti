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
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  // La home ha sequenza narrativa scuro→chiaro→scuro: l'header in cima
  // sta sopra il blu notte. Quando l'utente non ha ancora scrollato,
  // serve testo paper (chiaro su scuro). Allo scroll torna paper-aware.
  const isHomeDark = pathname === '/' && !scrolled;

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
            ? 'rgb(var(--color-vellum) / 0.82)'
            : 'rgb(var(--color-paper) / 0)',
          backdropFilter: scrolled ? 'saturate(140%) blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'saturate(140%) blur(14px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgb(var(--color-rule) / 0.08)'
            : '1px solid transparent',
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
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative inline-flex items-center text-[0.875rem] font-medium transition-colors"
                  style={{
                    color: isHomeDark
                      ? 'rgb(var(--color-paper) / 0.85)'
                      : 'rgb(var(--color-ink-soft))',
                  }}
                >
                  <span className="relative">
                    {link.label}
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
              ))}
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
