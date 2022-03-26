/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true, // reference : https://nextjs.org/docs/advanced-features/output-file-tracing
  },
};

module.exports = nextConfig
