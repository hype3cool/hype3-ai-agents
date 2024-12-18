/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },    
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    scripts: {
        domains: ['terminal.jup.ag'],
    },
    experimental: {
        optimizePackageImports: [],
    },
};

module.exports = nextConfig;
