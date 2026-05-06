import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/demos/ar",
        destination: "/demos/ar/index.html",
      },
      {
        source: "/ap-demo",
        destination: "/ap-demo/index.html",
      },
    ];
  },
};

export default nextConfig;
