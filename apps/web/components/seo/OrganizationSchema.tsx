/**
 * Schema.org per la homepage e il knowledge graph.
 * Renderizzato in head come <script type="application/ld+json">.
 */
export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'LocalBusiness'],
    '@id': 'https://studiomiotti.it/#org',
    name: 'Studio Legale Avv. Massimiliano Miotti',
    legalName: 'Studio Legale Avv. Massimiliano Miotti',
    url: 'https://studiomiotti.it',
    logo: 'https://studiomiotti.it/logo.png',
    image: 'https://studiomiotti.it/og/default.jpg',
    description:
      "Studio legale a San Bonifacio (VR). Diritto civile, di famiglia, del lavoro e d'impresa per privati e PMI della Bassa Veronese.",
    telephone: '+39-045-9586116',
    faxNumber: '+39-045-6105099',
    priceRange: '€€',
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
    areaServed: [
      { '@type': 'City', name: 'San Bonifacio' },
      { '@type': 'City', name: 'Soave' },
      { '@type': 'City', name: "Monteforte d'Alpone" },
      { '@type': 'City', name: 'Verona' },
      { '@type': 'AdministrativeArea', name: 'Provincia di Verona' },
    ],
    knowsLanguage: ['it', 'en'],
    founder: {
      '@type': 'Person',
      name: 'Massimiliano Miotti',
      honorificPrefix: 'Avv.',
    },
    memberOf: {
      '@type': 'Organization',
      name: 'Ordine degli Avvocati di Verona',
      url: 'https://www.ordineavvocati.vr.it',
    },
    sameAs: [
      // Da popolare con profili social verificati
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
