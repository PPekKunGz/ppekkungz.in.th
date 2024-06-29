/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ["media.discordapp.net", "dimension-studio.net", "dms-api-gateway.mckimkung.in.th"],
      unoptimized: true,
      minimumCacheTTL: 60,
    },
    env: {
      apiUrl: 'http://localhost:3020',
    }
};

export default nextConfig;
