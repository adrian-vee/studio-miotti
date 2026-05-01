export type LexRole = 'user' | 'assistant';

export type LexOutcome =
  | 'lead_captured'
  | 'booking_requested'
  | 'no_action'
  | 'escalated_human';

export interface LexMsg {
  id: string;
  role: LexRole;
  content: string;
  ts: number;
  /** true mentre lo stream sta ancora scrivendo questa bubble */
  streaming?: boolean;
  /** true se la richiesta è inviata ma non è arrivato ancora alcun chunk */
  pending?: boolean;
}

export type LexStreamEvent =
  | { type: 'text'; value: string }
  | { type: 'tool'; name: string; outcome: LexOutcome }
  | { type: 'error'; message: string }
  | {
      type: 'done';
      outcome: LexOutcome;
      lead_id: string | null;
      session_id: string;
    };

export interface LexToastData {
  id: string;
  variant: 'success' | 'warn';
  text: string;
  cta?: { label: string; href: string };
}
