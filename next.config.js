/** @type {import('next').NextConfig} */
const nextConfig = {
  //pageExtensions: ['tsx'],
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
