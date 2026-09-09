/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/music-player-maker',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
