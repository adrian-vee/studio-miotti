/**
 * lib/site-data.ts
 *
 * Sorgente unica per dati anagrafici, contatti e contenuti strutturali
 * della home (aree di attività, metodo, risorse).
 *
 * Convenzioni:
 *  · `null` = campo da fornire dall'avvocato. UI non deve renderlo.
 *  · slug   = path interno (sempre kebab-case, no caratteri accentati).
 */

// ─── Anagrafica & contatti ────────────────────────────────────────
export const SITE_DATA = {
  legalName: 'Avv. Massimiliano Miotti',
  brandName: 'Studio Legale Miotti',
  tagline: 'Soluzioni legali concrete per imprese e privati.',

  phone: '+39 045 9586116',
  phoneTel: '+390459586116',
  phoneDisplay: '045 95 86 116',
  email: null as string | null,
  pec: null as string | null,

  address: {
    street: 'Via S. Giovanni Bosco, 29/E',
    cap: '37047',
    city: 'San Bonifacio',
    province: 'VR',
    country: 'IT',
  },
  geo: { lat: 45.3919, lng: 11.2747 },

  hours: {
    short: 'Lun–Ven · 9–13 / 15–19',
    long: 'Lun–Ven · 9:00–13:00 / 15:00–19:00',
  },

  cf: 'MTTMSM75D07H783Q',
  piva: null as string | null,
  barNumber: null as string | null,
  barYear: null as string | null,
  languages: null as string | null,

  bio: {
    intro: null as string | null,
    formazione: null as string | null,
    esperienza: null as string | null,
    filosofia: null as string | null,
  },

  calendlyUrl: null as string | null,
} as const;

// ─── Navigazione principale ───────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Studio', href: '/studio' },
  { label: 'Aree di attività', href: '/aree-di-competenza' },
  { label: 'Metodo', href: '/#metodo' },
  { label: 'Innovazione', href: '/#innovazione' },
  { label: 'Risorse', href: '/guide' },
  { label: 'Contatti', href: '/contatti' },
] as const;

// ─── Credibilità (4 card statement) ───────────────────────────────
export const CREDIBILITY = [
  {
    title: 'Risposta in 24–48 ore',
    body: 'Tempi di prima risposta sempre comunicati. Nessuna pratica resta in silenzio: sai cosa succede, anche quando non succede ancora niente.',
  },
  {
    title: 'Linguaggio chiaro',
    body: 'Spieghiamo cosa rischi, cosa puoi ottenere e cosa serve da te. Niente formule, niente ambiguità: capisci ogni passaggio.',
  },
  {
    title: 'Sede a San Bonifacio',
    body: 'Studio fisico nella Bassa Veronese, in dialogo costante con tribunali e clienti del territorio. Si lavora di persona quando serve.',
  },
  {
    title: 'Stesso metodo per tutti',
    body: 'Privato o impresa, pratica piccola o complessa: stesso ordine, stesso modo di aggiornare. Continuità e riservatezza fin dal primo contatto.',
  },
] as const;

// ─── Aree di attività ─────────────────────────────────────────────
export const PRACTICE_AREAS = [
  {
    slug: 'recupero-crediti',
    title: 'Recupero crediti',
    body: 'Solleciti, decreti ingiuntivi, esecuzioni: percorso di riscossione che parte sempre da una valutazione di reale recuperabilità.',
    glyph: 'scale',
  },
  {
    slug: 'contratti-e-accordi',
    title: 'Contratti e accordi',
    body: 'Redazione, revisione e negoziazione di contratti civili e commerciali. Clausole chiare prima della firma, non dopo il contenzioso.',
    glyph: 'pen',
  },
  {
    slug: 'diritto-civile',
    title: 'Diritto civile',
    body: 'Risarcimento danni, responsabilità, locazioni, condominio. Tutela ordinaria con sguardo sulle conseguenze pratiche.',
    glyph: 'pillar',
  },
  {
    slug: 'diritto-del-lavoro',
    title: 'Diritto del lavoro',
    body: 'Licenziamenti, demansionamenti, contestazioni. Per lavoratori e per datori di lavoro che vogliono evitare il tribunale.',
    glyph: 'briefcase',
  },
  {
    slug: 'famiglia-e-successioni',
    title: 'Famiglia e successioni',
    body: 'Separazioni, divorzi, accordi di convivenza, eredità e tutela dei minori. Riservatezza assoluta, soluzioni che durano.',
    glyph: 'tree',
  },
  {
    slug: 'imprese-e-professionisti',
    title: 'Imprese e professionisti',
    body: 'Assistenza ricorrente per PMI: contrattualistica, recupero, gestione fornitori, controversie. Come avere un legale in azienda.',
    glyph: 'building',
  },
  {
    slug: 'contenzioso',
    title: 'Contenzioso',
    body: 'Quando la causa è inevitabile, strategia processuale costruita sulle prove disponibili e sull’obiettivo realistico.',
    glyph: 'gavel',
  },
  {
    slug: 'consulenza-preventiva',
    title: 'Consulenza preventiva',
    body: 'Pareri scritti, valutazione di operazioni, audit di rischio. Prevenire un problema costa una frazione di risolverlo.',
    glyph: 'shield',
  },
] as const;

