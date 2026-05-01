import { pageMeta, faqSchema } from '@/lib/seo';
import { PracticeAreaTemplate } from '@/components/sections/PracticeAreaTemplate';

export const metadata = pageMeta({
  title: 'Recupero Crediti per Aziende e Privati · Verona',
  description:
    "Decreti ingiuntivi, pignoramenti, recupero stragiudiziale. Studio Legale Miotti, San Bonifacio (VR).",
  path: '/aree-di-competenza/recupero-crediti/',
  keywords: ['recupero crediti san bonifacio', 'decreto ingiuntivo verona', 'pignoramento avvocato verona'],
});

const faqs = [
  {
    q: "Per quale importo conviene attivare la procedura?",
    a: "Quando l'importo lo giustifica rispetto ai costi di procedura e al contributo unificato, conviene attivare la procedura giudiziale. Per importi minori valutiamo prima diffida stragiudiziale, conciliazione obbligatoria o ricorso al Giudice di Pace. La valutazione costo/beneficio la facciamo caso per caso nel primo incontro.",
  },
  {
    q: 'Quanto dura un decreto ingiuntivo?',
    a: "Se il debitore non si oppone (entro 40 giorni dalla notifica), il decreto diventa esecutivo in 50-60 giorni complessivi. In caso di opposizione, si entra in giudizio ordinario con tempi 12-24 mesi. Per crediti documentali (fatture, assegni, riconoscimenti scritti) la quota di opposizioni infondate è bassa.",
  },
  {
    q: "E se il debitore non ha beni aggredibili?",
    a: "Si valuta indagine patrimoniale tramite accesso ai database (Pubblico Registro Automobilistico, banche dati immobiliari, conto corrente). Se il debitore è oggettivamente nullatenente, il credito può essere portato a perdita fiscalmente deducibile dopo aver ottenuto il decreto.",
  },
];

export default function RecuperoCreditiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <PracticeAreaTemplate
        chapter="03"
        number="04 / 06"
        title="Recupero"
        italicTitle="Crediti."
        intro="Procedure stragiudiziali e giudiziali per recuperare somme dovute. Lavoriamo molto con piccole e medie imprese della Bassa Veronese: il recupero crediti efficiente è una questione di flusso di cassa, non solo di principio. Per questo ogni pratica viene aperta solo dopo una valutazione costo/beneficio onesta."
        caseTypes={[
          'Diffide ad adempiere e solleciti formali',
          'Decreti ingiuntivi (anche europei per debitori UE)',
          "Procedure di pignoramento mobiliare e immobiliare",
          'Pignoramento presso terzi (conto corrente, stipendio)',
          'Indagine patrimoniale del debitore',
          'Recupero da debitori in procedura concorsuale',
          'Gestione massiva di crediti commerciali',
          'Insinuazioni al passivo di fallimenti',
        ]}
        process={[
          { step: 'I', title: 'Valutazione', description: 'Analisi dei documenti: fatture, contratti, riconoscimenti del debito. Stima realistica delle probabilità di recupero.' },
          { step: 'II', title: 'Stragiudiziale', description: 'Diffida formale e tentativo di accordo (anche con piano di rientro). Spesso recupera senza causa.' },
          { step: 'III', title: 'Giudiziale', description: 'Decreto ingiuntivo. Se non opposto, in due mesi si ha titolo esecutivo.' },
          { step: 'IV', title: 'Esecuzione', description: "Pignoramento mirato dove ci sono effettivi beni aggredibili. Niente azioni a vuoto che fanno solo accumulare costi." },
        ]}
        faqs={faqs}
        relatedKeywords={['decreto ingiuntivo', 'diffida', 'pignoramento', 'fatture']}
      />
    </>
  );
}
