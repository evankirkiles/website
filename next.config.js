/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'browsing-topics=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
