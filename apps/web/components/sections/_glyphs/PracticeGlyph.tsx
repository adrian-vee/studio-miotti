/**
 * PracticeGlyph — icone lineari custom (1.25 stroke) per le aree di attività.
 *
 * Disegnate a mano, non importate da set generici, per un look editoriale
 * coerente con il resto del sito (filetti sottili, oro/cobalt). Tutte
 * usano `currentColor` per ereditare il colore del wrapper.
 */

import * as React from 'react';

export type GlyphName =
  | 'scale'
  | 'pen'
  | 'pillar'
  | 'briefcase'
  | 'tree'
  | 'building'
  | 'gavel'
  | 'shield';

const STROKE = 1.25;

interface Props extends React.SVGProps<SVGSVGElement> {
  name: GlyphName | string;
  size?: number;
}

export function PracticeGlyph({ name, size = 18, ...rest }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: STROKE,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    ...rest,
  };

  switch (name) {
    case 'scale':
      return (
        <svg {...common}>
          <path d="M12 4v15" />
          <path d="M5 19h14" />
          <path d="M5 8h14" />
          <path d="M5 8l-2 5h4l-2-5z" />
          <path d="M19 8l-2 5h4l-2-5z" />
        </svg>
      );
    case 'pen':
      return (
        <svg {...common}>
          <path d="M14 4l6 6L9 21l-6 1 1-6L14 4z" />
          <path d="M13 5l6 6" />
        </svg>
      );
    case 'pillar':
      return (
        <svg {...common}>
          <path d="M4 5h16" />
          <path d="M4 19h16" />
          <path d="M7 5v14" />
          <path d="M12 5v14" />
          <path d="M17 5v14" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="1.5" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          <path d="M3 13h18" />
        </svg>
      );
    case 'tree':
      return (
        <svg {...common}>
          <path d="M12 3v18" />
          <path d="M12 8c-3 0-5-2-5-5" />
          <path d="M12 8c3 0 5-2 5-5" />
          <path d="M12 14c-4 0-7-2-7-6" />
          <path d="M12 14c4 0 7-2 7-6" />
        </svg>
      );
    case 'building':
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="1" />
          <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
          <path d="M10 21v-3h4v3" />
        </svg>
      );
    case 'gavel':
      return (
        <svg {...common}>
          <path d="M14 4l6 6" />
          <path d="M9 9l6 6" />
          <path d="M5 13l6 6" />
          <path d="M16 6l4-4" />
          <path d="M3 21h10" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
          <path d="M9.5 12.5L11 14l3.5-3.5" />
        </svg>
      );
    default:
      return null;
  }
}
