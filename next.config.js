/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
};

module.exports = nextConfig;
