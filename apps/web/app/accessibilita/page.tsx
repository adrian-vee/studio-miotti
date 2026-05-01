import { pageMeta } from '@/lib/seo';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { SITE_DATA } from '@/lib/site-data';

export const metadata = pageMeta({
  title: 'Dichiarazione di Accessibilità',
  description: "Impegno per l'accessibilità del sito secondo lo standard WCAG 2.2 AA.",
  path: '/accessibilita/',
});

export default function AccessibilitaPage() {
  return (
    <LegalLayout
      chapter="Accessibilità"
      title="Dichiarazione di"
      italicTitle="accessibilità."
      lastUpdate="01 Maggio 2026"
    >
      <p>
        Lo Studio Legale Miotti si impegna a rendere il proprio sito web accessibile
        al maggior numero possibile di persone, incluse quelle con disabilità.
      </p>

      <h2>Standard di riferimento</h2>
      <p>
        Il sito è progettato per essere conforme alle{' '}
        <strong>Web Content Accessibility Guidelines (WCAG) 2.2 livello AA</strong>{' '}
        del W3C, in linea con la Direttiva UE 2016/2102 e il D.Lgs. 106/2018.
      </p>

      <h2>Caratteristiche di accessibilità</h2>
      <ul>
        <li>Struttura semantica HTML5 con heading gerarchici corretti</li>
        <li>Contrasti colore conformi al livello AAA dove possibile</li>
        <li>Navigazione completa da tastiera</li>
        <li>Etichette ARIA su tutti gli elementi interattivi</li>
        <li>Testo alternativo descrittivo su tutte le immagini significative</li>
        <li>Rispetto della preferenza utente <code>prefers-reduced-motion</code></li>
        <li>Compatibilità con i principali screen reader (NVDA, VoiceOver, JAWS)</li>
        <li>Skip link per saltare al contenuto principale</li>
        <li>Form con label associate, messaggi di errore espliciti</li>
        <li>Tipografia scalabile (uso di unità relative)</li>
      </ul>

      <h2>Stato di conformità</h2>
      <p>
        Il sito è in <strong>conformità parziale</strong> con WCAG 2.2 AA.
        Stiamo lavorando per migliorare progressivamente l'accessibilità di
        elementi visivi non testuali e di contenuti interattivi.
      </p>

      <h2>Feedback</h2>
      <p>
        Se incontri difficoltà nell'utilizzo del sito o vuoi segnalare un problema
        di accessibilità,{' '}
        {SITE_DATA.email ? (
          <>scrivi a {SITE_DATA.email} oppure chiama</>
        ) : (
          <>chiama</>
        )}{' '}
        lo studio al {SITE_DATA.phoneDisplay}. Ci impegniamo a rispondere entro{' '}
        <strong>10 giorni lavorativi</strong>.
      </p>

      <h2>Aggiornamenti</h2>
      <p>
        Questa dichiarazione viene rivista periodicamente. La data dell'ultimo
        aggiornamento è riportata in alto.
      </p>
    </LegalLayout>
  );
}
