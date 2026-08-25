import type { NextConfig } from "next";

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com", "via.placeholder.com"],
  },
};

export default withPWA(nextConfig);
