import { styleVariants } from '@vanilla-extract/css';

import { themePaletteKeys } from '../../Theme/theme.config';
import { themeVars } from '../../Theme/Theme.css';

const createIconColorVariants = () => {
	const variants = themePaletteKeys.reduce(
		(acc, type) => {
			acc[type] = {
				color: themeVars.palette[type],
			};
			return acc;
		},
		{} as Record<
			string,
			{
				color: string;
			}
		>
	);

	return variants;
};

export const iconColorVariants = styleVariants(createIconColorVariants());

export const iconSizeVariants = styleVariants({
	xsmall: {
		width: 16,
		height: 16,
	},
	small: {
		width: 20,
		height: 20,
	},
	medium: {
		width: 24,
		height: 24,
	},
	large: {
		width: 40,
		height: 40,
	},
	xlarge: {
		width: 48,
		height: 48,
	},
});

export const iconOtherVariants = styleVariants({
	root: {
		fill: 'currentColor',
	},
});
