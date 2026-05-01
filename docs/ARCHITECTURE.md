# ARCHITECTURE.md — Studio Miotti

## Decisioni architetturali (ADR sintetici)

### ADR-001: Static Export su GitHub Pages
**Contesto:** vincolo iniziale del cliente, repo GitHub.
**Decisione:** Next.js 15 in modalità `output: 'export'` per generare HTML statico deployabile su GitHub Pages.
**Conseguenze:**
- ✅ Hosting gratis, CDN GitHub, SSL automatico
- ✅ Performance native (no cold start)
- ❌ No SSR/ISR, no API routes in produzione
- ❌ No middleware Next.js (rewrite/redirect lato server)
- 🔁 Backend dinamico delegato a Cloudflare Workers

**Migration path:** quando il dominio sarà acquisito, possibile switch a Vercel in 30 minuti senza modificare codice (basta togliere `output: 'export'` e abilitare basePath).

---

### ADR-002: Cloudflare Workers per AI assistant
**Contesto:** servono endpoint dinamici per chiamare Claude API senza esporre la key.
**Decisione:** Cloudflare Workers come BFF (Backend For Frontend).
**Alternative valutate:**
- Vercel Functions: legate al deploy frontend, sprecate se hosting su GitHub Pages
- AWS Lambda: complessità di setup, cold start
- Supabase Edge Functions: viable, ma Workers ha free tier più generoso (100k req/giorno vs 500k al mese)

**Stack Worker:** TypeScript, Hono.js (router minimal), `@anthropic-ai/sdk`.

---

### ADR-003: Supabase per persistenza
**Contesto:** servono lead capture, booking, newsletter, eventualmente CMS leggero.
**Decisione:** Supabase EU region (Frankfurt) — già nello stack di Adrian.
**Schema:**

```sql
-- Lead generation (form + assistente AI)
create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  source text not null check (source in ('form_contact','lex_assistant','newsletter','lead_magnet')),
  name text,
  email text,
  phone text,
  area_diritto text,
  message text,
  qualified_score int default 0,  -- scoring assistente AI 0-100
  status text default 'new' check (status in ('new','contacted','converted','lost')),
  gdpr_consent boolean not null default false,
  gdpr_consent_at timestamptz,
  marketing_consent boolean default false,
  ip_hash text,  -- hash IP per anti-spam, non IP raw (GDPR)
  utm_source text,
  utm_medium text,
  utm_campaign text
);

-- Bookings consulenze
create table bookings (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id),
  created_at timestamptz default now(),
  scheduled_at timestamptz not null,
  duration_min int default 30,
  type text check (type in ('first_consult_free','consult_paid','followup')),
  status text default 'pending' check (status in ('pending','confirmed','completed','cancelled','no_show')),
  notes text,
  meet_url text  -- se virtuale
);

-- Newsletter subscribers
create table subscribers (
  email text primary key,
  created_at timestamptz default now(),
  confirmed boolean default false,
  confirmed_at timestamptz,
  unsubscribed boolean default false,
  unsubscribed_at timestamptz,
  tags text[] default '{}'  -- es. ['famiglia','lavoro']
);

-- Lead magnet downloads (per attribuzione)
create table downloads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  guide_slug text not null,
  downloaded_at timestamptz default now()
);

-- Conversation logs assistente (per training/audit)
create table lex_conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  created_at timestamptz default now(),
  messages jsonb not null,  -- array {role, content, timestamp}
  outcome text,  -- 'lead_captured','booking_made','no_action','escalated_human'
  lead_id uuid references leads(id)
);
```

**RLS policies:**
- `leads`: insert pubblico (anon), select solo service_role
- `bookings`: stesso pattern
- `subscribers`: insert pubblico, update solo via secure function (per double opt-in)

---

### ADR-004: Motion library
**Contesto:** servono animazioni di livello editoriale.
**Decisione:**
- **Motion (ex Framer Motion)** per state-driven animations a livello componente
- **GSAP + ScrollTrigger** per scroll-driven storytelling (hero, timeline esperienza)
- **Lenis** per smooth scroll inerziale
- **CSS @scroll-timeline** dove supportato (progressive enhancement)

GSAP è gratuito anche per uso commerciale dal 2025 (acquisito da Webflow), perciò no licenza da gestire.

---

### ADR-005: Tipografia self-hosted
**Contesto:** Tiempos e Söhne (Klim Type) sono a pagamento ma di livello superiore.
**Fase 1 (subito):** Fraunces + Inter Tight da Google Fonts (gratis, similmente eleganti).
**Fase 2 (post-launch, se budget):** acquisto licenze Klim per upgrade silenzioso senza rifattorizzare codice (cambio solo i `@font-face`).

Tutte le font self-hosted in `/public/fonts/` con `font-display: swap` e preload nelle pagine critiche.

---

### ADR-006: CMS — niente CMS
**Contesto:** un CMS aggiunge complessità e costi.
**Decisione:** contenuti in **MDX** versionati nel repo. Adrian o l'avvocato scrivono in markdown, commit, deploy automatico.
**Vantaggi:**
- Zero costo aggiuntivo
- Versioning nativo
- Search-friendly (build time)
- Niente bug "il CMS è giù"

**Quando passare a CMS** (Payload o Sanity): se l'avvocato vuole pubblicare 2+ articoli a settimana autonomamente.

---

### ADR-007: Analytics privacy-first
**Contesto:** GDPR + niente cookie banner invasivo.
**Decisione:** Plausible Analytics (cookie-less) o Umami self-hosted.
**Fallback:** se vuole comunque GA4, implementare Consent Mode v2 come su Hello Verona.

---

## Prestazioni — Budget

| Metrica           | Target | Strumento misura |
| ----------------- | ------ | ---------------- |
| LCP               | < 1.8s | PageSpeed        |
| INP               | < 200ms | Vercel Speed Insights |
| CLS               | < 0.05 | Lighthouse       |
| TTI               | < 2.5s | Lighthouse       |
| Bundle JS initial | < 90KB | next-bundle-analyzer |
| Lighthouse Score  | ≥ 95 (mobile, all) | Lighthouse CI |

## Accessibilità

Target: **WCAG 2.2 AA** completo.
Tooling: axe-core CI, manual testing tastiera + VoiceOver.

## Sicurezza & GDPR

- **Headers**: CSP strict, HSTS, X-Frame-Options, Referrer-Policy
- **Cookie**: solo strettamente necessari (zero fino a consenso analytics)
- **Form**: honeypot + Cloudflare Turnstile (free, no captcha invasivo)
- **Privacy policy & cookie policy**: generate da Iubenda o template ad-hoc validato
- **Diritti GDPR** (art. 15-22): form dedicato per esercizio diritti
- **Data retention**: 24 mesi lead non convertiti, poi anonimizzazione automatica
- **DPO**: indicato se nominato dall'avvocato

## Deployment pipeline

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - checkout
      - setup pnpm + Node 20
      - install
      - lint + typecheck + test
      - build (next build && next export)
      - upload artifact to gh-pages
      - deploy to Pages
      - lighthouse CI (fail se score < 90)
      - deploy worker (se changed)
```
