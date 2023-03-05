import { styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../Theme/Theme.css';

export const sliderStyles = styleVariants({
	wrapper: {
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		height: 12,
	},
	sliderInput: {
		position: 'relative',
		appearance: 'none',
		WebkitAppearance: 'none',
		width: '100%',
		height: 4,
		margin: 0,
		borderRadius: 999,
		background: themeVars.palette['outline-variant'],
		transition: 'background-color 0.2s ease-in-out',
		'::-webkit-slider-thumb': {
			appearance: 'none',
			width: 0,
			height: 0,
			background: themeVars.palette['primary'],
			cursor: 'pointer',
		},
		'::-moz-range-thumb': {
			width: 0,
			height: 0,
			background: themeVars.palette['primary'],
			cursor: 'pointer',
		},
		selectors: {
			'&:hover::-webkit-slider-thumb': {
				width: 12,
				height: 12,
				borderRadius: 999,
			},
			'&:hover::-moz-range-thumb': {
				width: 12,
				height: 12,
				borderRadius: 999,
			},
		},
	},
	sliderValue: {
		position: 'absolute',
		background: themeVars.palette['primary'],
		height: 4,
		borderRadius: 999,
		pointerEvents: 'none',
	},
});
