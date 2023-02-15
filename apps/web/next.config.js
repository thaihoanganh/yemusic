const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@yemusic/components'],
};

module.exports = withVanillaExtract(nextConfig);
