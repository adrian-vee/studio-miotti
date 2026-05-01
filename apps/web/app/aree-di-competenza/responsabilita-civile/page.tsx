import { pageMeta, faqSchema } from '@/lib/seo';
import { PracticeAreaTemplate } from '@/components/sections/PracticeAreaTemplate';

export const metadata = pageMeta({
  title: 'Risarcimento Danni e Responsabilità Civile · Verona',
  description:
    "Sinistri stradali, infortuni, responsabilità sanitaria, danni a cose. Studio Legale Miotti, San Bonifacio (VR).",
  path: '/aree-di-competenza/responsabilita-civile/',
  keywords: ['avvocato risarcimento danni verona', 'incidente stradale avvocato san bonifacio', 'malasanità avvocato verona'],
});

const faqs = [
  {
    q: 'Cosa fare nelle prime ore dopo un incidente stradale?',
    a: "Compilare il CID con l'altro conducente (se possibile), fare fotografie alla scena, raccogliere testimonianze e dati di chi era presente, andare in pronto soccorso anche per piccoli traumi (per certificare il danno). Denunciare il sinistro alla propria assicurazione entro tre giorni. Una guida completa è disponibile gratuitamente in 'Risorse'.",
  },
  {
    q: 'Quanto tempo ho per chiedere il risarcimento per malasanità?',
    a: "Per la responsabilità contrattuale del medico (struttura ospedaliera): dieci anni dal fatto. Per la responsabilità extracontrattuale (singolo professionista): cinque anni. La prescrizione decorre dal momento in cui il danno si è manifestato e poteva essere riconosciuto. Conviene non aspettare: la documentazione invecchia e si perdono i testimoni.",
  },
  {
    q: 'Conviene accettare la proposta della compagnia assicurativa?',
    a: "Quasi mai senza una valutazione tecnica indipendente. Le compagnie liquidano in base a tabelle proprie, spesso inferiori a quelle del Tribunale di Milano (il riferimento giurisprudenziale italiano). Una perizia di parte e l'assistenza legale spesso aumentano il risarcimento del 30-100%, anche al netto delle parcelle.",
  },
];

export default function ResponsabilitaCivilePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <PracticeAreaTemplate
        chapter="03"
        number="06 / 06"
        title="Responsabilità"
        italicTitle="Civile."
        intro="Quando un danno alla persona o ai beni richiede di essere risarcito, lo Studio segue la pratica dall'inizio alla fine. Sinistri stradali, infortuni sul lavoro, responsabilità sanitaria, danni da prodotti, infiltrazioni e danni patrimoniali. Lavoriamo con un network di medici legali e periti per quantificare i danni in modo solido davanti alle assicurazioni."
        caseTypes={[
          'Sinistri stradali con lesioni o danni materiali',
          'Infortuni sul lavoro non coperti integralmente da INAIL',
          'Responsabilità medica e ospedaliera',
          'Danni da animali, da edifici, da cose in custodia',
          'Risarcimento danni morali e biologici',
          'Cadute in luoghi pubblici (insidia stradale, marciapiedi, esercizi commerciali)',
          'Mancata copertura assicurativa o liquidazione insufficiente',
          'Subrogazione delle assicurazioni private',
        ]}
        process={[
          { step: 'I', title: 'Quantificazione', description: 'Raccolta documenti medici e perizie. Stima tecnica del risarcimento secondo tabelle Milano/Roma.' },
          { step: 'II', title: 'Trattativa', description: 'Richiesta motivata alla compagnia assicurativa. Spesso bastano 60-90 giorni per ottenere offerta congrua.' },
          { step: 'III', title: 'Causa', description: "Se l'offerta è inadeguata, ricorso al Tribunale o procedura di accertamento tecnico preventivo." },
          { step: 'IV', title: 'Liquidazione', description: 'Incasso del risarcimento, valutazione spese rivalsa e detrazione fiscale eventuale.' },
        ]}
        faqs={faqs}
        relatedKeywords={['incidente', 'infortunio', 'risarcimento', 'malasanità']}
      />
    </>
  );
}
