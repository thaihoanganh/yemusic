import { style, styleVariants } from '@vanilla-extract/css';

import { createThemeVars, themeVars } from '../../Theme/Theme.css';
import { typographySizeStyles } from '../Typography/Typography.css';

export const baseButtonColors = {
	primary: 'on-primary',
	['primary-dynamic']: 'on-primary-dynamic',
	['primary-container']: 'on-primary-container',
	['primary-container-dynamic']: 'on-primary-container-dynamic',
	secondary: 'on-secondary',
	['secondary-dynamic']: 'on-secondary-dynamic',
	['secondary-container']: 'on-secondary-container',
	['secondary-container-dynamic']: 'on-secondary-container-dynamic',
	tertiary: 'on-tertiary',
	['tertiary-dynamic']: 'on-tertiary-dynamic',
	['tertiary-container']: 'on-tertiary-container',
	['tertiary-container-dynamic']: 'on-tertiary-container-dynamic',
	error: 'on-error',
	['error-dynamic']: 'on-error-dynamic',
	['error-container']: 'on-error-container',
	['error-container-dynamic']: 'on-error-container-dynamic',
} as const;

export const baseButtonStyle = style({
	display: 'inline-flex',
	alignItems: 'center',
	border: 'none',
	textAlign: 'inherit',
	textDecoration: 'none',
	lineHeight: 'inherit',
	userSelect: 'none',
	WebkitTapHighlightColor: 'transparent',
	':focus': {
		outline: 'none',
	},
	':disabled': {
		opacity: 0.36,
		cursor: 'not-allowed',
	},
});

export const baseButtonSizeStyles = styleVariants({
	small: [
		typographySizeStyles.body.small,
		{
			padding: `${themeVars.spacing.xsmall} ${themeVars.spacing.small}`,
		},
	],
	medium: [
		typographySizeStyles.body.medium,
		{
			padding: `${themeVars.spacing.small} ${themeVars.spacing.medium}`,
		},
	],
	large: [
		typographySizeStyles.body.large,
		{
			padding: `${themeVars.spacing.medium} ${themeVars.spacing.large}`,
		},
	],
});

export const baseButtonRoundedStyles = styleVariants({
	none: {
		borderRadius: 0,
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
});

export const filledButtonStyles = styleVariants({
	root: {
		position: 'relative',
		overflow: 'hidden',
		background: themeVars.palette.surface,
	},
	button: [
		baseButtonStyle,
		{
			gap: themeVars.spacing.xsmall,
		},
	],
	overlay: {
		vars: {
			[createThemeVars.stateLayerOpacity]: '0',
		},
		position: 'absolute',
		inset: 0,
		cursor: 'pointer',
	},
	fullWidth: {
		width: '100%',
		minWidth: '100%',
	},
});

const createFilledButtonColorStyles = () => {
	const variants = Object.keys(baseButtonColors).reduce(
		(acc, type) => {
			acc[type] = {
				background: themeVars.palette[type as keyof typeof baseButtonColors],
				color: themeVars.palette[baseButtonColors[type as keyof typeof baseButtonColors]],
			};
			return acc;
		},
		{} as Record<
			string,
			{
				background: string;
				color: string;
			}
		>
	);

	return variants;
};

export const filledButtonColorStyles = styleVariants(createFilledButtonColorStyles());

export const iconButtonStyles = styleVariants({
	root: [
		baseButtonStyle,
		{
			overflow: 'hidden',
			display: 'inline-block',
			padding: 0,
			borderRadius: 999,
			background: 'transparent',
		},
	],
	icon: [
		{
			display: 'flex',
			justifyContent: 'center',
			aglinItems: 'center',
			width: 32,
			height: 32,
			background: 'transparent',
			cursor: 'pointer',
		},
	],
});

export const unstyledButtonStyles = styleVariants({
	wrapper: {
		background: themeVars.palette.surface,
	},
	root: [
		baseButtonStyle,
		{
			padding: 0,
			background: 'transparent',
			cursor: 'pointer',
			color: themeVars.palette['on-surface'],
			WebkitTapHighlightColor: 'transparent',
		},
	],
	fullWidth: {
		width: '100%',
		minWidth: '100%',
	},
});
