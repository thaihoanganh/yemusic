const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin({
	identifiers: 'short',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@yemusic/components'],
	images: {
		domains: ['i.ytimg.com'],
	},
};

module.exports = withVanillaExtract(nextConfig);
