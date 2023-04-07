import { styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../Theme/Theme.css';

export const carouselStyles = styleVariants({
	root: {
		position: 'relative',
		display: 'flex',
	},
	wrapper: {
		overflowX: 'hidden',
		width: '100%',
	},
	wrapperScrollable: {
		overflowX: 'scroll',
	},
	content: {
		display: 'flex',
		transition: 'transform 0.5s ease',
	},
	navigation: {
		position: 'absolute',
		top: '50%',
	},
	navigationNext: {
		position: 'absolute',
		top: 'calc(50% - 20px)',
		right: 8,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 40,
		borderRadius: 999,
		background: themeVars.palette.background,
	},
	navigationPrevius: {
		position: 'absolute',
		top: 'calc(50% - 20px)',
		left: 8,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 40,
		height: 40,
		borderRadius: 999,
		background: themeVars.palette.background,
	},
});
