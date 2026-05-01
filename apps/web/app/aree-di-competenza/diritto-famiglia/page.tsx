import { pageMeta, faqSchema, serviceSchema } from '@/lib/seo';
import { PracticeAreaTemplate } from '@/components/sections/PracticeAreaTemplate';

export const metadata = pageMeta({
  title: 'Avvocato Diritto di Famiglia · Separazioni e Divorzi · Verona',
  description:
    "Separazioni consensuali e giudiziali, divorzio, affidamento figli, mantenimento, successioni. Studio Legale Miotti, San Bonifacio (VR).",
  path: '/aree-di-competenza/diritto-famiglia/',
  keywords: ['avvocato divorzio verona', 'avvocato separazione san bonifacio', 'affidamento figli verona', 'avvocato famiglia verona'],
});

const faqs = [
  {
    q: 'Quanto costa una separazione consensuale?',
    a: "I costi variano in base alla complessità del patrimonio e alla presenza di figli minori. In media, una separazione consensuale senza patrimonio rilevante può rientrare in 1.500-2.500 euro per parte (oltre IVA, CPA e contributo unificato). Ne parliamo nel primo incontro con cifre concrete riferite alla Sua situazione.",
  },
  {
    q: 'Quanto tempo ci vuole per arrivare al divorzio?',
    a: "Dopo il 'divorzio breve' del 2015, dalla separazione consensuale al divorzio bastano sei mesi. Se la separazione è giudiziale, ne occorrono dodici. Per le coppie senza figli minori, è anche possibile la negoziazione assistita davanti agli avvocati senza passare dal Tribunale, riducendo ulteriormente i tempi.",
  },
  {
    q: "Come si stabilisce l'assegno di mantenimento?",
    a: "Per il coniuge: in base alle entrate delle parti, alla durata del matrimonio, al contributo dato alla famiglia e al tenore di vita. Per i figli: in base alle loro esigenze e alle possibilità economiche dei genitori. Esistono tabelle giurisprudenziali (Tribunale di Milano, Tribunale di Verona) che orientano il calcolo.",
  },
  {
    q: "Cosa cambia tra affidamento condiviso ed esclusivo?",
    a: "Il condiviso è la regola: entrambi i genitori esercitano la responsabilità genitoriale e prendono insieme le decisioni importanti. L'esclusivo è eccezionale e richiede gravi ragioni (es. genitore inadeguato). Anche in caso di affido esclusivo, l'altro genitore mantiene il diritto di vedere il figlio salvo provvedimenti specifici.",
  },
  {
    q: "Posso fare testamento da solo o serve l'avvocato?",
    a: "Il testamento olografo (scritto, datato e firmato di proprio pugno) è valido. Tuttavia, se il patrimonio è complesso o ci sono legittimari, è prudente farsi assistere per evitare nullità formali, lesioni di legittima e successive impugnazioni. Una consulenza preliminare costa molto meno di una causa successoria.",
  },
];

export default function DirittoFamigliaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: 'Diritto di Famiglia',
              description: "Separazioni, divorzi, affidamento minori, successioni.",
              serviceType: 'Family Law',
              offers: [
                'Separazione consensuale',
                'Separazione giudiziale',
                'Divorzio',
                'Affidamento minori',
                'Assegno di mantenimento',
                'Successioni',
                'Divisione ereditaria',
                'Negoziazione assistita',
              ],
            }),
          ),
        }}
      />

      <PracticeAreaTemplate
        chapter="03"
        number="02 / 06"
        title="Diritto di"
        italicTitle="Famiglia."
        intro="L'area più delicata del nostro lavoro. Separazioni, divorzi, affidamento dei figli, successioni: temi in cui la dimensione tecnica si intreccia con quella umana. Il nostro impegno è duplice: tutelare al meglio i Suoi interessi e, dove possibile, ridurre il conflitto. Una causa familiare ben gestita lascia margine per ricostruire rapporti — quando ne vale la pena."
        caseTypes={[
          'Separazione consensuale (anche con figli minori)',
          'Separazione giudiziale per addebito',
          "Divorzio congiunto e contenzioso",
          "Modifica delle condizioni di separazione o divorzio",
          'Affidamento condiviso o esclusivo dei figli',
          "Calcolo e revisione dell'assegno di mantenimento",
          'Negoziazione assistita per coppie senza figli minori',
          "Successioni testamentarie e legittime",
          'Divisioni ereditarie tra coeredi',
          "Impugnazione di testamento o riduzione per lesione di legittima",
          'Amministrazione di sostegno e tutele',
        ]}
        process={[
          {
            step: 'I',
            title: 'Ascolto',
            description: "Primo incontro per capire la situazione: matrimonio, figli, patrimonio. Anche solo per definire se la separazione è davvero la strada giusta.",
          },
          {
            step: 'II',
            title: 'Mediazione',
            description: 'Quando possibile, percorso consensuale o negoziazione assistita: meno costoso, più veloce, meno traumatico per i figli.',
          },
          {
            step: 'III',
            title: 'Tutela',
            description: 'Se il consensuale non è praticabile, agiamo in via giudiziale con strategia chiara: cosa chiediamo e perché, scenari prevedibili.',
          },
          {
            step: 'IV',
            title: 'Continuità',
            description: 'Le condizioni di separazione/divorzio possono essere modificate negli anni. Restiamo a disposizione anche dopo la sentenza.',
          },
        ]}
        faqs={faqs}
        relatedKeywords={['separazione', 'divorzio', 'affidamento', 'mantenimento', 'eredità']}
      />
    </>
  );
}
