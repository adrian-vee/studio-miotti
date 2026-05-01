# SEO STRATEGY — Studio Legale Miotti

## 1. Posizionamento territoriale

San Bonifacio è il centro della **Bassa Veronese Est**, area di ~80.000 abitanti che include:
Soave, Monteforte d'Alpone, Arcole, Cologna Veneta, Caldiero, Belfiore, Zevio, Roveredo di Guà, Lonigo (VI border).

**Strategia:** dominare la ricerca locale per **San Bonifacio + comuni satellite**, espandere su **Verona provincia** in fase 2.

## 2. Keyword Research

### 2.1 Tier 1 — Brand & locali primarie (alta intent commerciale)

| Keyword                          | Volume mensile* | Difficoltà | Priorità |
| -------------------------------- | --------------- | ---------- | -------- |
| avvocato san bonifacio           | 90-170          | Media      | 🔴 P0    |
| studio legale san bonifacio      | 70-110          | Media      | 🔴 P0    |
| miglior avvocato san bonifacio   | 20-40           | Bassa      | 🔴 P0    |
| avvocato civilista san bonifacio | 10-30           | Bassa      | 🟠 P1    |
| avvocato bassa veronese          | 30-60           | Bassa      | 🟠 P1    |
| avvocato verona est              | 40-80           | Media      | 🟠 P1    |

*Stime indicative — da validare con Google Keyword Planner / Ahrefs in fase di setup.

### 2.2 Tier 2 — Per area di competenza

**Diritto di famiglia** (alta domanda, alta concorrenza):
- avvocato divorzio verona
- avvocato separazione consensuale verona
- affidamento figli verona
- assegno mantenimento avvocato verona
- separazione costo verona

**Diritto del lavoro:**
- impugnazione licenziamento verona
- avvocato lavoro verona
- mobbing avvocato verona
- causa di lavoro san bonifacio

**Diritto civile (recupero crediti, immobiliare):**
- recupero crediti azienda verona
- decreto ingiuntivo san bonifacio
- avvocato contratti verona
- usucapione verona
- problemi vicini di casa avvocato

**Diritto penale (se trattato):**
- avvocato penalista verona
- difesa imputato verona

### 2.3 Tier 3 — Long-tail informazionali (lead magnet)

Queste alimentano il blog/guide. Esempi:
- "come impugnare un licenziamento per giusta causa"
- "quanto tempo ci vuole per una separazione consensuale"
- "cosa fare se il datore di lavoro non paga"
- "modello diffida ad adempiere word"
- "differenza separazione e divorzio breve"
- "incidente stradale colpa risarcimento tempi"
- "rimborso voli cancellati come fare"
- "amministratore di sostegno come si nomina"

## 3. Architettura informativa SEO-first

```
/  (Homepage — keyword: avvocato san bonifacio)
├── /studio
│   ├── /studio/avv-massimiliano-miotti
│   └── /studio/come-lavoriamo
├── /aree-di-competenza  (hub page)
│   ├── /aree-di-competenza/diritto-civile
│   ├── /aree-di-competenza/diritto-famiglia
│   ├── /aree-di-competenza/diritto-lavoro
│   ├── /aree-di-competenza/recupero-crediti
│   ├── /aree-di-competenza/diritto-immobiliare
│   └── /aree-di-competenza/responsabilita-civile
├── /guide  (blog/lead magnets)
│   ├── /guide/[slug]
│   └── /guide/categoria/[area]
├── /casi-studio  (case studies anonimizzati)
├── /domande-frequenti
├── /tariffe   (trasparenza onorari)
├── /contatti
├── /prenota   (calendario)
└── /risorse-gratuite  (PDF download)

[footer]
├── /privacy-policy
├── /cookie-policy
├── /termini-di-servizio
└── /accessibilita
```

## 4. On-page SEO checklist (per ogni pagina)

