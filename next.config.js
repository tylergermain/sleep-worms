/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.shopify.com'],
    // Local images in public/ work without config
  },
}

module.exports = nextConfig
