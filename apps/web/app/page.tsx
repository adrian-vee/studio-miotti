import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { StudioByNumbers } from '@/components/sections/StudioByNumbers';
import { Manifesto } from '@/components/sections/Manifesto';
import { PullQuote } from '@/components/sections/PullQuote';
import { PracticeAreas } from '@/components/sections/PracticeAreas';
import { ApproachTimeline } from '@/components/sections/ApproachTimeline';
import { ResourcesTeaser } from '@/components/sections/ResourcesTeaser';
// TODO: riabilitare quando avremo testimonianze reali approvate
// dall'avvocato. Le testimonianze fittizie facevano apparire il
// sito non credibile.
// import { TestimonialsMarquee } from '@/components/sections/TestimonialsMarquee';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { LocalSchema } from '@/components/seo/LocalSchema';

export const metadata = {
  title: 'Avvocato a San Bonifacio · Avv. Massimiliano Miotti',
  description:
    'Studio legale a San Bonifacio (VR). Diritto civile, di famiglia, del lavoro e d\'impresa. Prima consulenza gratuita di 15 minuti.',
};

export default function HomePage() {
  return (
    <>
      <LocalSchema />
      <Hero />
      <TrustStrip />
      <StudioByNumbers />
      <Manifesto />
      <PullQuote />
      <PracticeAreas />
      <ApproachTimeline />
      <ResourcesTeaser />
      {/* <TestimonialsMarquee /> — disattivato finché non abbiamo testimonianze reali */}
      <ContactCTA />
    </>
  );
}
