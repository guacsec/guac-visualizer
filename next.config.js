const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// if not defined, default to localhost
let gqlAddr = process.env.GUAC_GQL_ADDR || 'http://localhost:8080/query';

const homeDir = require('os').homedir();
const currentDir = process.cwd();
const configFileName = 'guac.yaml';
const possiblePaths = [path.join(homeDir, configFileName), path.join(currentDir, configFileName)];

// if yaml file is found at current woring dir or home dir, use it
for (const configPath of possiblePaths) {
  if (fs.existsSync(configPath)) {
    console.log(`Using config file: ${configPath}`);
    const fileContents = fs.readFileSync(configPath, 'utf8');
    const data = yaml.safeLoad(fileContents);
    if (data['gql-addr']) {
      gqlAddr = data['gql-addr'];
      break;
    }
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
        destination: gqlAddr
      },
    ]
  }
};

module.exports = nextConfig;
