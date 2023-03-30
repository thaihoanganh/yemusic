import { createVar, fallbackVar, styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../Theme/Theme.css';

export const mobileNavigationHeight = 56;

export const screenHeightUnitVar = createVar();

export const mobileLayoutStyles = styleVariants({
	root: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		height: `calc(${fallbackVar(screenHeightUnitVar, '1vh')} * 100)`,
		background: themeVars.palette.background,
	},
	main: {
		height: '100%',
	},
	playerControlerWrapper: {
		position: 'absolute',
		bottom: mobileNavigationHeight,
		left: 0,
		right: 0,
		background: themeVars.palette.background,
	},
	navigationWrapper: {
		position: 'absolute',
		zIndex: 1,
		bottom: 0,
		left: 0,
		right: 0,
		background: themeVars.palette.background,
	},
	navigation: {
		height: mobileNavigationHeight,
	},
});
