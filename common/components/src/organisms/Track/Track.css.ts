/* eslint-disable @typescript-eslint/no-explicit-any */
import { styleVariants } from '@vanilla-extract/css';

import { createThemeVars, themeVars } from '../../Theme/Theme.css';

export const trackStyles = styleVariants({
	loading: {
		visibility: 'hidden',
		pointerEvents: 'none',
	},
	loadingWrapper: {
		vars: {
			[createThemeVars.stateLayerOpacity]: 0.045,
		} as any,
		position: 'relative',
		borderRadius: themeVars.spacing.xsmall,
		background: themeVars.palette.background,
		':before': {
			content: '""',
			position: 'absolute',
			inset: 0,
			borderRadius: themeVars.spacing.xsmall,
			background: themeVars.palette.secondary,
		},
	},
	image: {
		position: 'relative',
		width: 80,
		minWidth: 80,
		height: 45,
		minHeight: 45,
		transition: 'transform 0.45s',
	},
	imageWrapper: {
		overflow: 'hidden',
		position: 'relative',
		width: 80,
		minWidth: 80,
		height: 45,
		minHeight: 45,
		borderRadius: themeVars.spacing.xsmall,
	},
	imageOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)',
	},
	description: {
		overflow: 'hidden',
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 4,
	},
	actions: {
		display: 'flex',
		justifyContent: 'flex-end',
		gap: themeVars.spacing.small,
		width: 64,
	},
	duration: {
		width: 64,
		minWidth: 64,
		textAlign: 'right',
	},
});
