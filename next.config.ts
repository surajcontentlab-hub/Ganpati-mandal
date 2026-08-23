import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com", "via.placeholder.com"],
  },
};

export default nextConfig;
