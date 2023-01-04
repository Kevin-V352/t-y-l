/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate');

const nextConfig = nextTranslate({
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
  }
});

module.exports = nextConfig;
