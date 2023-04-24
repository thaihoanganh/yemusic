import { styleVariants } from '@vanilla-extract/css';

import { createThemeVars, themeVars } from '../../Theme/Theme.css';

export const sidebarWidth = 280;
export const asideWidth = 380;
export const playerControlsHeight = 100;

export const desktopLayoutStyles = styleVariants({
	root: {
		overflow: 'hidden',
		display: 'flex',
		width: '100vw',
		height: '100vh',
		background: themeVars.palette.background,
	},
	sidebar: {
		vars: {
			[createThemeVars.stateLayerOpacity]: '0.05',
		},
		background: themeVars.palette.primary,
		width: sidebarWidth,
		minWidth: sidebarWidth,
	},
	sidebarInner: {
		vars: {
			[createThemeVars.stateLayerOpacity]: '1',
		},
		height: '100%',
	},
	main: {
		overflowY: 'auto',
		flexGrow: 1,
	},
	mainHeader: {
		position: 'sticky',
		zIndex: 1,
		top: 0,
		background: themeVars.palette.background,
	},
	mainContent: {
		flexGrow: 1,
		paddingTop: themeVars.spacing.xsmall,
		paddingBottom: themeVars.spacing.xsmall,
		paddingRight: themeVars.spacing.large,
		paddingLeft: themeVars.spacing.large,
	},
	aside: {
		borderLeft: `1px solid ${themeVars.palette['outline-variant']}`,
	},
	playerControler: {
		vars: {
			[createThemeVars.stateLayerOpacity]: '0.06',
		},
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		height: playerControlsHeight,
		minHeight: playerControlsHeight,
		borderTop: `1px solid ${themeVars.palette['outline']}`,
		background: themeVars.palette['primary-dynamic'],
	},
	playerControlerInner: {
		vars: {
			[createThemeVars.stateLayerOpacity]: '1',
		},
	},
});
