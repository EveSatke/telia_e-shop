/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/telia_e-shop',
  assetPrefix: '/telia_e-shop/',
  trailingSlash: true,
  distDir: 'out',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.publicPath = '/telia_e-shop/_next/';
    }
    return config;
  },
  experimental: {
    appDir: true,
  }
}

export default nextConfig
