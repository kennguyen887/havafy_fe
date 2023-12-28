/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const path = require('path');
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'localhost', 'i.scdn.co', 'flowbite.com'],
  },
  async redirects() {
    return [
      {
        source: '/library/absolute-import',
        destination: '/shorts/react/absolute-import',
        permanent: true,
      },
      {
        source: '/library',
        destination: '/shorts',
        permanent: true,
      },
      {
        source: '/library/:slug',
        destination: '/shorts/:slug',
        permanent: true,
      },
    ];
  },
  env: {
    defaultLocale: process.env.DEFAULT_LOCALE,
    isProduction: process.env.NODE_ENV === 'production',
  },
  output: 'standalone',
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.{js|jsx|ts|tsx}$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.alias['public'] = path.resolve('./public');

    return config;
  },
};

module.exports = nextConfig;
