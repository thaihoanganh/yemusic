import { styleVariants } from '@vanilla-extract/css';

import { mobileNavigationHeight } from '../../templates/MobileLayout/MobileLayout.css';

export const navigationBarStyles = styleVariants({
	root: {
		display: 'flex',
		height: mobileNavigationHeight,
		margin: 0,
		padding: 0,
	},
});

export const navigationBarItemStyles = styleVariants({
	root: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
