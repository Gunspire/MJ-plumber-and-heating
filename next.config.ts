import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "storage.vfwebdesign.co.uk" },
      { protocol: "https", hostname: "www.vfwebdesign.co.uk" },
      { protocol: "https", hostname: "vfwebdesign.co.uk" },
    ],
  },
};

export default nextConfig;
