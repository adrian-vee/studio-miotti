import { pageMeta } from '@/lib/seo';
import { LegalLayout } from '@/components/layout/LegalLayout';

export const metadata = pageMeta({
  title: 'Privacy Policy',
  description: "Informativa sul trattamento dei dati personali ai sensi del Reg. UE 679/2016 (GDPR).",
  path: '/privacy-policy/',
  noindex: false,
});

export default function PrivacyPage() {
  return (
    <LegalLayout
      chapter="Privacy"
      title="Informativa sul trattamento"
      italicTitle="dei dati personali."
      lastUpdate="01 Maggio 2026"
    >
      <p>
        La presente informativa è resa ai sensi del Regolamento UE 2016/679 (GDPR)
        e del D.Lgs. 196/2003 ss.mm.ii. (Codice Privacy) a tutti coloro che interagiscono
        con il sito <strong>studiomiotti.it</strong>.
      </p>

      <h2>1. Titolare del trattamento</h2>
      <p>
        <strong>Avv. Massimiliano Miotti</strong><br />
        Via S. Giovanni Bosco, 29/E – 37047 San Bonifacio (VR)<br />
        CF: MTTMSM75D07H783Q · P.IVA: {`{{TODO_PIVA}}`}<br />
        Tel: 045 95 86 116 · Email: {`{{TODO_EMAIL}}`} · PEC: {`{{TODO_PEC}}`}
      </p>

      <h2>2. Tipologie di dati trattati</h2>
      <ul>
        <li><strong>Dati di navigazione</strong>: indirizzo IP (anonimizzato), tipo di browser, pagine visitate, orario, riferiti raccolti automaticamente per finalità statistiche.</li>
        <li><strong>Dati forniti volontariamente</strong>: nome, email, telefono, area di interesse, contenuto del messaggio inseriti nei moduli di contatto.</li>
        <li><strong>Dati per l'iscrizione alla newsletter</strong>: indirizzo email e preferenze tematiche.</li>
        <li><strong>Conversazioni con l'assistente Lex</strong>: messaggi scambiati con l'assistente AI per fornire risposte e qualificare le richieste.</li>
      </ul>

      <h2>3. Finalità e basi giuridiche</h2>
      <ul>
        <li>Riscontro a richieste di contatto (art. 6.1.b GDPR — esecuzione di misure precontrattuali).</li>
        <li>Adempimenti di legge professionali e contabili (art. 6.1.c GDPR).</li>
        <li>Invio di newsletter informativa, previo consenso esplicito (art. 6.1.a GDPR).</li>
        <li>Analisi statistiche aggregate sul traffico del sito (art. 6.1.f GDPR — legittimo interesse).</li>
      </ul>

      <h2>4. Modalità di trattamento</h2>
      <p>
        I dati sono trattati con strumenti elettronici e con l'adozione di misure di sicurezza
        adeguate a prevenire accessi non autorizzati, perdita o distruzione dei dati.
        Il trattamento è effettuato dal Titolare e da soggetti debitamente autorizzati.
      </p>

      <h2>5. Conservazione dei dati</h2>
      <ul>
        <li>Dati di navigazione: 30 giorni in forma anonimizzata.</li>
        <li>Lead da form contatto: 24 mesi se non si instaura rapporto professionale, dopodiché anonimizzazione.</li>
        <li>Dati di clienti acquisiti: 10 anni dalla cessazione del rapporto, ai fini delle disposizioni del CNF e della prescrizione decennale.</li>
        <li>Iscritti newsletter: fino a revoca del consenso.</li>
      </ul>

      <h2>6. Comunicazione e trasferimento</h2>
      <p>
        I dati possono essere comunicati a:
      </p>
      <ul>
        <li>Fornitori di servizi tecnici (hosting Supabase Frankfurt, Cloudflare, Resend per email transazionali) nominati Responsabili del trattamento ex art. 28 GDPR.</li>
        <li>Autorità giudiziarie e di controllo, ove richiesto da norme di legge.</li>
      </ul>
      <p>
        Alcuni fornitori possono trovarsi al di fuori dell'UE. In tal caso il trasferimento
        è basato sulle clausole contrattuali standard approvate dalla Commissione Europea
        o sulle decisioni di adeguatezza.
      </p>

      <h2>7. Diritti dell'interessato</h2>
      <p>
        L'interessato ha diritto di:
      </p>
      <ul>
        <li>Accedere ai dati personali (art. 15 GDPR);</li>
        <li>Rettificare dati inesatti o incompleti (art. 16);</li>
        <li>Cancellare i dati ("diritto all'oblio", art. 17);</li>
        <li>Limitare il trattamento (art. 18);</li>
        <li>Portabilità dei dati (art. 20);</li>
        <li>Opporsi al trattamento (art. 21);</li>
        <li>Revocare il consenso in qualunque momento (art. 7);</li>
        <li>Proporre reclamo al Garante per la protezione dei dati personali.</li>
      </ul>
      <p>
        Per esercitare tali diritti scrivere a {`{{TODO_EMAIL}}`} o a mezzo PEC a {`{{TODO_PEC}}`}.
      </p>

      <h2>8. Modifiche</h2>
      <p>
        Il Titolare si riserva di modificare la presente informativa in qualunque momento.
        L'utente è invitato a consultare regolarmente questa pagina, riportante in alto la
        data dell'ultimo aggiornamento.
      </p>
    </LegalLayout>
  );
}
