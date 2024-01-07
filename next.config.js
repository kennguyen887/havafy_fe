const path = require('path');

const withRemoteRefresh = require('next-remote-refresh')({
  paths: [path.resolve(__dirname, 'src', 'contents')],
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'localhost', 'i.scdn.co', 'flowbite.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
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

module.exports = withRemoteRefresh(nextConfig);
