import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "dist",
  experimental: {
    turbo: {
      root: ".",
    },
  },
};

export default nextConfig;
