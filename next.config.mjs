/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'out',
    reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true,
        minimumCacheTTL: 60,
    },
};

export default nextConfig;
