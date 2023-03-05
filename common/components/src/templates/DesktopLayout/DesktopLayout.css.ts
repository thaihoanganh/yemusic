import { styleVariants } from '@vanilla-extract/css';

import { themeConfigs } from '../../Theme/theme.config';
import { themeVars } from '../../Theme/Theme.css';

export const desktopLayoutStyles = styleVariants({
	root: {
		display: 'flex',
		height: '100vh',
	},
	sidebar: {
		width: 280,
		minWidth: 280,
	},
	main: {
		position: 'relative',
		flexGrow: 1,
	},
	mainHeader: {
		position: 'sticky',
		top: 0,
	},
	playerControls: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		left: 0,
		padding: themeConfigs.spacing.large,
	},
	aside: {
		width: 420,
		minWidth: 420,
		borderLeft: `1px solid ${themeVars.palette['outline-variant']}`,
	},
});
