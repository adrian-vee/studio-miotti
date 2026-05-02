import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { OrganizationSchema } from '@/components/seo/OrganizationSchema';
import { LexAssistant } from '@/components/lex/LexAssistant';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';
import '@/styles/globals.css';

/**
 * Brand fonts (allineati al brief):
 *  · Playfair Display — titoli, autorevolezza editoriale calda
 *  · Inter — testo, leggibilità moderna a tutte le dimensioni
 */
const display = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display-google',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans-google',
  weight: ['300', '400', '500', '600', '700'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://studiomiotti.it';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F5F2' },
    { media: '(prefers-color-scheme: dark)', color: '#1E2A38' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Studio Legale Avv. Massimiliano Miotti — San Bonifacio (VR)',
    template: '%s · Studio Legale Miotti',
  },
  description:
    'Studio legale a San Bonifacio. Diritto come dialogo, non come distanza. Consulenza legale per privati e imprese nella Bassa Veronese e provincia di Verona.',
  keywords: [
    'avvocato san bonifacio',
    'studio legale san bonifacio',
    'avvocato verona',
    'avvocato bassa veronese',
    'consulenza legale verona',
    'massimiliano miotti',
  ],
  authors: [{ name: 'Avv. Massimiliano Miotti' }],
  creator: 'Adrian Vee · adrianvee.dev',
  publisher: 'Studio Legale Miotti',
  alternates: { canonical: SITE_URL, languages: { 'it-IT': SITE_URL } },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: SITE_URL,
    title: 'Studio Legale Avv. Massimiliano Miotti',
    description:
      'Diritto come dialogo, non come distanza. Studio legale a San Bonifacio (VR).',
    siteName: 'Studio Legale Miotti',
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Studio Legale Avv. Massimiliano Miotti',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Legale Avv. Massimiliano Miotti',
    description: 'Studio legale a San Bonifacio (VR). Bassa Veronese.',
    images: ['/og/default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'legal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${display.variable} ${sans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="grain antialiased">
        <a
          href="#main"
          className="absolute -top-12 left-4 z-[2000] rounded-sm bg-ink px-4 py-2 text-paper transition-all focus:top-4"
        >
          Salta al contenuto principale
        </a>

        <OrganizationSchema />

        <SmoothScrollProvider>
          <SiteHeader />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <SiteFooter />
        </SmoothScrollProvider>

        <LexAssistant />
      </body>
    </html>
  );
}
