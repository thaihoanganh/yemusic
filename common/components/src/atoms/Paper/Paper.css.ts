import { styleVariants } from '@vanilla-extract/css';

import { themePaletteKeys } from '../../Theme/theme.config';
import { themeVars } from '../../Theme/Theme.css';

export const paperBackgrounds = themePaletteKeys.filter(type => /^[^o][^n]/.test(type));

const createPaperBackgroundVariants = () => {
	const variants = paperBackgrounds.reduce(
		(acc, type) => {
			acc[type] = {
				backgroundColor: themeVars.palette[type],
			};
			return acc;
		},
		{} as Record<
			string,
			{
				backgroundColor: string;
			}
		>
	);

	return variants;
};

export const paperBackgroundVariants = styleVariants({
	...createPaperBackgroundVariants(),
});

export const paperOtherVariants = styleVariants({
	bordered: {
		border: `1px solid ${themeVars.palette.outline}`,
	},
});
