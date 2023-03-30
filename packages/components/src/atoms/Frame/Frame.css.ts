import { styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../../Theme/Theme.css';

export const frameDirectionStyles = styleVariants({
	row: {
		display: 'flex',
		flexDirection: 'row',
	},
	column: {
		display: 'flex',
		flexDirection: 'column',
	},
});

export const frameAlignItemsStyles = styleVariants({
	['flex-start']: {
		alignItems: 'flex-start',
	},
	['flex-end']: {
		alignItems: 'flex-end',
	},
	center: {
		alignItems: 'center',
	},
});

export const frameJustifyContentStyles = styleVariants({
	['flex-start']: {
		justifyContent: 'flex-start',
	},
	['flex-end']: {
		justifyContent: 'flex-end',
	},
	center: {
		justifyContent: 'center',
	},
	['space-between']: {
		justifyContent: 'space-between',
	},
});

export const frameCornerRadiusStyles = styleVariants({
	xsmall: {
		borderRadius: themeVars.spacing.xsmall,
	},
	small: {
		borderRadius: themeVars.spacing.small,
	},
	medium: {
		borderRadius: themeVars.spacing.medium,
	},
	large: {
		borderRadius: themeVars.spacing.large,
	},
	xlarge: {
		borderRadius: themeVars.spacing.xlarge,
	},
});

export const frameSpacingStyles = styleVariants({
	xsmall: {
		gap: themeVars.spacing.xsmall,
	},
	small: {
		gap: themeVars.spacing.small,
	},
	medium: {
		gap: themeVars.spacing.medium,
	},
	large: {
		gap: themeVars.spacing.large,
	},
	xlarge: {
		gap: themeVars.spacing.xlarge,
	},
});

export const frameHorizontalPaddingStyles = styleVariants({
	xsmall: {
		paddingLeft: themeVars.spacing.xsmall,
		paddingRight: themeVars.spacing.xsmall,
	},
	small: {
		paddingLeft: themeVars.spacing.small,
		paddingRight: themeVars.spacing.small,
	},
	medium: {
		paddingLeft: themeVars.spacing.medium,
		paddingRight: themeVars.spacing.medium,
	},
	large: {
		paddingLeft: themeVars.spacing.large,
		paddingRight: themeVars.spacing.large,
	},
	xlarge: {
		paddingLeft: themeVars.spacing.xlarge,
		paddingRight: themeVars.spacing.xlarge,
	},
});

export const frameVerticalPaddingStyles = styleVariants({
	xsmall: {
		paddingTop: themeVars.spacing.xsmall,
		paddingBottom: themeVars.spacing.xsmall,
	},
	small: {
		paddingTop: themeVars.spacing.small,
		paddingBottom: themeVars.spacing.small,
	},
	medium: {
		paddingTop: themeVars.spacing.medium,
		paddingBottom: themeVars.spacing.medium,
	},
	large: {
		paddingTop: themeVars.spacing.large,
		paddingBottom: themeVars.spacing.large,
	},
	xlarge: {
		paddingTop: themeVars.spacing.xlarge,
		paddingBottom: themeVars.spacing.xlarge,
	},
});

export const frameOtherStyles = styleVariants({
	root: {
		overflow: 'hidden',
	},
	fillContainer: {
		flexGrow: 1,
	},
	noWrap: {
		flexWrap: 'nowrap',
	},
});
