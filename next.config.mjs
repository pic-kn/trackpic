/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/trackpic',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
