import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Event thumbnails can come from any external host (upload services, CDNs, etc.)
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