// ─── Metodo (timeline 5 step) ────────────────────────────────────
export const METHOD_STEPS = [
  {
    n: '01',
    title: 'Analisi del caso',
    body: 'Primo colloquio, raccolta documenti, mappa delle posizioni. Nessuna strategia prima di aver capito i fatti.',
  },
  {
    n: '02',
    title: 'Strategia legale',
    body: 'Scenari realistici, costi attesi, tempi processuali. Si sceglie l’opzione che ha senso, non quella più aggressiva.',
  },
  {
    n: '03',
    title: 'Gestione operativa',
    body: 'Atti, udienze, trattative. Tu ricevi azioni, non titoli di paragrafo. Ogni passaggio passa dal cliente prima di essere depositato.',
  },
  {
    n: '04',
    title: 'Aggiornamenti costanti',
    body: 'Aggiornamento periodico via canale digitale dedicato. Niente silenzio, niente ricostruzioni a posteriori.',
  },
  {
    n: '05',
    title: 'Chiusura e prevenzione',
    body: 'Sentenza o accordo, e poi un’analisi di cosa fare per non tornarci. La pratica finisce con un appunto, non con una fattura.',
  },
] as const;

// ─── Differenziazione (perché scegliere lo Studio) ──────────────
export const DIFFERENTIATORS = [
  {
    n: '01',
    title: 'Risposta in 24–48 ore',
    body: 'Una richiesta non resta sospesa. Tempi di prima risposta sempre comunicati, senza dover sollecitare.',
  },
  {
    n: '02',
    title: 'Linguaggio chiaro, niente burocratese',
    body: 'Spieghiamo cosa rischi, cosa puoi ottenere e cosa serve da te. Senza espressioni che non capiresti.',
  },
  {
    n: '03',
    title: 'Pratiche gestite in digitale',
    body: 'Documenti, scadenze e aggiornamenti su un unico canale. Niente catene di email, niente carte perse.',
  },
  {
    n: '04',
    title: 'Costi indicati prima del mandato',
    body: 'Preventivo scritto prima di iniziare. Sai cosa pagherai, quando e per cosa. Niente parcelle a sorpresa.',
  },
  {
    n: '05',
    title: 'Avvocato titolare come referente',
    body: 'Parli sempre con l’Avv. Miotti, non con un sostituto diverso ogni volta. Un solo interlocutore, dall’inizio alla fine.',
  },
  {
    n: '06',
    title: 'Strategia orientata alla soluzione',
    body: 'Non si fa causa per principio. Valutiamo cosa conviene davvero al cliente, anche quando significa evitare il tribunale.',
  },
] as const;

// ─── Innovazione digitale (feature pill) ─────────────────────────
export const DIGITAL_FEATURES = [
  {
    label: 'Richieste digitali',
    body: 'Form intelligenti che indirizzano la pratica al canale giusto e raccolgono già i dati utili.',
  },
  {
    label: 'Documenti guidati',
    body: 'Checklist personalizzata per ogni tipo di pratica: sai esattamente cosa serve, fin dal primo giorno.',
  },
  {
    label: 'Promemoria automatici',
    body: 'Scadenze, udienze, pagamenti. Il sistema ricorda al cliente quello che serve, quando serve.',
  },
  {
    label: 'Knowledge base riservata',
    body: 'Area privata cliente: documenti, atti, note di aggiornamento sempre consultabili.',
  },
  {
    label: 'AI-ready architecture',
    body: 'Infrastruttura predisposta per l’assistente digitale LEX. Tecnologia al servizio della relazione.',
  },
] as const;

// ─── Risorse (cards SEO) ─────────────────────────────────────────
export const RESOURCE_CARDS = [
  {
    slug: 'recuperare-credito-primi-passi',
    category: 'Recupero crediti',
    title: 'Come recuperare un credito: i primi passi senza errori',
    excerpt:
      'Sollecito, messa in mora, decreto ingiuntivo: cosa fare e in che ordine prima di rivolgersi al tribunale.',
    readingTime: '6 min',
  },
  {
    slug: 'contratti-cosa-controllare',
    category: 'Contratti',
    title: 'Contratti: cosa controllare prima di firmare',
    excerpt:
      'Le sei clausole che ti fanno perdere causa o soldi. Una checklist breve, valida per ogni accordo commerciale.',
    readingTime: '5 min',
  },
  {
    slug: 'controversia-civile-quando-avvocato',
    category: 'Diritto civile',
    title: 'Quando rivolgersi a un avvocato per una controversia civile',
    excerpt:
      'I segnali che indicano che la trattativa diretta non basta più. Come capire quando aspettare costa più che agire.',
    readingTime: '7 min',
  },
] as const;

// ─── Tipi esposti ────────────────────────────────────────────────
export type SiteData = typeof SITE_DATA;
export type PracticeArea = (typeof PRACTICE_AREAS)[number];
export type MethodStep = (typeof METHOD_STEPS)[number];
export type ResourceCard = (typeof RESOURCE_CARDS)[number];
export type Differentiator = (typeof DIFFERENTIATORS)[number];
