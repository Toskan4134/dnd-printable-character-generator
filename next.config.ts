import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    basePath: '/dnd-printable-character-generator',
    output: 'export',
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
