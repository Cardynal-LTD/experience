import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [{ hostname: "localhost" }, { hostname: "randomuser.me" }],
  },
  async rewrites() {
    const docsUrl = process.env.DOCS_URL || 'http://localhost:3001';
    return [
      {
        source: '/docs',
        destination: `${docsUrl}/docs/`,
      },
      {
        source: '/docs/:path*',
        destination: `${docsUrl}/docs/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
