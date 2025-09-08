/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com', 'via.placeholder.com'],
    unoptimized: true,
  },
  // Disable file-system routing for pages directory
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mdx'],
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  // Disable the static cache for development
  generateEtags: false,
  // Disable the filesystem cache for development
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Set the output file tracing root
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;
