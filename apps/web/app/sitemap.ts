import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://studiomiotti.it';

const STATIC_PAGES = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/studio/', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/aree-di-competenza/', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/aree-di-competenza/diritto-civile/', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/aree-di-competenza/diritto-famiglia/', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/aree-di-competenza/diritto-lavoro/', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/aree-di-competenza/recupero-crediti/', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/aree-di-competenza/diritto-immobiliare/', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/aree-di-competenza/responsabilita-civile/', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/guide/', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/tariffe/', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/contatti/', priority: 0.8, changeFrequency: 'yearly' as const },
  { path: '/prenota/', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/privacy-policy/', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/cookie-policy/', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/termini-di-servizio/', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/accessibilita/', priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return STATIC_PAGES.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
