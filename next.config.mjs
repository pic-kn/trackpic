/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/music-player-maker',
  assetPrefix: '/music-player-maker/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
