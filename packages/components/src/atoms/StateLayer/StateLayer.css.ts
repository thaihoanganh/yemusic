import { styleVariants } from '@vanilla-extract/css';

import { themeBackgroundPaletteKeys } from '../../Theme/theme.config';
import { themeVars } from '../../Theme/Theme.css';

const createStateLayerStyles = () => {
	const variants = themeBackgroundPaletteKeys.reduce(
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

export const stateLayerBackgroundStyles = styleVariants(createStateLayerStyles());
