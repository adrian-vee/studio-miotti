/**
 * Homepage — Studio Legale Miotti.
 *
 * Composizione delle sezioni:
 *  01. Hero                — soluzioni concrete (asimmetrico, GSAP reveal)
 *  02. Credibility         — 4 card statement
 *  03. PracticeAreas       — 8 aree di attività
 *  04. Method              — timeline 5 step (ScrollTrigger progress)
 *  05. DigitalInnovation   — schema flusso animato (LEX NON in home)
 *  06. ResourcesTeaser     — 3 guide editoriali
 *  07. ContactCTA          — chiusura cobalt + contatti diretti
 *
 * Header / Footer sono in layout.tsx. LexFloatingButton via LexAssistant.
 */

import { Hero } from '@/components/sections/Hero';
import { Credibility } from '@/components/sections/Credibility';
import { PracticeAreas } from '@/components/sections/PracticeAreas';
import { Method } from '@/components/sections/Method';
import { Differentiation } from '@/components/sections/Differentiation';
import { DigitalInnovation } from '@/components/sections/DigitalInnovation';
import { ResourcesTeaser } from '@/components/sections/ResourcesTeaser';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { LocalSchema } from '@/components/seo/LocalSchema';

export const metadata = {
  title: 'Avv. Massimiliano Miotti · Studio Legale a San Bonifacio (VR)',
  description:
    'Studio Legale Miotti — soluzioni legali concrete per imprese e privati. Diritto civile, recupero crediti, contratti, lavoro, famiglia. San Bonifacio, Verona.',
};

export default function HomePage() {
  return (
    <>
      <LocalSchema />
      <Hero />
      <Credibility />
      <PracticeAreas />
      <Method />
      <Differentiation />
      <DigitalInnovation />
      <ResourcesTeaser />
      <ContactCTA />
    </>
  );
}
