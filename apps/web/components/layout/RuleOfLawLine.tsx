'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const ANCHORS = [
  { id: 'hero', numeral: 'I', label: 'Studio', top: '16%' },
  { id: 'manifesto', numeral: 'II', label: 'Manifesto', top: '32%' },
  { id: 'aree', numeral: 'III', label: 'Aree', top: '48%' },
  { id: 'metodo', numeral: 'IV', label: 'Metodo', top: '64%' },
  { id: 'risorse', numeral: 'V', label: 'Risorse', top: '80%' },
  { id: 'contatti', numeral: 'VI', label: 'Contatti', top: '96%' },
] as const;

/**
 * RuleOfLawLine — sottile filetto verticale fisso a sinistra del viewport.
 *
 * Visibilità soft: la linea + i 6 tick sono sempre presenti ma molto
 * smorzati; solo la label della sezione corrente è visibile (le altre
 * 5 sono opacità 0 → niente rumore visivo, niente sovrapposizione col
 * logo MIOTTI o col § dell'hero).
 *
 * - hidden < xl (1280px) → laptop 13" non lo vedono
 * - z-index 1 → DIETRO al wordmark/logo
 * - left: 32px → fuori dal container-page
 * - label orizzontali (mai ruotate) sotto il tick, solo l'attiva visibile
 */
export function RuleOfLawLine() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hasAnchors, setHasAnchors] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sections = ANCHORS.map(({ id }) =>
      document.querySelector<HTMLElement>(`[data-rule-anchor="${id}"]`),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      setHasAnchors(false);
      return;
    }
    setHasAnchors(true);

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute('data-rule-anchor');
          if (!id) continue;
          visibility.set(id, entry.intersectionRatio);
        }

        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            bestId = id;
            bestRatio = ratio;
          }
        }
        if (bestId) setActiveId(bestId);
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const section of sections) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  if (!hasAnchors) return null;

  return (
    <aside
      aria-hidden
      className="hidden xl:block fixed top-0 bottom-0 pointer-events-none"
      style={{ left: '32px', width: '1px', zIndex: 1 }}
    >
      <div
        className="absolute top-0 bottom-0 left-0 w-px bg-ink"
        style={{ opacity: 0.15 }}
      />

      <ul className="absolute top-0 bottom-0 left-0">
        {ANCHORS.map((anchor) => {
          const active = activeId === anchor.id;
          return (
            <li
              key={anchor.id}
              className="absolute -translate-y-1/2"
              style={{ top: anchor.top, left: 0 }}
            >
              {/* Tick */}
              <span
                className={cn(
                  'block h-px bg-ink transition-opacity duration-200 motion-reduce:transition-none',
                )}
                style={{
                  width: '12px',
                  opacity: active ? 1 : 0.3,
                }}
              />

              {/* Label — orizzontale, sotto al tick, visibile solo se attiva */}
              <span
                className={cn(
                  'absolute font-mono whitespace-nowrap text-cobalt uppercase',
                  'transition-opacity duration-200 motion-reduce:transition-none',
                )}
                style={{
                  top: '12px',
                  left: '6px',
                  transform: 'translateX(-50%)',
                  fontSize: '9px',
                  letterSpacing: '0.16em',
                  opacity: active ? 1 : 0,
                }}
              >
                {anchor.numeral} · {anchor.label}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
