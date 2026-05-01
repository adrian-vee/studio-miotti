import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { PracticeAreas } from '@/components/sections/PracticeAreas';
import { ApproachTimeline } from '@/components/sections/ApproachTimeline';
import { ResourcesTeaser } from '@/components/sections/ResourcesTeaser';
import { TestimonialsMarquee } from '@/components/sections/TestimonialsMarquee';
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
      <Manifesto />
      <PracticeAreas />
      <ApproachTimeline />
      <ResourcesTeaser />
      <TestimonialsMarquee />
      <ContactCTA />
    </>
  );
}
