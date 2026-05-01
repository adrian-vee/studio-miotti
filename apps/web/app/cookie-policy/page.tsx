import { pageMeta } from '@/lib/seo';
import { LegalLayout } from '@/components/layout/LegalLayout';

export const metadata = pageMeta({
  title: 'Cookie Policy',
  description: "Informativa sui cookie e altri identificatori utilizzati dal sito.",
  path: '/cookie-policy/',
});

export default function CookiePolicyPage() {
  return (
    <LegalLayout
      chapter="Cookie"
      title="Informativa sui"
      italicTitle="cookie."
      lastUpdate="01 Maggio 2026"
    >
      <p>
        Il sito <strong>studiomiotti.it</strong> utilizza un numero ridotto di cookie
        e tecnologie simili, in linea con il Provvedimento del Garante Privacy del
        10 giugno 2021 e con le linee guida EDPB.
      </p>

      <h2>1. Cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo memorizzati dal browser sul dispositivo
        dell'utente. Possono essere di sessione (cancellati alla chiusura del browser)
        o persistenti, di prima parte o di terze parti.
      </p>

      <h2>2. Cookie tecnici (esenti da consenso)</h2>
      <ul>
        <li><strong>Sessione</strong>: necessari per il corretto funzionamento del sito (es. mantenimento dei consensi).</li>
        <li><strong>Preferenze</strong>: memorizzano le scelte dell'utente sul cookie banner.</li>
      </ul>

      <h2>3. Cookie analitici anonimizzati</h2>
      <p>
        Utilizziamo <strong>Plausible Analytics</strong>, soluzione privacy-first
        che non installa cookie, non traccia gli utenti tra siti diversi e non
        raccoglie dati personali. Tutte le statistiche sono aggregate e anonime.
      </p>

      <h2>4. Cookie di terze parti</h2>
      <p>
        Il sito non incorpora video di YouTube, mappe Google, social plugin o
        contatori esterni che impostino cookie di profilazione. Quando ciò dovesse
        cambiare in futuro, l'informativa sarà aggiornata e verrà richiesto
        il consenso esplicito.
      </p>

      <h2>5. Come gestire i cookie</h2>
      <p>
        L'utente può configurare il proprio browser per accettare, rifiutare o
        eliminare i cookie. Le istruzioni sono disponibili sui siti dei principali browser:
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" rel="noopener" target="_blank">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/it/kb/Eliminare%20i%20cookie" rel="noopener" target="_blank">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" rel="noopener" target="_blank">Safari</a></li>
        <li><a href="https://support.microsoft.com/it-it/microsoft-edge" rel="noopener" target="_blank">Microsoft Edge</a></li>
      </ul>

      <h2>6. Riferimenti</h2>
      <p>
        Per il trattamento dei dati personali si rinvia alla <a href="/privacy-policy">Privacy Policy</a>.
      </p>
    </LegalLayout>
  );
}
