import { pageMeta, faqSchema } from '@/lib/seo';
import { PracticeAreaTemplate } from '@/components/sections/PracticeAreaTemplate';

export const metadata = pageMeta({
  title: 'Avvocato Diritto del Lavoro · Verona · San Bonifacio',
  description:
    "Impugnazione licenziamenti, mobbing, vertenze sindacali, contratti di lavoro. Tutela del lavoratore e dell'azienda.",
  path: '/aree-di-competenza/diritto-lavoro/',
  keywords: ['impugnazione licenziamento verona', 'avvocato lavoro verona', 'mobbing avvocato verona'],
});

const faqs = [
  {
    q: 'Quanti giorni ho per impugnare un licenziamento?',
    a: "Sessanta giorni dalla ricezione della comunicazione di licenziamento per impugnarlo stragiudizialmente con lettera scritta. Successivamente, 180 giorni per depositare il ricorso in Tribunale. Si tratta di termini di decadenza: superati, il diritto di impugnazione si estingue, anche se il licenziamento era illegittimo.",
  },
  {
    q: 'Posso fare causa per mobbing?',
    a: "Sì, ma serve documentazione solida: condotte ostili reiterate nel tempo, da parte di superiori o colleghi, con intento persecutorio. Servono testimonianze, documenti, eventuali certificazioni mediche di danno biologico/psichico. Non ogni conflitto sul lavoro è mobbing: una valutazione preliminare aiuta a capire se ci sono i presupposti.",
  },
  {
    q: "Cosa succede se l'azienda non paga lo stipendio?",
    a: "Si può procedere con diffida formale, decreto ingiuntivo, e in caso di reiterato inadempimento anche con dimissioni per giusta causa (con diritto all'NASPI). Se l'azienda è in difficoltà economica si valuta il Fondo di Garanzia INPS per recuperare le spettanze.",
  },
];

export default function DirittoLavoroPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <PracticeAreaTemplate
        chapter="03"
        number="03 / 06"
        title="Diritto del"
        italicTitle="Lavoro."
        intro="Tuteliamo lavoratori e datori di lavoro nelle controversie individuali e collettive. Dall'impugnazione del licenziamento alla redazione di contratti, dal mobbing al recupero di mensilità arretrate, fino al contenzioso previdenziale con INPS."
        caseTypes={[
          'Impugnazione di licenziamenti individuali',
          'Mobbing, demansionamento, condotte vessatorie',
          'Vertenze per mansioni, qualifiche, retribuzioni arretrate',
          'Contratti di lavoro: redazione, modifica, valutazione',
          'Trasferimenti, sospensioni, sanzioni disciplinari',
          'Contenzioso previdenziale (INPS, INAIL)',
          'Conciliazioni in sede sindacale o avanti la DTL',
          'Assistenza alle imprese in materia giuslavoristica',
        ]}
        process={[
          { step: 'I', title: 'Verifica termini', description: 'Per il licenziamento i termini di impugnazione sono perentori. Prima cosa: capire se siamo nei tempi.' },
          { step: 'II', title: 'Diffida', description: 'Lettera formale al datore di lavoro come tentativo stragiudiziale. Spesso risolve.' },
          { step: 'III', title: 'Conciliazione', description: 'Quando possibile, accordo in sede sindacale: tempi rapidi e risultati concreti.' },
          { step: 'IV', title: 'Causa', description: 'Ricorso in Tribunale del Lavoro se il datore non collabora. Tempi medi 6-18 mesi in primo grado.' },
        ]}
        faqs={faqs}
        relatedKeywords={['licenziamento', 'mobbing', 'vertenze', 'INPS']}
      />
    </>
  );
}
