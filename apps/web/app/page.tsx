/**
 * Homepage — Studio Legale Miotti · v2026.3 (cinematic narrative).
 *
 * Sequenza narrativa scuro → chiaro → scuro:
 *  01. Intro immersiva fullscreen (blu notte)
 *  02. Title reveal con linee disegnate (blu notte)
 *  03. Problemi reali, scroll lungo, sticky counter (blu notte → grigio)
 *  04. Controllo, dashboard astratta (chiaro)
 *  05. Territorio astratto, mappa concettuale (blu notte)
 *  06. Differenziazione, 4 statement editoriali (grigio chiaro caldo)
 *  07. Respiro, transizione cromatica (grigio → blu notte via scrub)
 *  08. CTA finale, magnetic + glow oro (blu notte)
 *
 * Header / Footer / LEX FAB sono in layout.tsx.
 */

import { IntroSection } from '@/components/sections/home/01_Intro';
import { TitleRevealSection } from '@/components/sections/home/02_TitleReveal';
import { ProblemsSection } from '@/components/sections/home/03_Problems';
import { ControlSection } from '@/components/sections/home/04_Control';
import { TerritorySection } from '@/components/sections/home/05_Territory';
import { DifferenceSection } from '@/components/sections/home/06_Difference';
import { BreathSection } from '@/components/sections/home/07_Breath';
import { FinalCTASection } from '@/components/sections/home/08_FinalCTA';
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
      <IntroSection />
      <TitleRevealSection />
      <ProblemsSection />
      <ControlSection />
      <TerritorySection />
      <DifferenceSection />
      <BreathSection />
      <FinalCTASection />
    </>
  );
}
