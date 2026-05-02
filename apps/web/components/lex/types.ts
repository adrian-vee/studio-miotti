export type LexRole = 'user' | 'assistant';

export type LexOutcome =
  | 'lead_captured'
  | 'booking_requested'
  | 'no_action'
  | 'escalated_human';

export type LexAttachmentStatus = 'uploading' | 'ready' | 'error';

export interface LexAttachment {
  id: string; // uuid client-side
  name: string;
  type: string; // mime
  size: number;
  base64?: string; // popolato dopo upload
  status: LexAttachmentStatus;
  error?: string;
}

export interface LexSessionContext {
  userName?: string;
  legalArea?: string;
  urgency?: string;
  documentsAnalyzed?: string[];
}

export interface LexMsg {
  id: string;
  role: LexRole;
  content: string;
  ts: number;
  /** allegati inviati con questo messaggio (solo lato user) */
  attachments?: LexAttachment[];
  /** true mentre lo stream sta ancora scrivendo questa bubble */
  streaming?: boolean;
  /** true se la richiesta è inviata ma non è arrivato ancora alcun chunk */
  pending?: boolean;
}

export type LexStreamEvent =
  | { type: 'text'; value: string }
  | { type: 'tool'; name: string; outcome: LexOutcome }
  | { type: 'context_update'; context: Partial<LexSessionContext> }
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
