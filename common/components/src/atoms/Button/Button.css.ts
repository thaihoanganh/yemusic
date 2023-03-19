import { styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../Theme/Theme.css';

export const unstyledButtonVariants = styleVariants({
	root: {
		display: 'inline-flex',
		alignItems: 'center',
		background: 'none',
		border: 'none',
		padding: 0,
		margin: 0,
		cursor: 'pointer',
		color: themeVars.palette['on-surface'],
		font: 'inherit',
		textAlign: 'inherit',
		textDecoration: 'none',
		lineHeight: 'inherit',
		userSelect: 'none',
		WebkitTapHighlightColor: 'transparent',
		':focus': {
			outline: 'none',
		},
	},
	fullWidth: {
		width: '100%',
	},
});
