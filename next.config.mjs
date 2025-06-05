/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Only add basePath and assetPrefix in production
  ...(process.env.NODE_ENV === 'production' ? {
    basePath: '/e-shop_frontend',
    assetPrefix: '/e-shop_frontend/',
  } : {})
}

export default nextConfig
