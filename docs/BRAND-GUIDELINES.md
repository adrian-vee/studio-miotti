# BRAND GUIDELINES — Studio Legale Miotti

## Posizionamento

**Promessa:** "Diritto come dialogo, non come distanza."

**Principi guida:**
1. **Chiarezza prima di tutto.** Niente legalese inutile sul sito. Il cliente deve capire cosa stiamo dicendo.
2. **Riservatezza visibile.** L'estetica trasmette sobrietà professionale, mai ostentazione.
3. **Contemporaneità con radici.** Tipografia editoriale (richiamo al testo legale) + UI 2026.
4. **Misura veneta.** Concretezza, niente promesse impossibili, niente toni da "guru della giustizia".

**Tono di voce:**
- Tu/Lei: **Lei** in homepage e contenuti istituzionali, **tu** opzionale nei contenuti del blog rivolti a un pubblico più giovane (con discrezione).
- Mai imperativi commerciali ("Chiama subito!"). Sempre formulazioni cortesi e potenti ("Prenoti il primo confronto, è gratuito.").
- Microcopy con senso d'umanità (es. nel form: "Le rispondiamo entro 24 ore lavorative" non "Ti contatteremo").

## Palette "Lex Minimal"

### Colori principali

```
┌─────────────────────────────────────────────────────────────┐
│  INK                                                        │
│  #0E1116  rgb(14, 17, 22)                                  │
│  Testo principale, headline, link al hover                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  PAPER                                                      │
│  #FAFAF7  rgb(250, 250, 247)                                │
│  Background dominante. Bianco caldo, mai #FFF puro.         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  PAPER WARM                                                 │
│  #F1EDE3  rgb(241, 237, 227)                                │
│  Sezioni alternate, cards, area "guide".                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  COBALT                                                     │
│  #1E3A5F  rgb(30, 58, 95)                                   │
│  Accento primario, CTA, link, dettagli grafici.             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  COBALT DEEP                                                │
│  #0F2240  rgb(15, 34, 64)                                   │
│  Hover stati, header on scroll, footer.                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  GRAPHITE                                                   │
│  #3A3F47  rgb(58, 63, 71)                                   │
│  Testo secondario, label form, copy supporto.               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  RULE                                                       │
│  #D9D5C9  rgb(217, 213, 201)                                │
│  Bordi sottili, divisori, separatori orizzontali.           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  GOLD WHISPER                                               │
│  #A8915C  rgb(168, 145, 92)                                 │
│  Solo dettagli editoriali. Numeri capitolo, bullet "*".     │
│  Mai per CTA. Massimo 1-2 ricorrenze per schermata.         │
└─────────────────────────────────────────────────────────────┘
```

### Stati funzionali

```
SUCCESS   #2E5D3A   (verde quercia, no smeraldo brillante)
WARN      #B07A2B   (ambra, parente del gold)
ERROR     #8C2A2F   (bordeaux scuro, mai rosso fluo)
INFO      #1E3A5F   (= cobalt)
```

### Contrasti AAA

- Ink su Paper: 16.4:1 ✅
- Cobalt su Paper: 8.9:1 ✅
- Graphite su Paper: 9.2:1 ✅
- Paper su Cobalt: 8.9:1 ✅
- Gold su Paper: 4.1:1 ⚠️ (solo per testo decorativo non-essenziale, mai per CTA o info critiche)

## Tipografia

### Stack font

```css
/* Display — titoli, hero, citazioni */
--font-display: 'Tiempos Headline', 'Fraunces', 'PT Serif', Georgia, serif;

/* Body — paragrafi, UI, navigazione */
--font-sans: 'Söhne', 'Inter Tight', 'Inter', -apple-system, sans-serif;

/* Mono — numeri legali, codici, citazioni codice */
--font-mono: 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace;
```

### Scala tipografica

```
Display XL    96 / 112    Hero homepage (clamp 56→96px)
Display L     72 / 84     Inizio sezione principale
Display M     56 / 64     Titolo pagina interna
H1            44 / 52     H1 articoli/guide
H2            32 / 40     Sezioni
H3            24 / 32     Sotto-sezioni
H4            20 / 28     Cards
Body L        18 / 30     Lead paragraph, intro
Body M        16 / 28     Standard
Body S        14 / 22     Note, captions
Micro         12 / 18     Legal copy footer, label
```

