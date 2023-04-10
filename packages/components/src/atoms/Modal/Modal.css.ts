import { styleVariants } from '@vanilla-extract/css';

import { createThemeVars, themeVars } from '../../Theme/Theme.css';

export const modalStyles = styleVariants({
	root: {
		position: 'fixed',
		zIndex: 999,
		inset: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: themeVars.spacing.large,
	},
	mask: {
		vars: {
			[createThemeVars.stateLayerOpacity]: '0.36',
		},
		position: 'absolute',
		inset: 0,
		background: themeVars.palette.scrim,
	},
	modalWrapper: {
		overflow: 'hidden',
		position: 'absolute',
		minWidth: 360,
		maxWidth: 'calc(100vw - 32px)',
		borderRadius: themeVars.spacing.medium,
		background: themeVars.palette.background,
	},
	modal: {
		vars: {
			[createThemeVars.stateLayerOpacity]: '0.12',
		},
		background: themeVars.palette.primary,
	},
	modalInner: {
		vars: {
			[createThemeVars.stateLayerOpacity]: '1',
		},
		padding: themeVars.spacing.large,
	},
});
