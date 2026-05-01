import { cn } from '@/lib/utils';

type Numeral = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

interface Props {
  numeral: Numeral;
  label: string;
  align?: 'left' | 'right';
  variant?: 'light' | 'dark';
}

/**
 * SectionMarker — numerale romano decorativo per ogni sezione editoriale.
 *
 * - position absolute, dentro al <section> (che deve essere relative)
 * - z-index 0 → sempre dietro al contenuto
 * - pointer-events none → mai cliccabile
 * - hidden su mobile (< md)
 *
 * variant 'dark' su sezioni bg scuro: numerale + label color paper
 * con opacità basse, perché su graphite scuro (bg-ink, bg-cobalt-deep)
 * il graphite stesso si fonde col fondo e diventa invisibile.
 */
export function SectionMarker({
  numeral,
  label,
  align = 'right',
  variant = 'light',
}: Props) {
  const isDark = variant === 'dark';

  // Numerale: chiaro su dark, paper-warm su light.
  const numeralColor = isDark ? 'rgb(var(--color-paper))' : 'rgb(var(--color-paper-warm))';
  const numeralOpacity = isDark ? 0.08 : 0.5;

  // Label: paper soft su dark, graphite pieno su light.
  const labelColor = isDark ? 'rgb(var(--color-paper))' : 'rgb(var(--color-graphite))';
  const labelOpacity = isDark ? 0.5 : 1;

  return (
    <aside
      aria-hidden
      className={cn(
        'hidden md:flex flex-col pointer-events-none select-none',
        'absolute top-8 z-0',
        align === 'right' ? 'right-8 items-end text-right' : 'left-8 items-start text-left',
      )}
    >
      <span
        className="font-display leading-none"
        style={{
          fontSize: 'clamp(48px, 6vw, 88px)',
          fontWeight: 300,
          color: numeralColor,
          opacity: numeralOpacity,
        }}
      >
        {numeral}
      </span>
      <span
        className="mt-2 font-mono uppercase"
        style={{
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: labelColor,
          opacity: labelOpacity,
        }}
      >
        {label}
      </span>
    </aside>
  );
}