**Regole tipografiche:**
- Headline serif: `font-feature-settings: "ss01", "ss02"` per stylistic alternates eleganti
- Body: `font-feature-settings: "ss03", "tnum"` per tabular numerals nei prezzi/numeri
- `text-wrap: balance` su titoli, `text-wrap: pretty` su paragrafi
- Justify mai (italiano si spezza male). Sempre `text-align: left`.
- Max line-length: **65-72ch** per body, **18-24 parole** per titoli.

## Logo & Lockup

In assenza di logo esistente, il "logotype" testuale:

```
Studio Legale
M I O T T I
```

- "Studio Legale" in micro caps Söhne 12px tracking 0.18em
- "MIOTTI" in Tiempos Display 32px tracking 0.32em (spaziato)
- Allineamento: bandiera sinistra
- Filetto cobalt 1px sopra "MIOTTI"

Variante orizzontale per header:
```
M I O T T I  |  Studio Legale · San Bonifacio
```

Quando avremo dati reali, valutiamo monogramma "MM" geometrico tagliato.

## Iconografia

**No emoji. Mai.**

Set icone: **Phosphor Icons** (variant "thin" e "light"), oppure **Lucide** se serve coerenza con shadcn.

Stile: stroke 1.5px, corner radius 0 (icone geometriche), formato 24x24.

**Icone tematiche custom da disegnare** (SVG inline, non da pacchetto):
- Bilancia (per "imparzialità") — non la bilancia stilizzata classica, ma una versione astratta a due trapezi
- Sigillo notarile circolare con monogramma MM (footer)
- "Codice" stilizzato come pile di linee orizzontali progressive
- Ornamento sezione: filetto orizzontale 80px con quadratino oro al centro

## Motion principles

### Durate
```
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);    /* power expo */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

--dur-quick: 180ms;   /* hover, focus */
--dur-medium: 320ms;  /* enter/exit micro */
--dur-slow: 720ms;    /* section reveal */
--dur-cinematic: 1400ms; /* hero stagger sequence */
```

### Pattern ricorrenti
1. **Reveal serif**: titolo display entra letter-by-letter con `clip-path` da bottom + opacità (no scale, no rotate)
2. **Filetto disegna**: ogni sezione apre con filetto orizzontale che cresce da sinistra (300ms ease-out)
3. **Card mass**: hover su card di servizio → `transform: translateY(-2px)` + ombra 0 12px 32px rgba(15,34,64,0.08)
4. **Cursor**: nessun custom cursor (sembra trendy ma è stancante per visite ripetute)

### Reduced motion
Sempre fallback con `@media (prefers-reduced-motion: reduce)` che disabilita tutte le animazioni > 200ms e mantiene solo fade.

## Foto / Immagini

**Direzione visiva:**
- Ritratto avvocato: scatto editoriale, bianco e nero opzionale, non sorriso commerciale, sguardo non frontale (3/4)
- Foto studio: dettagli (libro aperto, fontana, scrivania) più che pose plenarie
- Niente foto stock. Niente martello del giudice. Niente bilancia in primo piano.
- Niente "due mani che si stringono" nel hero (cliché abusato).

**Trattamento:**
- Tutte le foto in scala desaturata (-20% saturation), grain leggera (`<feTurbulence>` SVG filter)
- Ratio preferiti: 4:5 (portrait) e 3:2 (paesaggio)

## Linguaggio inclusivo

- Forma neutra dove possibile ("la persona assistita" anziché "il cliente")
- Mai schwa o asterischi (illeggibili da screen reader)
- Mai linguaggio paternalistico o vittimizzante (specie famiglia/lavoro)

## Cosa evitare assolutamente

- ❌ Blu navy + grigio + oro lucido (= ogni studio legale italiano)
- ❌ Times New Roman, Georgia come body, Arial
- ❌ Carousel di "casi vinti" con grafica corporate
- ❌ Frasi tipo "il tuo problema è il nostro problema"
- ❌ Stock photo di poignée de main
- ❌ Banner pop-up newsletter intrusivo
- ❌ Numero verde con lettering "vintage telefono"
- ❌ Quote di Cicerone in latino senza contesto

## Esempi di riferimento (mood)

- **Sullivan & Cromwell** (sullcrom.com) — tipografia editoriale
- **Wachtell Lipton Rosen & Katz** — minimalismo radicale
- **Cravath, Swaine & Moore** — palette beige/blu profondo
- **Linklaters** — motion design discreto
- **L'Avvocato del Diavolo** (rivista) — direzione editoriale italiana
- Editoriale: **The Browser, The New York Review of Books**

Mai studi italiani come riferimento (sono quasi tutti datati). Si guarda al meglio internazionale.