- [ ] `<title>`: 50-60 caratteri, keyword primaria + brand
- [ ] `<meta description>`: 140-160 caratteri, CTA inclusa
- [ ] H1 univoco contenente keyword primaria
- [ ] H2/H3 con keyword semantiche correlate (LSI)
- [ ] URL slug breve, kebab-case, senza stop words inutili
- [ ] Open Graph + Twitter Card complete
- [ ] Canonical tag self-referenziante
- [ ] Breadcrumb visibile + schema BreadcrumbList
- [ ] Immagini: `alt` descrittivi, `loading="lazy"` (eccetto LCP), formato AVIF/WebP
- [ ] Internal linking (3-5 link contestuali per pagina)
- [ ] CTA sticky sopra fold + ripetuta a fondo pagina
- [ ] Schema.org appropriato (vedi sezione 5)
- [ ] Sitemap aggiornata, robots.txt corretto
- [ ] Hreflang se mai bilingue

## 5. Schema.org / Structured Data

**Homepage e contatti — `LegalService` + `LocalBusiness`:**

```json
{
  "@context": "https://schema.org",
  "@type": ["LegalService", "LocalBusiness"],
  "@id": "https://studiomiotti.it/#org",
  "name": "Studio Legale Avv. Massimiliano Miotti",
  "url": "https://studiomiotti.it",
  "logo": "https://studiomiotti.it/logo.png",
  "image": "https://studiomiotti.it/og-image.jpg",
  "telephone": "+39 045 9586116",
  "faxNumber": "+39 045 6105099",
  "email": "{{TODO_EMAIL}}",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via S. Giovanni Bosco, 29/E",
    "addressLocality": "San Bonifacio",
    "addressRegion": "VR",
    "postalCode": "37047",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.3919,
    "longitude": 11.2747
  },
  "openingHoursSpecification": [...],
  "areaServed": [
    {"@type": "City", "name": "San Bonifacio"},
    {"@type": "City", "name": "Verona"},
    {"@type": "AdministrativeArea", "name": "Provincia di Verona"}
  ],
  "knowsLanguage": ["it", "en"],
  "memberOf": {
    "@type": "Organization",
    "name": "Ordine degli Avvocati di Verona"
  }
}
```

**Pagine "Aree di competenza" — `Service`:**

```json
{
  "@type": "Service",
  "serviceType": "Diritto di Famiglia",
  "provider": {"@id": "https://studiomiotti.it/#org"},
  "areaServed": {"@type": "AdministrativeArea", "name": "Provincia di Verona"},
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Separazione consensuale"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Divorzio"}},
      ...
    ]
  }
}
```

**Profilo avvocato — `Person` + `Attorney`:**

```json
{
  "@type": ["Person", "Attorney"],
  "name": "Massimiliano Miotti",
  "honorificPrefix": "Avv.",
  "jobTitle": "Avvocato",
  "worksFor": {"@id": "https://studiomiotti.it/#org"},
  "alumniOf": "{{TODO_UNIVERSITA}}",
  "knowsLanguage": ["it", "en"],
  "knowsAbout": ["Diritto Civile", "Diritto di Famiglia", ...]
}
```

**Guide blog — `Article` + `FAQPage`:**

Ogni guida con `Article` schema completo + `FAQPage` per le sezioni FAQ a fondo articolo (massimizza chance di rich snippet).

## 6. Local SEO

### 6.1 Google Business Profile (priorità massima)
- [ ] Reclamo profilo (probabilmente già esistente come "Miotti Massimiliano")
- [ ] Foto studio (5-8), foto avvocato, foto facciata
- [ ] Categorie: Avvocato (primaria) + Studio Legale + secondarie per aree
- [ ] Descrizione 750 caratteri ottimizzata
- [ ] Q&A precompilate (10 domande pubbliche)
- [ ] Posts settimanali (novità giuridiche, casi vinti anonimi)
- [ ] Recensioni: strategia di richiesta sistematica post-incarico

### 6.2 Citazioni NAP (Nome-Address-Phone consistenti)
Lista directories prioritarie da popolare/correggere:
- Pagine Bianche / Pagine Gialle
- ProntoPro
- OrdineAvvocati Verona (verifica esistenza)
- iltuoavvocato.it
- 36avvocati.com
- Bing Places
- Apple Maps
- Foursquare
- Justia / Avvo equivalent italiani
- Camera di Commercio

