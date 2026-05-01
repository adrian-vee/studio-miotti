'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Lo Studio', href: '/studio' },
  { label: 'Aree', href: '/aree-di-competenza' },
  { label: 'Guide', href: '/guide' },
  { label: 'Tariffe', href: '/tariffe' },
  { label: 'Contatti', href: '/contatti' },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 24);
  });

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 inset-x-0 z-[var(--z-sticky)] transition-all duration-500',
          scrolled
            ? 'bg-paper/90 backdrop-blur-lg border-b border-rule/60'
            : 'bg-transparent',
        )}
      >
        <div className="container-page">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logotype */}
            <Link href="/" className="group flex items-baseline gap-3" aria-label="Studio Legale Miotti — homepage">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite hidden sm:inline">
                Studio Legale
              </span>
              <span className="font-display text-2xl tracking-[0.18em] text-ink group-hover:text-cobalt transition-colors">
                MIOTTI
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-10" aria-label="Navigazione principale">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as never}
                  className="text-sm font-medium text-ink hover:text-cobalt transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-cobalt origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-4">
              <Link href="/prenota" className="hidden md:inline-flex btn-primary !py-2.5 !text-sm">
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
      </motion.header>

      {/* Mobile menu overlay */}
      <motion.div
        id="mobile-menu"
        initial={false}
        animate={open ? { opacity: 1, pointerEvents: 'auto' } : { opacity: 0, pointerEvents: 'none' }}
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
                  animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: open ? 0.1 + i * 0.05 : 0 }}
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
