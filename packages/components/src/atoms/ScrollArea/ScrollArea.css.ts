import { styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../Theme/Theme.css';

export const scrollAreaStyles = styleVariants({
	root: {
		overflowY: 'scroll',
		'::-webkit-scrollbar': {
			width: 8,
		},
		'::-webkit-scrollbar-track': {
			background: 'transparent',
		},
	},
	visibleScrollbar: {
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
	fillContainer: {
		width: '100%',
		minWidth: '100%',
		height: '100%',
		minHeight: '100%',
	},
});
