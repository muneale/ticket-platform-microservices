/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    webpack: (config) => {
        config.watchOptions.poll = 300;
        return config;
    },
}

module.exports = nextConfig
