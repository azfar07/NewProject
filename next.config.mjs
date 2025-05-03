/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // allow images from your Strapi instance
      domains: ['localhost'],
      // if you need to be more exact you can use remotePatterns:
      // remotePatterns: [
      //   {
      //     protocol: 'http',
      //     hostname: 'localhost',
      //     port: '1337',
      //     pathname: '/uploads/**',
      //   },
      // ],
    },
  };

export default nextConfig;
