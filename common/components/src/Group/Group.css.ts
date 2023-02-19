import { styleVariants } from '@vanilla-extract/css';

import { themeVars } from '../Theme/Theme.css';

export const groupBaseVariants = styleVariants({
	root: {
		display: 'flex',
	},
	grow: {
		flexGrow: 1,
	},
	noWrap: {
		flexWrap: 'nowrap',
	},
});

export const groupAlignItemsVariants = styleVariants({
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

export const groupJustifyContentVariants = styleVariants({
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

export const groupSpacingVariants = styleVariants({
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

export const groupPaddingHorizontalVariants = styleVariants({
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

export const groupPaddingVerticalVariants = styleVariants({
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
