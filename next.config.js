const fs = require('fs');
const yaml = require('js-yaml');

const GUAC_GQL_ADDR = process.env.GUAC_GQL_ADDR || 'http://localhost:8080/query';
const GUAC_CONFIG_PATH = process.env.GUAC_CONFIG_PATH;

let gqlEndpoint = GUAC_GQL_ADDR;

if (GUAC_CONFIG_PATH) {
  try {
    let fileContents = fs.readFileSync(GUAC_CONFIG_PATH, 'utf8');
    let guacConfig = yaml.load(fileContents);
    gqlEndpoint = guacConfig['gql-addr'] || GUAC_GQL_ADDR;
  } catch (err) {
    console.error('error reading guac.yaml file : ', err);
  }
}

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
        destination: gqlEndpoint,
      },
    ];
  },
};

module.exports = nextConfig;
