/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: false,
  swcMinify:       true,
  images:          {
    domains: [
      'picsum.photos',
      'media.graphassets.com'
    ]
  },
  compiler: {
    styledComponents: true
  },
  i18n
};

module.exports = nextConfig;
