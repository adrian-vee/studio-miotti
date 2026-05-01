-- ============================================================
-- Studio Miotti — Schema iniziale
-- 0001_init.sql
-- ============================================================

-- Estensioni
create extension if not exists "uuid-ossp";

-- ============================================================
-- LEADS — tutti i contatti raccolti
-- ============================================================
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null check (source in ('form_contact','lex_assistant','newsletter','lead_magnet')),
  name text,
  email text,
  phone text,
  area_diritto text,
  message text,
  qualified_score int default 0,
  status text default 'new' check (status in ('new','contacted','converted','lost')),
  gdpr_consent boolean not null default false,
  gdpr_consent_at timestamptz,
  marketing_consent boolean default false,
  ip_hash text,
  utm_source text,
  utm_medium text,
  utm_campaign text
);

create index if not exists idx_leads_created_at on public.leads (created_at desc);
create index if not exists idx_leads_status on public.leads (status);
create index if not exists idx_leads_email on public.leads (email);

-- ============================================================
-- BOOKINGS — appuntamenti richiesti
-- ============================================================
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  created_at timestamptz not null default now(),
  scheduled_at timestamptz not null,
  duration_min int default 15,
  type text check (type in ('first_consult_free','consult_paid','followup')),
  status text default 'pending' check (status in ('pending','confirmed','completed','cancelled','no_show')),
  notes text,
  meet_url text
);

create index if not exists idx_bookings_scheduled_at on public.bookings (scheduled_at);
create index if not exists idx_bookings_status on public.bookings (status);

-- ============================================================
-- SUBSCRIBERS — newsletter
-- ============================================================
create table if not exists public.subscribers (
  email text primary key,
  created_at timestamptz not null default now(),
  confirmed boolean default false,
  confirmed_at timestamptz,
  unsubscribed boolean default false,
  unsubscribed_at timestamptz,
  tags text[] default '{}'::text[]
);

create index if not exists idx_subscribers_confirmed on public.subscribers (confirmed) where unsubscribed = false;

-- ============================================================
-- DOWNLOADS — tracking lead magnet PDF
-- ============================================================
create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  guide_slug text not null,
  downloaded_at timestamptz not null default now()
);

create index if not exists idx_downloads_email on public.downloads (email);
create index if not exists idx_downloads_slug on public.downloads (guide_slug);

-- ============================================================
-- LEX CONVERSATIONS — log chatbot per audit/training
-- ============================================================
create table if not exists public.lex_conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  created_at timestamptz not null default now(),
  messages jsonb not null,
  outcome text,
  lead_id uuid references public.leads(id) on delete set null
);

create index if not exists idx_lex_conv_session on public.lex_conversations (session_id);
create index if not exists idx_lex_conv_created_at on public.lex_conversations (created_at desc);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.leads enable row level security;
alter table public.bookings enable row level security;
alter table public.subscribers enable row level security;
alter table public.downloads enable row level security;
alter table public.lex_conversations enable row level security;

-- LEADS: anon può solo INSERT, mai SELECT
create policy "anon insert leads"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- BOOKINGS: anon può solo INSERT
create policy "anon insert bookings"
  on public.bookings for insert
  to anon, authenticated
  with check (true);

-- SUBSCRIBERS: anon può INSERT/UPDATE solo proprio record (idempotente per double opt-in)
create policy "anon upsert subscribers"
  on public.subscribers for insert
  to anon, authenticated
  with check (true);
create policy "anon update own subscriber"
  on public.subscribers for update
  to anon, authenticated
  using (true);

-- DOWNLOADS: anon insert
create policy "anon insert downloads"
  on public.downloads for insert
  to anon, authenticated
  with check (true);

-- LEX CONVERSATIONS: solo service_role (worker)
-- Niente policy = nessun accesso da anon, ma service_role bypassa RLS

-- ============================================================
-- DATA RETENTION JOB (manuale per ora, schedule via pg_cron in fase 2)
-- ============================================================
-- Funzione: anonimizza lead non convertiti dopo 24 mesi
create or replace function public.anonymize_old_leads()
returns void language sql as $$
  update public.leads
  set name = '[anonymized]',
      email = null,
      phone = null,
      message = null,
      ip_hash = null
  where status != 'converted'
    and created_at < now() - interval '24 months'
    and name != '[anonymized]';
$$;
