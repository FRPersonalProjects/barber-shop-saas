/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/**', // O asterisco duplo é vital para aceitar o /f/
      },
    ],
  },
};

export default nextConfig;