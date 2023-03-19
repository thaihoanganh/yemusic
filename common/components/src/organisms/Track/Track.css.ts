import { styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../Theme/Theme.css';

export const trackStyles = styleVariants({
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
		alignItems: 'center',
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

export const trackMenuStyles = styleVariants({
	modal: {
		position: 'fixed',
		zIndex: 9,
		inset: 0,
	},
	modalMask: {
		position: 'absolute',
		inset: 0,
	},
	modalMenu: {
		overflow: 'hidden',
		position: 'absolute',
		top: 0,
		left: 0,
		border: `1px solid ${themeVars.palette['outline-variant']}`,
		borderRadius: 4,
		background: themeVars.palette.surface,
	},
});
