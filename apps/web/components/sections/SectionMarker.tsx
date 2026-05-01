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
 * variant 'dark' usato su sezioni con bg scuro (ApproachTimeline,
 * ContactCTA): graphite + opacity più bassa per non bucare il colore.
 */
export function SectionMarker({
  numeral,
  label,
  align = 'right',
  variant = 'light',
}: Props) {
  return (
    <aside
      aria-hidden
      className={cn(
        'hidden md:flex flex-col items-end pointer-events-none select-none',
        'absolute top-12 z-0',
        align === 'right' ? 'right-12 items-end text-right' : 'left-12 items-start text-left',
      )}
    >
      <span
        className={cn(
          'font-display leading-none',
          variant === 'dark' ? 'text-graphite/25' : 'text-paper-warm/50',
        )}
        style={{
          fontSize: 'clamp(80px, 10vw, 140px)',
          fontWeight: 300,
        }}
      >
        {numeral}
      </span>
      <span
        className={cn(
          'mt-2 font-mono uppercase',
          variant === 'dark' ? 'text-paper/40' : 'text-graphite',
        )}
        style={{
          fontSize: '9px',
          letterSpacing: '0.2em',
        }}
      >
        {label}
      </span>
    </aside>
  );
}
