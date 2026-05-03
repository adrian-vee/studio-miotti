'use client';

/**
 * hooks/useGsapReveal — reveal scroll-triggered standardizzato.
 *
 * - Registra ScrollTrigger una sola volta.
 * - Usa gsap.context() ⇒ cleanup automatico al unmount.
 * - Rispetta prefers-reduced-motion (skippa l'animazione, mostra contenuto).
 * - Pattern compatibile React 19 / Next 15.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ensureGsap, prefersReducedMotion, staggerReveal } from '@/lib/animations';

export interface UseGsapRevealOptions {
  /** Selector dei figli da animare (default: '[data-reveal]') */
  selector?: string;
  /** Y di partenza (px). Default: 28 */
  y?: number;
  /** Stagger (s). Default: 0.08 */
  stagger?: number;
  /** Trigger start. Default: 'top 80%' */
  start?: string;
  /** Disabilita */
  disabled?: boolean;
}

export function useGsapReveal<T extends HTMLElement = HTMLElement>(
  options: UseGsapRevealOptions = {},
) {
  const ref = useRef<T>(null);
  const {
    selector = '[data-reveal]',
    y = 28,
    stagger = 0.08,
    start = 'top 80%',
    disabled = false,
  } = options;

  useEffect(() => {
    if (disabled) return;
    const root = ref.current;
    if (!root) return;
    const g = ensureGsap();
    if (!g) return;

    const ctx = gsap.context(() => {
      const targets = root.querySelectorAll(selector);
      if (targets.length === 0) return;

      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root,
            start,
            once: true,
          },
        },
      );
    }, root);

    return () => {
      ctx.revert();
    };
  }, [selector, y, stagger, start, disabled]);

  return ref;
}

/**
 * useGsapContext — alias generico se servono animazioni custom.
 * Esempio:
 *   const ref = useGsapContext<HTMLElement>((self) => {
 *     gsap.from('.thing', { y: 40, opacity: 0 });
 *   });
 */
export function useGsapContext<T extends HTMLElement = HTMLElement>(
  cb: (self: gsap.Context) => void,
  deps: React.DependencyList = [],
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    ensureGsap();
    const ctx = gsap.context(cb, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

/** Re-export utility helper per chi usa l'hook. */
export { staggerReveal, ScrollTrigger };
