import { styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../Theme/Theme.css';

export const desktopSearchStyles = styleVariants({
	search: {
		display: 'flex',
		alignItems: 'center',
		gap: themeVars.spacing.xsmall,
		width: 420,
		height: 44,
		paddingRight: themeVars.spacing.small,
		paddingLeft: themeVars.spacing.small,
		border: `1px solid ${themeVars.palette['outline-variant']}`,
		borderRadius: 999,
	},
	searchFocused: {
		borderColor: themeVars.palette['primary'],
	},
	searchInput: {
		flexGrow: 1,
		outline: 'none',
		border: 'none',
		backgroundColor: 'transparent',
		color: themeVars.palette['on-surface'],
		'::placeholder': {
			color: themeVars.palette['on-surface-variant'],
		},
	},
});

export const mobileSearch = styleVariants({
	root: {
		display: 'flex',
		alignItems: 'center',
		gap: themeVars.spacing.xsmall,
		width: '100%',
	},
	searchInput: {
		flexGrow: 1,
		outline: 'none',
		border: 'none',
		backgroundColor: 'transparent',
		color: themeVars.palette['on-surface'],
		'::placeholder': {
			color: themeVars.palette['on-surface-variant'],
		},
	},
});
