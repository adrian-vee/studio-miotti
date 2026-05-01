/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// Su GitHub Pages il sito vive su username.github.io/studio-miotti
// Quando passeremo a dominio custom (studiomiotti.it), basePath e assetPrefix andranno rimossi.
const repoName = 'studio-miotti';

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: {
    unoptimized: true, // GitHub Pages non ha image optimization
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'phosphor-react', 'motion'],
    typedRoutes: true,
  },
  env: {
    NEXT_PUBLIC_SITE_URL: isProd
      ? 'https://adrian-vee.github.io/studio-miotti'
      : 'http://localhost:3000',
  },
};

export default nextConfig;
