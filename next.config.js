const fs = require('fs');
const yaml = require('js-yaml');

// defaults to local
let gqlAddr = 'http://localhost:8080/query';
const GUAC_GQL_ADDR = process.env.GUAC_GQL_ADDR;

try {
  let fileContents = fs.readFileSync(GUAC_GQL_ADDR, 'utf8');
  let guacConfig = yaml.safeLoad(fileContents);

  gqlAddr = guacConfig['gql-addr'];
} catch (e) {
  console.log(e);
}

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
        destination: gqlAddr,
      },
    ]
  }
}

module.exports = nextConfig;
