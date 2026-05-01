import { pageMeta } from '@/lib/seo';
import { LegalLayout } from '@/components/layout/LegalLayout';

export const metadata = pageMeta({
  title: 'Termini di Servizio',
  description: "Termini e condizioni di utilizzo del sito studiomiotti.it.",
  path: '/termini-di-servizio/',
});

export default function TerminiPage() {
  return (
    <LegalLayout
      chapter="Termini"
      title="Termini di"
      italicTitle="servizio."
      lastUpdate="01 Maggio 2026"
    >
      <h2>1. Accettazione</h2>
      <p>
        L'accesso e l'uso del sito <strong>studiomiotti.it</strong> implicano
        l'accettazione integrale dei presenti termini. In caso di disaccordo,
        l'utente è invitato a non utilizzare il sito.
      </p>

      <h2>2. Natura informativa dei contenuti</h2>
      <p>
        I contenuti pubblicati (articoli, guide, FAQ) hanno finalità esclusivamente
        informative e divulgative. Non costituiscono parere legale, consulenza
        professionale né rapporto di patrocinio. Per una valutazione del proprio caso
        è necessario un colloquio diretto con l'avvocato.
      </p>

      <h2>3. Assistente Lex</h2>
      <p>
        L'assistente digitale "Lex" fornisce informazioni generali e supporto alla
        prenotazione. Le risposte sono generate con tecnologie di intelligenza
        artificiale e <strong>non sostituiscono la consulenza dell'avvocato</strong>.
        Le conversazioni possono essere registrate per finalità di miglioramento del
        servizio, nei limiti dell'<a href="/privacy-policy">informativa privacy</a>.
      </p>

      <h2>4. Proprietà intellettuale</h2>
      <p>
        Tutti i contenuti del sito (testi, immagini, logo, codice) sono di proprietà
        dell'Avv. Massimiliano Miotti o di terzi licenzianti. Ne è vietata la
        riproduzione, anche parziale, senza autorizzazione scritta.
      </p>

      <h2>5. Limitazione di responsabilità</h2>
      <p>
        Lo Studio non risponde di eventuali danni derivanti dall'uso improprio
        delle informazioni pubblicate. Pur impegnandosi a mantenere i contenuti
        aggiornati, non garantisce la completa attualità in considerazione delle
        frequenti modifiche normative e giurisprudenziali.
      </p>

      <h2>6. Link a siti terzi</h2>
      <p>
        Il sito può contenere collegamenti a siti di terzi. Lo Studio non è
        responsabile dei contenuti, della disponibilità o delle politiche di
        privacy di tali siti.
      </p>

      <h2>7. Foro competente</h2>
      <p>
        Per qualunque controversia relativa al sito è competente in via esclusiva
        il Foro di Verona, salvo norme inderogabili a tutela del consumatore.
      </p>
    </LegalLayout>
  );
}
