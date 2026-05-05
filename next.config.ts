import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/demos/ar",
        destination: "/demos/ar/index.html",
      },
      {
        source: "/demos/ap",
        destination: "/demos/ap/index.html",
      },
    ];
  },
};

export default nextConfig;
