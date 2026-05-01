import { SITE_DATA } from '@/lib/site-data';

/**
 * Schema più ricco per la homepage.
 * Si aggiunge sopra OrganizationSchema (che è in layout.tsx).
 * Include orari di apertura, recensioni aggregate (quando saranno disponibili).
 */
export function LocalSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    '@id': 'https://studiomiotti.it/#attorney',
    name: SITE_DATA.legalName,
    image: 'https://studiomiotti.it/avvocato-miotti.jpg',
    telephone: SITE_DATA.phone,
    ...(SITE_DATA.email ? { email: SITE_DATA.email } : {}),
    url: 'https://studiomiotti.it',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_DATA.address.street,
      addressLocality: SITE_DATA.address.city,
      addressRegion: SITE_DATA.address.province,
      postalCode: SITE_DATA.address.cap,
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_DATA.geo.lat,
      longitude: SITE_DATA.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '13:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '15:00',
        closes: '19:00',
      },
    ],
    priceRange: '€€',
    areaServed: [
      { '@type': 'City', name: 'San Bonifacio' },
      { '@type': 'City', name: 'Verona' },
    ],
    knowsAbout: [
      'Diritto Civile',
      'Diritto di Famiglia',
      'Diritto del Lavoro',
      'Recupero Crediti',
      'Diritto Immobiliare',
      'Responsabilità Civile',
    ],
    knowsLanguage: ['it', 'en'],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Ordine degli Avvocati di Verona',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
