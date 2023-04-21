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
  rewrites: async () => {
    return [
      {
        source: '/api/graphql',
        destination: 'http://localhost:8080/query'
      },
    ]
  }
}

module.exports = nextConfig
