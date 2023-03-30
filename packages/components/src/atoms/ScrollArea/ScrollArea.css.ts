import { styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../Theme/Theme.css';

export const scrollAreaStyles = styleVariants({
	root: {
		overflowY: 'auto',
		'::-webkit-scrollbar': {
			width: 8,
		},
		'::-webkit-scrollbar-track': {
			background: 'transparent',
		},
		'::-webkit-scrollbar-thumb': {
			borderRadius: 999,
			border: `2px solid ${themeVars.palette.background}`,
			background: themeVars.palette['outline-variant'],
		},
		selectors: {
			'&::-webkit-scrollbar-thumb:hover': {
				background: themeVars.palette['outline'],
			},
		},
	},
});
