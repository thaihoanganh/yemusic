import { style } from '@vanilla-extract/css';

import { themeVars } from '../Theme/Theme.css';

export const unstyledButtonVariant = style({
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
});
