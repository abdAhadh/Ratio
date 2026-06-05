import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Unicorn Studio scene JSON has texture paths hardcoded as
  // /assets/us-textures/... (matching how the Framer-exported site organised
  // its public folder). Our public/ folder mounts at the URL root, so the
  // files actually live at /us-textures/...  — rewrite the legacy /assets/
  // prefix to the real paths instead of duplicating the textures.
  async rewrites() {
    return [
      {
        source: "/assets/us-textures/:file*",
        destination: "/us-textures/:file*",
      },
      {
        source: "/assets/us-scenes/:file*",
        destination: "/us-scenes/:file*",
      },
    ];
  },

  /* Aggressive cache headers on the WebGL shader assets. These files
   * never change between deploys (they're vendored copies of the
   * UnicornStudio runtime + scene JSONs + textures), so a 1-year
   * immutable cache lets the browser serve them straight from disk
   * on back-navigation. Without this, every "click CTA → click back"
   * triggers a full re-download of ~510KB, leaving the shader's
   * <canvas> blank for a second or two while assets re-fetch.
   * Browsers honour `immutable` strictly — only a hard refresh
   * bypasses it. */
  async headers() {
    return [
      {
        source: "/unicornStudio.umd.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/us-scenes/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/us-textures/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
