const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");

// if a gql endpoint isn't defined, default to localhost
const GUAC_GQL_ADDR =
  process.env.GUAC_GQL_ADDR || "http://localhost:8080/query";
// default to 'guac.yaml' in the same directory as this file
const GUAC_CONFIG_PATH =
  process.env.GUAC_CONFIG_PATH || path.resolve(process.cwd(), "guac.yaml");

let gqlEndpoint = GUAC_GQL_ADDR;

// try to read the config file
try {
  let fileContents = fs.readFileSync(GUAC_CONFIG_PATH, "utf8");
  let guacConfig = yaml.load(fileContents);
  gqlEndpoint = guacConfig["gql-addr"] || GUAC_GQL_ADDR;
} catch (err) {
  console.error(`Error reading guac.yaml file at ${GUAC_CONFIG_PATH}: `, err);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["react-cytoscapejs"],
  typescript: {
    ignoreBuildErrors: true,
  },
  rewrites: async () => {
    return [
      {
        source: "/api/graphql",
        destination: gqlEndpoint,
      },
    ];
  },
};

module.exports = nextConfig;
