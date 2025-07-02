import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Restaurant Management System Configuration
  experimental: {
    reactCompiler: false,
    serverComponentsExternalPackages: ['sharp'],
  },

  // Image optimization for restaurant photos and media
  images: {
    domains: ['localhost', 'your-domain.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers for restaurant data protection
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Webpack configuration for restaurant management modules
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },

  // Environment variables for restaurant configuration
  env: {
    RESTAURANT_NAME: process.env.RESTAURANT_NAME,
    RESTAURANT_TIMEZONE: process.env.RESTAURANT_TIMEZONE,
    RATING_SCALE_MAX: process.env.RATING_SCALE_MAX,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
