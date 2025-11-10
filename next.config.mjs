import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Suppress only Contentlayer/webpack parsing warnings on Windows
    config.infrastructureLogging = {
      level: 'error',
    }
    return config
  },

  async headers() {
    return [
      {
        source: '/(.*)', // applies to all routes and assets
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default withContentlayer(nextConfig)
