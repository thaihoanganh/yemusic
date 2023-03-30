import { styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../Theme/Theme.css';

export const desktopPlayerControlsStyles = styleVariants({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		height: '100%',
	},
	trackInfo: {
		overflow: 'hidden',
		display: 'flex',
		gap: themeVars.spacing.small,
		paddingTop: themeVars.spacing.small,
		paddingLeft: themeVars.spacing.medium,
		paddingBottom: themeVars.spacing.small,
		paddingRight: themeVars.spacing.medium,
		width: '25%',
		minWidth: '25%',
	},
	thumnbailWrapper: {
		overflow: 'hidden',
		position: 'relative',
		width: 128,
		minWidth: 128,
		height: 72,
		borderRadius: themeVars.spacing.xsmall,
		border: `1px solid ${themeVars.palette['outline-variant-dynamic']}`,
	},
	thumbnail: {
		position: 'absolute',
		inset: 0,
	},
	trackControls: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		gap: themeVars.spacing.small,
		width: '40%',
		minWidth: '40%',
		paddingTop: themeVars.spacing.small,
		paddingLeft: themeVars.spacing.medium,
		paddingBottom: themeVars.spacing.small,
		paddingRight: themeVars.spacing.medium,
	},
	trackMore: {
		display: 'flex',
		gap: themeVars.spacing.medium,
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: '25%',
		minWidth: '25%',
		paddingTop: themeVars.spacing.small,
		paddingLeft: themeVars.spacing.medium,
		paddingBottom: themeVars.spacing.small,
		paddingRight: themeVars.spacing.medium,
	},
});

export const mobilePlayerControlsStyles = styleVariants({
	sliderColapsed: {
		height: 2,
		background: themeVars.palette['surface-variant-dynamic'],
	},
	sliderColapsedValue: {
		height: 2,
		background: themeVars.palette['primary-dynamic'],
	},
});