### 6.3 Backlink locali
- Comune San Bonifacio (sezione professionisti se esiste)
- Confcommercio Verona
- Camera di Commercio Verona
- Università Verona (se ha tenuto seminari)
- Sponsor eventi locali / pro bono
- Articoli su Verona Sera, L'Arena (PR)

## 7. Content plan (12 mesi)

**Cadenza:** 1 articolo/guida ogni 2 settimane = 26 contenuti/anno.

**Mix consigliato:**
- 60% how-to & informazionali (SEO long-tail)
- 20% casi studio anonimi (autorevolezza)
- 10% commento giurisprudenza recente (E-E-A-T)
- 10% lead magnet PDF scaricabili

**Esempi primi 6 contenuti — quick wins SEO:**
1. "Separazione consensuale a Verona: tempi, costi e procedura completa 2026"
2. "Licenziamento illegittimo: cosa fare nei primi 60 giorni" + PDF checklist
3. "Recupero crediti per piccole aziende: la guida completa per evitare di perderli"
4. "Incidente stradale: il vademecum con la timeline degli adempimenti"
5. "Eredità e successioni: 10 errori che ti costeranno cari"
6. "Affidamento condiviso o esclusivo: cosa cambia nella pratica"

## 8. Lead magnet system

**Scopo:** scambiare contenuto di valore per email → nurture → consulto.

**PDF da produrre prima del lancio (3 minimum viable):**
1. **"Separazione consensuale: la checklist degli 8 passi"** — area famiglia
2. **"Modello di diffida ad adempiere personalizzabile"** + istruzioni d'uso — area civile
3. **"Cosa fare nelle prime 24 ore dopo un incidente stradale"** — area RC

**Funnel:**
```
Articolo blog → CTA "scarica la guida" 
  → Form (nome + email + consenso GDPR + consenso marketing)
  → Email con link al PDF (Resend)
  → Sequenza nurture 5 email su 3 settimane
  → Email 6: invito consulenza gratuita 15 min
```

## 9. Conversion Rate Optimization

**CTA primarie:**
- "Prenota un consulto gratuito" (alto-fold home, sticky mobile)
- "Parla con Lex, l'assistente dello studio" (chatbot floating)
- "Ricevi il caso valutato in 24h" (form contatti)

**Trust signals da inserire visibilmente:**
- Logo Ordine Avvocati Verona + numero iscrizione
- Numero anni esperienza
- Numero clienti seguiti (se >100, comunicabile)
- Testimonianze video o testuali
- "Risposta entro 24h garantita"
- Foto vere studio (no stock)

**Friction reducer:**
- Form contatto: max 4 campi (nome, contatto, area, descrizione)
- Telefono cliccabile mobile
- WhatsApp Business link
- Indicazioni stradali Maps embedded

## 10. Tracking & KPI

**Eventi da trackare (Plausible custom events):**
- `cta_consulto_click`
- `form_contact_submit`
- `pdf_download_{slug}`
- `lex_conversation_started`
- `lex_booking_requested`
- `phone_click`
- `whatsapp_click`

**KPI mensili:**
- Sessioni organic
- Posizionamento keyword Tier 1 (top 3)
- Lead generati totali
- Tasso conversione visit→lead
- Lead→cliente (richiede CRM)
- Cost per lead (se attiva ads)
- Domain Rating (Ahrefs)

## 11. Roadmap SEO

| Mese | Focus                                                   |
| ---- | ------------------------------------------------------- |
| 0    | Setup tecnico, schema, sitemap, GSC, Bing Webmaster      |
| 1    | GBP completo, prime 3 guide, citation building           |
| 2    | Contenuti #4-6, prime recensioni richieste               |
| 3    | Audit prestazioni, espansione long-tail                  |
| 4-6  | Backlink outreach, PR locale, blog ospite                |
| 7-12 | Espansione provincia Verona, valutazione Google Ads brand |
