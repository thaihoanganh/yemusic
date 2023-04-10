import { keyframes, styleVariants } from '@vanilla-extract/css';

import { themePaletteKeys } from '../../Theme/theme.config';
import { themeVars } from '../../Theme/Theme.css';

const rotate = keyframes({
	'0%': {
		transform: 'rotate(0deg)',
	},
	'100%': {
		transform: 'rotate(360deg)',
	},
});

const createLoaderColorStyles = () => {
	const variants = themePaletteKeys.reduce(
		(acc, type) => {
			acc[type] = {
				borderTopColor: themeVars.palette[type],
			};
			return acc;
		},
		{} as Record<
			string,
			{
				borderTopColor: string;
			}
		>
	);

	return variants;
};

export const loaderStyles = styleVariants({
	root: {
		borderRadius: 999,
		borderRightColor: 'transparent',
		borderBottomColor: 'transparent',
		borderLeftColor: 'transparent',
		borderStyle: 'solid',
		animationName: rotate,
		animationDuration: '1s',
		animationIterationCount: 'infinite',
		animationTimingFunction: 'linear',
	},
});

export const loaderSizeStyles = styleVariants({
	xsmall: {
		width: 18,
		height: 18,
		borderWidth: 2,
	},
	small: {
		width: 20,
		height: 20,
		borderWidth: 2,
	},
	medium: {
		width: 24,
		height: 24,
		borderWidth: 2,
	},
	large: {
		width: 40,
		height: 40,
		borderWidth: 3,
	},
	xlarge: {
		width: 48,
		height: 48,
		borderWidth: 3,
	},
});

export const loaderColorStyles = styleVariants(createLoaderColorStyles());
