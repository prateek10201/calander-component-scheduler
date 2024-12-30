import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    // Remove all console logs
    removeConsole:
      process.env.NEXT_PUBLIC_NODE_ENV === "production" ? true : false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  staticPageGenerationTimeout: 180,
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
