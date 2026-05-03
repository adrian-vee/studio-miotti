/**
 * Homepage — Studio Legale Miotti · v2026.4 (premium narrative).
 *
 * Sequenza:
 *  · Hero (blu notte, card workflow)
 *  · OperationalSystem (chiaro, dashboard editoriale)
 *  · PracticeAreas (blu notte, 8 aree con icone)
 *  · Territory (blu notte, mappa concettuale)
 *  · Differentiation (grigio chiaro, 4 fatti)
 *  · DigitalStudio (chiaro, dashboard mockup)
 *  · FinalCTA (blu notte, action panel)
 *
 * Header / Footer / LEX FAB sono in layout.tsx.
 */

import { Hero } from '@/components/sections/home/Hero';
import { OperationalSystem } from '@/components/sections/home/OperationalSystem';
import { PracticeAreas } from '@/components/sections/home/PracticeAreas';
import { Territory } from '@/components/sections/home/Territory';
import { Differentiation } from '@/components/sections/home/Differentiation';
import { DigitalStudio } from '@/components/sections/home/DigitalStudio';
import { FinalCTA } from '@/components/sections/home/FinalCTA';
import { LocalSchema } from '@/components/seo/LocalSchema';

export const metadata = {
  title: 'Avv. Massimiliano Miotti · Studio Legale a San Bonifacio (VR)',
  description:
    'Soluzioni legali concrete per imprese e privati. Risposta in 24–48 ore, costi indicati prima del mandato, gestione digitale delle pratiche. San Bonifacio, Verona.',
};

export default function HomePage() {
  return (
    <>
      <LocalSchema />
      <Hero />
      <OperationalSystem />
      <PracticeAreas />
      <Territory />
      <Differentiation />
      <DigitalStudio />
      <FinalCTA />
    </>
  );
}
