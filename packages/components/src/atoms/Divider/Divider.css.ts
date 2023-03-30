import { styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../Theme/Theme.css';

export const dividerOrientationStyles = styleVariants({
	horizontal: {
		width: '100%',
		height: '1px',
		background: themeVars.palette['outline-variant'],
	},
	vertical: {
		width: '1px',
		height: '100%',
		background: themeVars.palette['outline-variant'],
	},
});
