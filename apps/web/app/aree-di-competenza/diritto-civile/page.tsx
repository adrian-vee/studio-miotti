import { pageMeta, faqSchema, serviceSchema } from '@/lib/seo';
import { PracticeAreaTemplate } from '@/components/sections/PracticeAreaTemplate';

export const metadata = pageMeta({
  title: 'Avvocato Diritto Civile · San Bonifacio (VR)',
  description:
    "Assistenza in materia di contratti, obbligazioni, recupero crediti, condominio, responsabilità civile. Studio Legale Miotti, San Bonifacio.",
  path: '/aree-di-competenza/diritto-civile/',
  keywords: ['avvocato civile san bonifacio', 'avvocato civilista verona', 'contratti avvocato verona', 'recupero crediti san bonifacio'],
});

const faqs = [
  {
    q: 'Quanto tempo ci vuole per recuperare un credito non pagato?',
    a: "Dipende dalla volontà del debitore. Con un decreto ingiuntivo non opposto si possono ottenere titoli esecutivi in 60-90 giorni. Se il debitore si oppone, il giudizio ordinario può durare 18-24 mesi in primo grado. Quando l'importo lo giustifica, vale quasi sempre la pena procedere.",
  },
  {
    q: 'Posso impugnare un contratto firmato senza leggerlo?',
    a: "Solo in casi specifici: dolo, errore essenziale, violenza, vizio della volontà o clausole vessatorie non specificamente approvate. La firma comporta in linea di massima l'accettazione del contenuto. Una valutazione preliminare consente di capire se ci sono margini di azione.",
  },
  {
    q: 'Quali sono i tempi per impugnare una delibera condominiale?',
    a: "Trenta giorni dalla data della delibera per i condòmini presenti, o dalla comunicazione del verbale per gli assenti. Si tratta di un termine di decadenza: trascorso, la delibera diventa inoppugnabile salvo casi di nullità.",
  },
  {
    q: 'Cosa serve per fare causa per danni a un vicino?',
    a: "Documentazione fotografica/video, testimonianze, eventuale relazione tecnica di un perito (geometra, architetto), denunce o segnalazioni precedenti. Spesso conviene tentare prima la mediazione obbligatoria, che è anche un requisito di procedibilità per molte controversie civili.",
  },
];

export default function DirittoCivilePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: 'Diritto Civile',
              description: "Assistenza legale in materia civile per privati e imprese.",
              serviceType: 'Civil Law',
              offers: [
                'Redazione contratti',
                'Recupero crediti',
                'Risarcimento danni',
                'Diritto condominiale',
                'Diritto immobiliare',
                'Locazioni',
              ],
            }),
          ),
        }}
      />

      <PracticeAreaTemplate
        chapter="03"
        number="01 / 06"
        title="Diritto"
        italicTitle="Civile."
        intro="Lo Studio assiste privati e imprese in tutte le materie del diritto civile: dalla redazione e analisi di contratti alla gestione di contenziosi commerciali, dal recupero crediti al diritto immobiliare e condominiale. L'approccio è sempre lo stesso: capire prima se la causa è la strada migliore, perché spesso un buon accordo vale più di una sentenza dopo tre anni."
        caseTypes={[
          'Contratti commerciali da redigere o analizzare prima della firma',
          "Pagamenti non onorati da clienti o fornitori (anche tramite decreto ingiuntivo)",
          "Risarcimento danni a beni o persone (anche stradali)",
          'Controversie condominiali e impugnazione di delibere',
          'Compravendita immobiliare e contenziosi su preliminari',
          'Locazioni: morosità, sfratti, contestazioni di canone',
          'Danni causati da prodotti difettosi',
          'Mediazione obbligatoria nelle materie previste dalla legge',
        ]}
        process={[
          {
            step: 'I',
            title: 'Inquadramento',
            description: "Esamino la documentazione e La aggiorno sulla giurisprudenza recente in materia. Le indico se vedo margine d'azione realistico.",
          },
          {
            step: 'II',
            title: 'Strategia',
            description: 'Identifico il percorso più efficiente: stragiudiziale, mediazione, decreto ingiuntivo o giudizio ordinario, valutando costi e tempi.',
          },
          {
            step: 'III',
            title: 'Azione',
            description: 'Conduco la pratica con report scritti periodici. Lei decide ad ogni snodo importante (transare, proseguire, modificare la strategia).',
          },
          {
            step: 'IV',
            title: 'Esito',
            description: "Recupero del credito, risarcimento, sentenza favorevole. In caso di esito sfavorevole, valutazione costi/benefici dell'appello.",
          },
        ]}
        faqs={faqs}
        relatedKeywords={['contratti', 'recupero crediti', 'condominio', 'risarcimenti']}
      />
    </>
  );
}
