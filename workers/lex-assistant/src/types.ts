export interface Env {
  // Vars
  SUPABASE_URL: string;
  ALLOWED_ORIGINS: string;

  // Secrets (configurati via wrangler secret)
  ANTHROPIC_API_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  RESEND_API_KEY?: string;

  // KV
  RATE_LIMIT: KVNamespace;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type LegalArea =
  | 'famiglia'
  | 'civile'
  | 'lavoro'
  | 'crediti'
  | 'immobiliare'
  | 'responsabilita'
  | 'altro';

export type Urgency = 'alta' | 'media' | 'bassa';

export interface SessionContext {
  userName?: string;
  legalArea?: LegalArea;
  urgency?: Urgency;
  documentsAnalyzed?: string[];
}

export interface Attachment {
  name: string;
  type: string; // mime type
  base64: string;
}

export interface ChatRequest {
  session_id: string;
  messages: ChatMessage[];
  sessionContext?: SessionContext;
  attachments?: Attachment[];
}

export type Outcome =
  | 'lead_captured'
  | 'booking_requested'
  | 'no_action'
  | 'escalated_human';

export interface ChatResponse {
  reply: string;
  outcome?: Outcome;
  session_id: string;
}
