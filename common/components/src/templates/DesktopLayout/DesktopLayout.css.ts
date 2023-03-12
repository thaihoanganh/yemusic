import { styleVariants } from '@vanilla-extract/css';

import { createThemeVars, themeVars } from '../../Theme/Theme.css';

export const sidebarWidth = 280;
export const asideWidth = 0;
export const playerControlsHeight = 110;

export const desktopLayoutStyles = styleVariants({
	layout: {
		overflow: 'hidden',
		display: 'flex',
		flexDirection: 'column',
		width: '100vw',
		height: '100vh',
		background: themeVars.palette.background,
	},
	layoutRow: {
		display: 'flex',
		flexGrow: 1,
	},
	layoutSidebarWrapper: {
		vars: {
			[createThemeVars.stateLayerOpacity]: '0.05',
		},
		background: themeVars.palette.primary,
	},
	LayoutSidebar: {
		vars: {
			[createThemeVars.stateLayerOpacity]: '1',
		},
		width: sidebarWidth,
		minWidth: sidebarWidth,
	},
	layoutMain: {
		overflowY: 'auto',
		flexGrow: 1,
		position: 'relative',
		width: `calc(100% - ${sidebarWidth}px - ${asideWidth}px)`,
		height: '80vh',
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
	layoutMainHeader: {
		position: 'sticky',
		zIndex: 1,
		top: 0,
		background: themeVars.palette.background,
	},
	layoutMainContent: {},
	layoutAside: {
		width: asideWidth,
		minWidth: asideWidth,
	},
	sidebarControlsWrapper: {
		vars: {
			[createThemeVars.stateLayerOpacity]: '0.08',
		},
		height: playerControlsHeight,
		minHeight: playerControlsHeight,
		borderTop: `1px solid ${themeVars.palette['outline']}`,
		background: themeVars.palette.primary,
	},
	sidebarControls: {
		vars: {
			[createThemeVars.stateLayerOpacity]: '1',
		},
		height: playerControlsHeight,
	},
});
