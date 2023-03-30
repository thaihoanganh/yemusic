import { styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../Theme/Theme.css';

export const logoStyles = styleVariants({
	root: {
		display: 'flex',
		alignItems: 'center',
		fontFamily: "'Roboto Slab', serif",
		color: themeVars.palette['on-surface'],
	},
	symbol: {
		width: 32,
		height: 32,
		fill: 'currentColor',
		color: themeVars.palette.primary,
	},
	text: {
		marginLeft: 8,
		fontSize: 24,
		fontWeight: 600,
	},
	textSub: {
		marginTop: 8,
		fontSize: 14,
		fontWeight: 400,
	},
});
