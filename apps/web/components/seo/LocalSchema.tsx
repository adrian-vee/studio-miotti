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
    name: 'Avv. Massimiliano Miotti',
    image: 'https://studiomiotti.it/avvocato-miotti.jpg',
    telephone: '+39-045-9586116',
    email: '{{TODO_EMAIL}}',
    url: 'https://studiomiotti.it',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via S. Giovanni Bosco, 29/E',
      addressLocality: 'San Bonifacio',
      addressRegion: 'VR',
      postalCode: '37047',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.3919,
      longitude: 11.2747,
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
