import { createVar, fallbackVar, styleVariants } from '@vanilla-extract/css';

import { createThemeVars, themeVars } from '../../Theme/Theme.css';

export const mobileHeaderHeight = 56;
export const mobileBottomNavigationHeight = 56;
export const mobilePlayerControllerHeight = 56;

export const screenHeightUnitVar = createVar();

export const mobileLayoutStyles = styleVariants({
	root: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		height: `calc(${fallbackVar(screenHeightUnitVar, '1vh')} * 100)`,
	},
	main: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
	},
	mainHeader: {
		height: mobileHeaderHeight,
	},
	mainContent: {
		overflowY: 'auto',
		flexGrow: 1,
	},
	playerController: {
		position: 'absolute',
		bottom: mobileBottomNavigationHeight,
		left: 0,
		right: 0,
		background: themeVars.palette.background,
	},
	bottomNavigation: {
		vars: {
			[createThemeVars.stateLayerOpacity]: '0.06',
		},
		position: 'absolute',
		zIndex: 1,
		bottom: 0,
		left: 0,
		right: 0,
		background: themeVars.palette.primary,
	},
	bottomNavigationInner: {
		vars: {
			[createThemeVars.stateLayerOpacity]: '1',
		},
		height: mobileBottomNavigationHeight,
		minHeight: mobileBottomNavigationHeight,
	},
});
