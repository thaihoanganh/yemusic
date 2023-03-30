import { createVar, styleVariants } from '@vanilla-extract/css';

import { createThemeVars, themeVars } from '../../Theme/Theme.css';

const loadingWrapperInheritPointerEvents = createVar();
const loadingWrapperInheritBackgroundColor = createVar();
const loadingWrapperInheritBorderRadius = createVar();
const loadingInheritVisibility = createVar();

export const loadingLayerProviderStyles = styleVariants({
	loading: {
		vars: {
			[loadingWrapperInheritPointerEvents]: 'none',
			[loadingWrapperInheritBackgroundColor]: themeVars.palette['secondary-container'],
			[loadingWrapperInheritBorderRadius]: themeVars.spacing.xsmall,
			[loadingInheritVisibility]: 'hidden',
		},
		transition: 'background-color 0.2s ease-in-out',
	},
	noLoading: {
		vars: {
			[loadingWrapperInheritPointerEvents]: 'auto',
			[loadingWrapperInheritBackgroundColor]: 'transparent',
			[loadingWrapperInheritBorderRadius]: '0',
			[loadingInheritVisibility]: 'visible',
		},
	},
});

export const loadingLayerStyles = styleVariants({
	wrapper: {
		display: 'inline-block',
	},
	wrapperFillContainer: {
		display: 'block',
		flexGrow: 1,
	},
	wrapperLoading: {
		vars: {
			[createThemeVars.stateLayerOpacity]: '0.36',
		},
		pointerEvents: 'none',
		backgroundColor: themeVars.palette['secondary-container'],
		borderRadius: themeVars.spacing.xsmall,
	},
	wrapperLoadingInherit: {
		pointerEvents: loadingWrapperInheritPointerEvents,
		backgroundColor: loadingWrapperInheritBackgroundColor,
		borderRadius: loadingWrapperInheritBorderRadius,
	},
	loading: {
		visibility: 'hidden',
	},
	loadingInherit: {
		visibility: loadingInheritVisibility,
	},
});
