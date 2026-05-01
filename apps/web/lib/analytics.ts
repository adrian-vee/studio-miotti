/**
 * Plausible Analytics — wrapper TypeScript.
 * Funziona solo se è caricato lo script <script defer data-domain="..." src="..."></script>
 * configurato in apps/web/app/layout.tsx (da aggiungere quando attiveremo plausible).
 */

type EventName =
  | 'cta_consulto_click'
  | 'form_contact_submit'
  | 'pdf_download'
  | 'lex_conversation_started'
  | 'lex_booking_requested'
  | 'phone_click'
  | 'whatsapp_click'
  | 'newsletter_signup';

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void;
  }
}

export function trackEvent(name: EventName, props?: Record<string, string | number>) {
  if (typeof window === 'undefined') return;
  if (typeof window.plausible !== 'function') return;
  window.plausible(name, props ? { props } : undefined);
}

/**
 * Estrae UTM params dall'URL corrente per attribuzione lead.
 */
export function getUtmParams() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') ?? undefined,
    utm_medium: params.get('utm_medium') ?? undefined,
    utm_campaign: params.get('utm_campaign') ?? undefined,
  };
}
