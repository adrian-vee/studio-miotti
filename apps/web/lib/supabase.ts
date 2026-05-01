import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

/**
 * Client Supabase per uso lato browser.
 * Le RLS policies proteggono i dati: la anon key può solo INSERT su leads/subscribers,
 * mai SELECT su tabelle sensibili.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(url, anonKey, {
  auth: { persistSession: false }, // sito pubblico, no sessioni utente
});

/**
 * Insert nuovo lead (form contatti, lead magnet, newsletter).
 */
export async function captureLead(input: {
  source: 'form_contact' | 'lex_assistant' | 'newsletter' | 'lead_magnet';
  name?: string;
  email: string;
  phone?: string;
  area_diritto?: string;
  message?: string;
  gdpr_consent: boolean;
  marketing_consent?: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}) {
  const { error } = await supabase.from('leads').insert({
    ...input,
    gdpr_consent_at: input.gdpr_consent ? new Date().toISOString() : null,
  });
  return { ok: !error, error };
}

/**
 * Insert subscriber alla newsletter (double opt-in via email).
 */
export async function subscribeNewsletter(email: string, tags: string[] = []) {
  const { error } = await supabase
    .from('subscribers')
    .upsert({ email, tags }, { onConflict: 'email' });
  return { ok: !error, error };
}
