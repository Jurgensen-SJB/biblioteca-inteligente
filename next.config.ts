import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.gutenberg.org' },
      { protocol: 'https', hostname: 'books.google.com' },
      { protocol: 'http', hostname: 'books.google.com' },
    ],
  },
};

export default nextConfig;
