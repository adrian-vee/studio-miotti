'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const ANCHORS = [
  { id: 'hero', numeral: 'I', label: 'Studio' },
  { id: 'manifesto', numeral: 'II', label: 'Manifesto' },
  { id: 'aree', numeral: 'III', label: 'Aree' },
  { id: 'metodo', numeral: 'IV', label: 'Metodo' },
  { id: 'risorse', numeral: 'V', label: 'Risorse' },
  { id: 'contatti', numeral: 'VI', label: 'Contatti' },
] as const;

/**
 * RuleOfLawLine — sottile filetto verticale fisso a sinistra del viewport.
 *
 * Renderizzato una sola volta in app/layout.tsx. Mostra un piccolo tick
 * + label per ogni sezione della home identificata via
 * data-rule-anchor="<id>". Il tick attivo (sezione corrente in viewport)
 * cambia colore.
 *
 * - hidden su < lg (1024px), per non interferire su mobile/tablet
 * - z-index 5: sotto al floating button di Lex
 * - i tick sono distribuiti uniformemente lungo la linea (no layout
 *   shift), l'IntersectionObserver determina solo quale è attivo
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

    // Tracker: quale sezione occupa la maggior parte del viewport.
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
        // multipli threshold per granularità nel decidere chi domina
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
      className="hidden lg:block fixed top-0 bottom-0 pointer-events-none"
      style={{ left: '48px', width: '1px', zIndex: 5 }}
    >
      <div
        className="absolute top-0 bottom-0 left-0 w-px bg-ink"
        style={{ opacity: 0.15 }}
      />

      <ul className="absolute top-0 bottom-0 left-0">
        {ANCHORS.map((anchor, i) => {
          const top = `${((i + 0.5) / ANCHORS.length) * 100}%`;
          const active = activeId === anchor.id;
          return (
            <li
              key={anchor.id}
              className="absolute -translate-y-1/2"
              style={{ top, left: 0 }}
            >
              <span
                className={cn(
                  'block h-px transition-colors duration-200 motion-reduce:transition-none',
                  active ? 'bg-cobalt' : 'bg-ink/60',
                )}
                style={{ width: '16px' }}
              />
              <span
                className={cn(
                  'absolute font-mono whitespace-nowrap transition-colors duration-200 motion-reduce:transition-none',
                  active ? 'text-cobalt opacity-100' : 'text-graphite opacity-70',
                )}
                style={{
                  top: '50%',
                  left: '24px',
                  transform: 'translateY(-50%) rotate(-90deg)',
                  transformOrigin: 'left center',
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
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
