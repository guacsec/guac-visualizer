/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["react-cytoscapejs"],
  typescript: {
    ignoreBuildErrors: true,
  },
  // FIXME: Instead of disabling this, we should fix the problem. See
  // https://github.com/guacsec/guac-visualizer/issues/98
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
