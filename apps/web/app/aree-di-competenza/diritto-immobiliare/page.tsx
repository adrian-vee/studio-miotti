import { pageMeta, faqSchema } from '@/lib/seo';
import { PracticeAreaTemplate } from '@/components/sections/PracticeAreaTemplate';

export const metadata = pageMeta({
  title: 'Avvocato Diritto Immobiliare · San Bonifacio (VR)',
  description:
    "Compravendita, locazioni, sfratti, usucapione, contenziosi tra confinanti. Studio Legale Miotti.",
  path: '/aree-di-competenza/diritto-immobiliare/',
  keywords: ['avvocato immobiliare verona', 'sfratto avvocato san bonifacio', 'usucapione verona'],
});

const faqs = [
  {
    q: 'Compro casa: cosa controllare prima di firmare il preliminare?',
    a: "Atto di provenienza del venditore, conformità urbanistica e catastale, certificato energetico, ipoteche e trascrizioni pregiudizievoli, regolarità degli impianti, eventuali pendenze condominiali. Una verifica preliminare costa molto meno di un contenzioso post-rogito.",
  },
  {
    q: "Quanto dura una procedura di sfratto per morosità?",
    a: "Per il rito di sfratto per morosità: 60-90 giorni per ottenere la convalida, ulteriori 30-60 giorni per la liberazione dell'immobile (con eventuale concessione del termine di grazia). Tempi più lunghi se il conduttore si oppone o se serve l'ufficiale giudiziario per l'esecuzione forzata.",
  },
  {
    q: "Posso usucapire un terreno che uso da vent'anni?",
    a: "Per l'usucapione ordinaria servono vent'anni di possesso continuo, pacifico, pubblico e non equivoco, animo domini (intenzione di possedere come proprietari). Vanno provati con testimonianze, foto datate, atti pubblici, pagamenti di tasse. Il giudizio si introduce con domanda accertativa avanti al Tribunale del luogo dove si trova l'immobile.",
  },
];

export default function DirittoImmobiliarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <PracticeAreaTemplate
        chapter="03"
        number="05 / 06"
        title="Diritto"
        italicTitle="Immobiliare."
        intro="Compravendita, locazioni, contenziosi tra confinanti, usucapione, sfratti. Materia tecnica dove un controllo preventivo evita causa decennali. Lavoriamo a stretto contatto con notai e tecnici (geometri, architetti, periti) della zona."
        caseTypes={[
          'Verifica preliminare di vendita immobiliare',
          'Contestazione di vizi della cosa venduta',
          'Locazioni residenziali e commerciali',
          'Procedure di sfratto per morosità o finita locazione',
          'Usucapione ordinaria e abbreviata',
          'Servitù di passaggio, di veduta, di acquedotto',
          'Controversie di confine e distanze legali',
          'Diritti di prelazione (rurale, urbana, condominiale)',
        ]}
        process={[
          { step: 'I', title: 'Verifica', description: 'Controllo titoli, ipoteche, conformità urbanistica e catastale prima di qualsiasi azione.' },
          { step: 'II', title: 'Mediazione', description: "Per la maggior parte delle materie immobiliari la mediazione è obbligatoria prima della causa." },
          { step: 'III', title: 'Azione', description: "Sfratto, accertamento usucapione, risarcimento danni, riduzione di prezzo per vizi." },
          { step: 'IV', title: 'Esecuzione', description: "Liberazione immobile, trascrizione sentenza, esecuzione coattiva ove necessario." },
        ]}
        faqs={faqs}
        relatedKeywords={['compravendita', 'sfratto', 'usucapione', 'preliminare']}
      />
    </>
  );
}
