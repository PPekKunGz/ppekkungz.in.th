import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.discordapp.net", "dimension-studio.net", "dms-api-gateway.mckimkung.in.th", "cdn-dms.mckimkung.in.th", "api.adorable.io", "i.scdn.co"],
    unoptimized: true,
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
