/**
 * Dati anagrafici e contatti dello Studio.
 *
 * I valori `null` indicano campi che l'avvocato non ha ancora fornito:
 * i componenti devono nasconderli o degradare elegantemente, MAI rendere
 * la stringa "null" o segnaposto a schermo.
 */

export const SITE_DATA = {
  // ─── Identità ───────────────────────────────────────────────
  legalName: 'Avv. Massimiliano Miotti',
  brandName: 'Studio Legale Miotti',
  tagline: 'Diritto come dialogo, non come distanza.',

  // ─── Contatti ───────────────────────────────────────────────
  phone: '+39 045 9586116',
  phoneTel: '+390459586116',
  phoneDisplay: '045 95 86 116',
  email: null as string | null, // {{TODO_EMAIL}}
  pec: null as string | null, // {{TODO_PEC}}

  // ─── Sede ───────────────────────────────────────────────────
  address: {
    street: 'Via S. Giovanni Bosco, 29/E',
    cap: '37047',
    city: 'San Bonifacio',
    province: 'VR',
  },
  geo: { lat: 45.3919, lng: 11.2747 },

  // ─── Orari ──────────────────────────────────────────────────
  hours: {
    short: 'Lun–Ven · 9–13 / 15–19',
    long: 'Lun–Ven · 9:00–13:00 / 15:00–19:00',
  },

  // ─── Anagrafica fiscale & professionale ─────────────────────
  cf: 'MTTMSM75D07H783Q',
  piva: null as string | null, // {{TODO_PIVA}}
  barNumber: null as string | null, // {{TODO_BAR_NUMBER}}
  barYear: null as string | null, // {{TODO_BAR_YEAR}}
  languages: null as string | null, // {{TODO_LANGUAGES}}

  // ─── Bio (paragrafi narrativi pagina /studio) ──────────────
  bio: {
    intro: null as string | null, // {{TODO_BIO_INTRO}}
    formazione: null as string | null, // {{TODO_BIO_FORMAZIONE}}
    esperienza: null as string | null, // {{TODO_BIO_ESPERIENZA}}
    filosofia: null as string | null, // {{TODO_BIO_FILOSOFIA}}
  },

  // ─── Booking esterno ───────────────────────────────────────
  calendlyUrl: null as string | null, // {{TODO_CALENDLY_URL}}
} as const;

export type SiteData = typeof SITE_DATA;
