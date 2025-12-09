import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Removed 'devIndicators' to fix Vercel Type Error
  experimental: {
    // keeping turbo config is usually fine, but if it fails next, remove this too
  },
};

export default nextConfig;