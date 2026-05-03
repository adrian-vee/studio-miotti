/**
 * lib/lex.ts — bus eventi per LEX (assistente digitale).
 *
 * Le CTA "Richiedi consulenza" / "Contatta lo studio" non puntano più
 * a una pagina, ma aprono il floating LEX modal con un contesto specifico.
 *
 * Pattern: window CustomEvent → LexFloatingButton ascolta e si apre.
 * Disaccoppia chi chiama dall'implementazione (potremo cambiarla quando
 * la chat reale sarà attiva, senza toccare le sezioni).
 */

export type LexOpenReason =
  | 'cta-hero'
  | 'cta-header'
  | 'cta-contact'
  | 'cta-soft-hint'
  | 'manual';

export interface LexOpenDetail {
  reason: LexOpenReason;
  /** Messaggio iniziale che LEX deve mostrare nel modal/chat. */
  intent?: string;
}

export const LEX_OPEN_EVENT = 'lex:open' as const;

/** Apre il modal LEX con un contesto opzionale. SSR-safe (no-op lato server). */
export function openLex(reason: LexOpenReason, intent?: string): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<LexOpenDetail>(LEX_OPEN_EVENT, {
      detail: { reason, intent },
    }),
  );
}
