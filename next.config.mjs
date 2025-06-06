/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/telia_e-shop',
  assetPrefix: '/telia_e-shop/',
  trailingSlash: true,
  experimental: {
    optimizeCss: true,
  }
}

export default nextConfig
