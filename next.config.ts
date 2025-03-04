import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/product/:barcode",
        destination: "https://products-test-aci.onrender.com/product/:barcode",
      },
    ];
  },
};

export default nextConfig;
