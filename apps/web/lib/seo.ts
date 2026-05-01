import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://studiomiotti.it';

interface PageSeoInput {
  title: string;
  description: string;
  path: string; // es. "/aree-di-competenza/diritto-civile"
  ogImage?: string;
  noindex?: boolean;
  keywords?: string[];
}

/**
 * Genera metadata Next.js coerenti per una pagina interna.
 */
export function pageMeta(input: PageSeoInput): Metadata {
  const url = new URL(input.path, SITE_URL).toString();
  const ogImage = input.ogImage ?? '/og/default.jpg';

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical: url },
    robots: input.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: input.title }],
      type: 'website',
      locale: 'it_IT',
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [ogImage],
    },
  };
}

/**
 * Genera schema BreadcrumbList per una pagina.
 */
export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}

/**
 * Genera schema FAQPage per le FAQ delle pagine.
 */
export function faqSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

/**
 * Genera schema Service per le aree di competenza.
 */
export function serviceSchema(input: {
  name: string;
  description: string;
  serviceType: string;
  offers: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    provider: { '@id': `${SITE_URL}/#org` },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Provincia di Verona',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      itemListElement: input.offers.map((o) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: o },
      })),
    },
  };
}
