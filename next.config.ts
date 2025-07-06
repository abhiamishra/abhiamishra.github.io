import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  devIndicators: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
