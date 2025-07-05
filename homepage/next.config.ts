import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,       // generate folder/index.html
  devIndicators: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
    ],
  },
} satisfies NextConfig;

export default nextConfig;
