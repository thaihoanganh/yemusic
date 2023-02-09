module.exports = {
	extends: [
		'next/core-web-vitals',
		require.resolve('@yemusic/eslint-configs'),
		require.resolve('@yemusic/eslint-configs/react'),
	],
	rules: {
		'@next/next/no-html-link-for-pages': ['error', 'apps/web/src/pages/'],
	},
};
