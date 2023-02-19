import { styleVariants } from '@vanilla-extract/css';

import { themePaletteKeys } from '../Theme/theme.config';
import { themeVars } from '../Theme/Theme.css';

export const stateLayers = themePaletteKeys.filter(type => /^[^o][^n]/.test(type));

const createStateLayerVariants = () => {
	const variants = stateLayers.reduce(
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

export const stateLayerBackgroundVariants = styleVariants(createStateLayerVariants());
