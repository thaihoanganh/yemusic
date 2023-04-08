import { createVar, fallbackVar, globalStyle } from '@vanilla-extract/css';

import { ThemeColors, themePaletteKeys, themeConfigs } from './theme.config';

export const backgroundVar = createVar();

export const createThemeVars = {
	spacing: {
		xsmall: createVar(),
		small: createVar(),
		medium: createVar(),
		large: createVar(),
		xlarge: createVar(),
	},
	palette: themePaletteKeys.reduce((acc, key) => {
		acc[key] = createVar();
		return acc;
	}, {} as Record<ThemeColors, string>),
	stateLayerOpacity: createVar(),
} as const;

const themePaletteColors = themePaletteKeys.reduce((acc, key) => {
	acc[key] = `rgb(${fallbackVar(
		createThemeVars.palette[key],
		`${themeConfigs.palette[key][0]}, ${themeConfigs.palette[key][0]}, ${themeConfigs.palette[key][0]}`
	)}, ${fallbackVar(createThemeVars.stateLayerOpacity, '1')})`;
	return acc;
}, {} as Record<ThemeColors, string>);

export const themeVars = {
	spacing: {
		xsmall: fallbackVar(createThemeVars.spacing.xsmall, '8px'),
		small: fallbackVar(createThemeVars.spacing.small, '12px'),
		medium: fallbackVar(createThemeVars.spacing.medium, '16px'),
		large: fallbackVar(createThemeVars.spacing.large, '24px'),
		xlarge: fallbackVar(createThemeVars.spacing.xlarge, '32px'),
	},
	palette: themePaletteColors,
};

globalStyle('body', {
	background: themeVars.palette.background,
});
