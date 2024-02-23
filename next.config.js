/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
