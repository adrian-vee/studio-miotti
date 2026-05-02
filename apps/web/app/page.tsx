import { Hero } from '@/components/sections/Hero';
import { Credibility } from '@/components/sections/Credibility';
import { Approach } from '@/components/sections/Approach';
import { PracticeAreas } from '@/components/sections/PracticeAreas';
import { Differentiation } from '@/components/sections/Differentiation';
import { DigitalInnovation } from '@/components/sections/DigitalInnovation';
import { ResourcesTeaser } from '@/components/sections/ResourcesTeaser';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { LocalSchema } from '@/components/seo/LocalSchema';

export const metadata = {
  title: 'Avvocato a San Bonifacio · Avv. Massimiliano Miotti',
  description:
    'Studio legale a San Bonifacio (VR). Soluzioni concrete per imprese e privati. Diritto civile, di famiglia, del lavoro, recupero crediti. Prima consulenza gratuita.',
};

export default function HomePage() {
  return (
    <>
      <LocalSchema />
      {/* 1. HERO — soluzioni concrete */}
      <Hero />
      {/* 2. CREDIBILITÀ — esperienza, clienti, territorio */}
      <Credibility />
      {/* 3. APPROCCIO — semplicità, velocità, trasparenza */}
      <Approach />
      {/* 4. AREE DI ATTIVITÀ — problemi concreti */}
      <PracticeAreas />
      {/* 5. DIFFERENZIAZIONE — rapidità + supporto digitale */}
      <Differentiation />
      {/* 6. INNOVAZIONE DIGITALE — strumenti, automazioni, GDPR */}
      <DigitalInnovation />
      {/* 7. CONTENUTI / GUIDE */}
      <ResourcesTeaser />
      {/* 8. CTA FINALE — Parla con un avvocato */}
      <ContactCTA />
    </>
  );
}
