import { cn } from '@/lib/utils';

type Numeral = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';

interface Props {
  numeral: Numeral;
  label: string;
  align?: 'left' | 'right';
  variant?: 'light' | 'dark';
  /** Se false, renderizza solo il numerale (utile quando la sezione
   *  è già identificata da un eyebrow o cap label). Default: true. */
  showLabel?: boolean;
  /** Override delle classi Tailwind di posizione (es. "top-6 left-4")
   *  per casi in cui i default top-8/right-8/left-8 collidono col contenuto. */
  className?: string;
}

/**
 * SectionMarker — numerale romano decorativo per ogni sezione editoriale.
 *
 * - position absolute, dentro al <section> (che deve essere relative)
 * - z-index 0 → sempre dietro al contenuto
 * - pointer-events none → mai cliccabile
 * - hidden su mobile (< md)
 *
 * variant 'dark' su sezioni bg scuro: numerale watermark + label
 * paper @ 0.85 (leggibile su graphite scuro).
 */
export function SectionMarker({
  numeral,
  label,
  align = 'right',
  variant = 'light',
  showLabel = true,
  className,
}: Props) {
  const isDark = variant === 'dark';

  // Numerale: chiaro discreto su dark, paper-warm soft su light.
  const numeralColor = isDark ? 'rgb(var(--color-paper))' : 'rgb(var(--color-paper-warm))';
  const numeralOpacity = isDark ? 0.1 : 0.5;

  // Label: paper @ 0.85 su dark (leggibile), graphite pieno su light.
  const labelColor = isDark ? 'rgb(var(--color-paper))' : 'rgb(var(--color-graphite))';
  const labelOpacity = isDark ? 0.85 : 1;

  return (
    <aside
      aria-hidden
      className={cn(
        'hidden md:flex flex-col pointer-events-none select-none',
        'absolute top-8 z-0',
        align === 'right' ? 'right-8 items-end text-right' : 'left-8 items-start text-left',
        className,
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
      {showLabel && (
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
      )}
    </aside>
  );
}
