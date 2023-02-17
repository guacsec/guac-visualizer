/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['react-cytoscapejs'],
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
