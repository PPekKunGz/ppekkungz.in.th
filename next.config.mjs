/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'out',
    reactStrictMode: true,
    swcMinify: false,
    images: {
        unoptimized: true,
        minimumCacheTTL: 60,
    },
};

export default nextConfig;
