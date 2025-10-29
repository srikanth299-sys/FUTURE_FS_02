import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 👈 enables static export (replaces next export)
  images: {
    unoptimized: true, // 👈 required if you use <Image> components
  },
};

export default nextConfig;
