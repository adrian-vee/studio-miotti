# Studio Legale Miotti — Sito Web

> Sito web istituzionale dell'Avv. Massimiliano Miotti, San Bonifacio (VR).
> Progettato e sviluppato da Adrian Vee — adrianvee.dev

[![Deploy on GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-181717?logo=github)](https://github.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-000?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-95%2B-00C853)](https://developers.google.com/web/tools/lighthouse)

---

## ⚡ Quick Start

```bash
# 1. Setup workspace
pnpm install

# 2. Setup environment frontend
cp apps/web/.env.example apps/web/.env.local
# → editare con valori reali (Supabase, Worker URL, Plausible)

# 3. Dev server
pnpm --filter @miotti/web dev
# → http://localhost:3000

# 4. Build statica (verifica output GitHub Pages)
pnpm --filter @miotti/web build
pnpm --filter @miotti/web preview
```

### Setup Supabase
1. Crea progetto su [supabase.com](https://supabase.com) → Region: `eu-central-1` (Frankfurt)
2. SQL Editor → incolla `supabase/migrations/0001_init.sql`
3. Copia `Project URL` e `anon key` in `apps/web/.env.local`

### Setup Cloudflare Worker (Lex assistant)
```bash
cd workers/lex-assistant
pnpm install

# Crea KV namespace per rate limiting
pnpm exec wrangler kv:namespace create RATE_LIMIT
# → copia l'id in wrangler.toml

# Configura secrets
pnpm exec wrangler secret put ANTHROPIC_API_KEY
pnpm exec wrangler secret put SUPABASE_SERVICE_ROLE_KEY

# Deploy
pnpm exec wrangler deploy --env production
```

### Deploy automatico
Push su `main` → GitHub Actions builda + deploya su Pages e Worker.

> ⚠️ **Workflow Adrian (MacBook ↔ Windows)**: prima di iniziare ogni sessione `git pull origin main`. A fine sessione `git push`. Sempre. Senza eccezioni.

---

## 🎯 Obiettivi del progetto

1. **Posizionamento premium**: comunicare professionalità e contemporaneità — l'opposto del classico sito legale italiano.
2. **Acquisizione clienti**: portare traffico organico (SEO locale) e convertirlo in consulenze.
3. **Automazione**: assistente AI per qualifica lead e prenotazione appuntamenti 24/7.
4. **Lead generation**: contenuti gratuiti scaricabili (guide legali) per costruire database email.
5. **Differenziazione**: design system, motion design e UX che nessun altro studio della zona ha.

## 🏗️ Architettura

```
┌─────────────────────────────────────────────────────────────┐
│  GITHUB PAGES (statico)                                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Next.js 15 — Static Export                           │  │
│  │ • App Router + TypeScript strict                     │  │
│  │ • Tailwind CSS v4 + design tokens "Lex Minimal"      │  │
│  │ • Motion (Framer) + GSAP ScrollTrigger + Lenis       │  │
│  │ • MDX per blog/guide legali                          │  │
│  │ • next-sitemap, schema.org JSON-LD                   │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────┬───────────────────────────┬──────────────────┘
               │                           │
               ▼                           ▼
┌──────────────────────────┐   ┌────────────────────────────┐
│ CLOUDFLARE WORKER         │   │ SUPABASE (EU/Frankfurt)    │
│ (free tier — 100k/giorno) │   │ • Lead capture (RLS)       │
│ • Proxy Claude API        │   │ • Newsletter subscribers   │
│ • Tool use per booking    │   │ • Booking richiesti        │
│ • Rate limiting           │   │ • GDPR-compliant           │
│ • Hide API key            │   └────────────────────────────┘
└──────────────────────────┘                │
               │                            │
               ▼                            ▼
        ┌─────────────────────────────────────────┐
        │ INTEGRAZIONI                            │
        │ • Resend → email transazionali          │
        │ • Calendly/Cal.com → calendario         │
        │ • n8n self-hosted → automazioni nurture │
        │ • Plausible Analytics → privacy-first   │
        └─────────────────────────────────────────┘
```

## 🎨 Design System — "Lex Minimal"

| Token              | Valore        | Uso                              |
| ------------------ | ------------- | -------------------------------- |
| `--ink`            | `#0E1116`     | Testo principale, headline       |
| `--paper`          | `#FAFAF7`    | Background dominante             |
| `--paper-warm`     | `#F1EDE3`    | Background sezioni alternate     |
| `--cobalt`         | `#1E3A5F`    | Accento primario, CTA            |
| `--cobalt-deep`    | `#0F2240`    | Accento hover, header scrolled   |
| `--graphite`       | `#3A3F47`    | Testo secondario                 |
| `--rule`           | `#D9D5C9`    | Divisori, bordi sottili          |
| `--gold-whisper`   | `#A8915C`    | Dettagli editoriali (uso minimo) |

**Tipografia:**
- Display: **Tiempos Headline** (Klim Type) — fallback: PT Serif
- Body: **Söhne** (Klim Type) — fallback: Inter
- Mono (per numeri legali, citazioni codice): **JetBrains Mono**

**Per fallback gratuiti** in fase prototipo: Fraunces (display) + Inter Tight (body), entrambi su Google Fonts.

## 📁 Struttura repo

```
studio-miotti/
├── apps/
│   └── web/                          # Next.js 15 frontend
│       ├── app/
│       │   ├── (marketing)/
│       │   │   ├── page.tsx          # Home
│       │   │   ├── studio/page.tsx   # Lo Studio
│       │   │   ├── aree/             # Aree di competenza
│       │   │   │   ├── page.tsx
│       │   │   │   ├── diritto-civile/page.tsx
│       │   │   │   ├── diritto-famiglia/page.tsx
│       │   │   │   ├── diritto-lavoro/page.tsx
│       │   │   │   └── ...
│       │   │   ├── guide/            # Blog/guide MDX
│       │   │   ├── contatti/page.tsx
│       │   │   └── prenota/page.tsx
│       │   ├── api/                  # NB: solo per dev locale, in prod → Worker
│       │   ├── layout.tsx
│       │   ├── robots.ts
│       │   └── sitemap.ts
│       ├── components/
│       │   ├── ui/                   # primitives shadcn
│       │   ├── sections/             # hero, services, testimonials, ...
│       │   ├── motion/               # animazioni riutilizzabili
│       │   ├── lex/                  # widget assistente AI
│       │   └── seo/                  # schema.org components
│       ├── content/
│       │   ├── guide/                # MDX guide legali (lead magnets)
│       │   └── faq/                  # FAQ per schema FAQPage
│       ├── lib/
│       │   ├── supabase.ts
│       │   ├── analytics.ts
│       │   ├── seo.ts
│       │   └── utils.ts
│       ├── public/
│       │   ├── fonts/
│       │   ├── og/                   # Open Graph images statiche
│       │   └── pdf/                  # Lead magnets PDF
│       ├── styles/
│       │   ├── globals.css
│       │   └── tokens.css
│       └── next.config.mjs           # output: 'export'
│
├── workers/
│   └── lex-assistant/                # Cloudflare Worker — AI proxy
│       ├── src/
│       │   ├── index.ts              # entry point
│       │   ├── claude.ts             # Claude API wrapper
│       │   ├── tools.ts              # tool definitions (booking, info)
│       │   └── rate-limit.ts
│       ├── wrangler.toml
│       └── package.json
│
├── supabase/
│   ├── migrations/
│   │   ├── 0001_init.sql
│   │   ├── 0002_leads.sql
│   │   └── 0003_bookings.sql
│   └── seed.sql
│
├── automations/
│   └── n8n/
│       ├── lead-nurture-sequence.json
│       └── booking-confirmation.json
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── CONTENT-PLAN.md               # 12 mesi editoriali
│   ├── SEO-STRATEGY.md
│   ├── BRAND-GUIDELINES.md
│   └── DEPLOYMENT.md
│
├── .github/
│   └── workflows/
│       └── deploy.yml                # CI/CD GitHub Pages
│
├── .gitignore
├── .editorconfig
├── package.json                      # workspace root (pnpm)
├── pnpm-workspace.yaml
└── README.md
```

## 🚀 Quick start

```bash
# Clone e install
git clone https://github.com/adrian-vee/studio-miotti.git
cd studio-miotti
pnpm install

# Copia env
cp apps/web/.env.example apps/web/.env.local
# Compila le variabili (vedi sezione sotto)

# Dev server
pnpm dev          # apre http://localhost:3000

# Build statico (per GitHub Pages)
pnpm build
pnpm export       # genera ./out

# Deploy Worker (assistente AI)
cd workers/lex-assistant
pnpm deploy       # via wrangler
```

## 🔐 Variabili d'ambiente

```bash
# apps/web/.env.local
NEXT_PUBLIC_SITE_URL=https://adrian-vee.github.io/studio-miotti
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_LEX_WORKER_URL=https://lex.username.workers.dev
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=studiomiotti.it

# workers/lex-assistant/.dev.vars
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_...
```

## 📈 SEO Strategy

Vedi `docs/SEO-STRATEGY.md` per il piano completo. Sintesi keyword principali:

**Primarie (San Bonifacio + Bassa Veronese):**
- avvocato san bonifacio
- studio legale san bonifacio
- avvocato bassa veronese
- avvocato civile verona
- consulenza legale san bonifacio

**Long-tail (transazionali, alto valore):**
- come fare separazione consensuale verona
- recupero crediti azienda san bonifacio
- avvocato divorzio verona costo
- impugnazione licenziamento verona
- usucapione immobile verona

**Informazionali (lead magnet):**
- guide legali gratuite
- modello diffida pagamento
- cosa fare dopo incidente stradale verona

## 🤖 Assistente "Lex"

Vedi `workers/lex-assistant/README.md`. Capabilities:
- Risponde a domande generali su aree di competenza
- Qualifica il caso (urgente / non urgente, area di diritto)
- Propone slot per prima consulenza (15 min gratuiti)
- Salva lead su Supabase
- Triggera email di conferma via Resend
- **Disclaimer obbligatorio**: non fornisce pareri legali vincolanti

## 📋 TODO al momento del kick-off con l'avvocato

Tutto ciò che è marcato `{{TODO_*}}` nel codice/contenuti è da completare con info reali:

- [ ] `{{TODO_BIO}}` — biografia avvocato (formazione, anni esperienza)
- [ ] `{{TODO_BAR_NUMBER}}` — numero iscrizione Albo Avvocati Verona
- [ ] `{{TODO_BAR_YEAR}}` — anno iscrizione albo
- [ ] `{{TODO_PEC}}` — indirizzo PEC
- [ ] `{{TODO_EMAIL}}` — email pubblica studio
- [ ] `{{TODO_SPECIALIZATIONS}}` — aree di competenza definitive
- [ ] `{{TODO_HOURS}}` — orari ricevimento esatti
- [ ] `{{TODO_PHOTO_HEADSHOT}}` — foto ritratto professionale
- [ ] `{{TODO_PHOTO_STUDIO}}` — foto interni studio (3-5)
- [ ] `{{TODO_TESTIMONIALS}}` — testimonianze clienti (anonimizzate)
- [ ] `{{TODO_LANGUAGES}}` — lingue di lavoro
- [ ] `{{TODO_FEES}}` — informazioni onorari (DM 55/2014)
- [ ] `{{TODO_PRIVACY_DPO}}` — eventuale DPO designato

## 📜 Licenza & Note legali

Codice sorgente: proprietario, all rights reserved fino a diverso accordo.
Contenuti istituzionali: di proprietà dell'Avv. Massimiliano Miotti.
Conformità: GDPR (Reg. UE 679/2016), CNF (Codice Deontologico Forense), DM 55/2014 (parametri compensi).
