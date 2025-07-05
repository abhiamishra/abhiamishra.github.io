import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
