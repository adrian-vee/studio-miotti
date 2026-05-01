'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { captureLead } from '@/lib/supabase';
import { trackEvent, getUtmParams } from '@/lib/analytics';

const schema = z.object({
  name: z.string().min(2, 'Inserisca il Suo nome'),
  email: z.string().email('Email non valida'),
  phone: z.string().optional(),
  area: z.string().optional(),
  message: z.string().min(20, 'Ci scriva almeno 20 caratteri'),
  honeypot: z.string().max(0).optional(),
  gdpr: z.literal(true, { errorMap: () => ({ message: 'Consenso obbligatorio' }) }),
  marketing: z.boolean().optional(),
});

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setStatus('submitting');

    const fd = new FormData(e.currentTarget);
    const raw = {
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone') || undefined,
      area: fd.get('area') || undefined,
      message: fd.get('message'),
      honeypot: fd.get('honeypot'),
      gdpr: fd.get('gdpr') === 'on',
      marketing: fd.get('marketing') === 'on',
    };

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[String(i.path[0])] = i.message;
      });
      setErrors(fieldErrors);
      setStatus('idle');
      return;
    }

    // Honeypot trap (anti-spam silenzioso)
    if (parsed.data.honeypot) {
      setStatus('success');
      return;
    }

    const utm = getUtmParams();
    const result = await captureLead({
      source: 'form_contact',
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      area_diritto: parsed.data.area,
      message: parsed.data.message,
      gdpr_consent: parsed.data.gdpr,
      marketing_consent: parsed.data.marketing,
      ...utm,
    });

    if (result.ok) {
      trackEvent('form_contact_submit', { area: parsed.data.area ?? 'unspecified' });
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-paper-warm border border-cobalt p-10 text-center">
        <CheckCircle2 size={32} className="text-cobalt mx-auto mb-4" />
        <h2 className="font-display text-2xl mb-2">Messaggio ricevuto</h2>
        <p className="text-graphite leading-relaxed max-w-md mx-auto">
          Le risponderemo entro 24 ore lavorative all'indirizzo che ci ha fornito.
          Per urgenze può chiamare lo studio al 045 95 86 116.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <header>
        <h2 className="font-display text-3xl mb-2">Scriva direttamente</h2>
        <p className="text-graphite text-sm">
          Anche solo per capire se la Sua è una questione che possiamo seguire noi.
          Ci risparmia, e ci fa risparmiare, tempo prezioso.
        </p>
      </header>

      {/* Honeypot — invisibile, anti-bot */}
      <input
        type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nome e cognome *" name="name" error={errors.name} required />
        <Field label="Email *" name="email" type="email" error={errors.email} required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Telefono" name="phone" type="tel" error={errors.phone} />
        <div>
          <label htmlFor="area" className="block text-xs uppercase tracking-[0.18em] text-graphite mb-2">
            Area di interesse
          </label>
          <select
            id="area"
            name="area"
            className="w-full px-4 py-3 bg-paper border border-rule focus:border-cobalt outline-none text-sm"
          >
            <option value="">— Seleziona —</option>
            <option value="diritto-civile">Diritto Civile</option>
            <option value="diritto-famiglia">Diritto di Famiglia</option>
            <option value="diritto-lavoro">Diritto del Lavoro</option>
            <option value="recupero-crediti">Recupero Crediti</option>
            <option value="diritto-immobiliare">Diritto Immobiliare</option>
            <option value="responsabilita-civile">Responsabilità Civile</option>
            <option value="altro">Altro / Non lo so</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs uppercase tracking-[0.18em] text-graphite mb-2">
          Descriva brevemente la situazione *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 bg-paper border border-rule focus:border-cobalt outline-none text-sm resize-none"
          placeholder="Anche poche righe vanno bene. Possiamo approfondire al telefono."
        />
        {errors.message && <p className="text-error text-xs mt-2">{errors.message}</p>}
      </div>

      <div className="space-y-3 pt-2">
        <label className="flex gap-3 text-xs leading-relaxed cursor-pointer">
          <input type="checkbox" name="gdpr" required className="mt-0.5 accent-cobalt" />
          <span className="text-graphite">
            Ho letto l'<a href="/privacy-policy" className="link-inline">informativa privacy</a> e
            acconsento al trattamento dei miei dati per rispondere a questa richiesta. *
          </span>
        </label>
        <label className="flex gap-3 text-xs leading-relaxed cursor-pointer">
          <input type="checkbox" name="marketing" className="mt-0.5 accent-cobalt" />
          <span className="text-graphite">
            Acconsento all'invio di newsletter con guide e aggiornamenti normativi.
            Posso disiscrivermi in ogni momento. (facoltativo)
          </span>
        </label>
        {errors.gdpr && <p className="text-error text-xs">{errors.gdpr}</p>}
      </div>

      {status === 'error' && (
        <div className="flex gap-3 bg-error/10 border border-error/40 p-4 text-sm text-error">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <p>
            Si è verificato un problema tecnico. La preghiamo di riprovare o
            telefonarci al 045 95 86 116.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary disabled:opacity-50 group"
      >
        <span>{status === 'submitting' ? 'Invio in corso…' : 'Invia richiesta'}</span>
        <Send size={14} className="transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-[0.18em] text-graphite mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={`w-full px-4 py-3 bg-paper border focus:outline-none text-sm transition-colors ${
          error ? 'border-error' : 'border-rule focus:border-cobalt'
        }`}
      />
      {error && <p className="text-error text-xs mt-2">{error}</p>}
    </div>
  );
}
