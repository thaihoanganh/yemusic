export type IThemeBackgroundColors =
	| 'primary'
	| 'primary-container'
	| 'secondary'
	| 'secondary-container'
	| 'tertiary'
	| 'tertiary-container'
	| 'error'
	| 'error-container'
	| 'background'
	| 'surface'
	| 'surface-variant'
	| 'outline'
	| 'outline-variant'
	| 'shadow'
	| 'scrim'
	| 'inverse-primary'
	| 'inverse-surface'
	| 'primary-dynamic'
	| 'primary-container-dynamic'
	| 'secondary-dynamic'
	| 'secondary-container-dynamic'
	| 'tertiary-dynamic'
	| 'tertiary-container-dynamic'
	| 'error-dynamic'
	| 'error-container-dynamic'
	| 'background-dynamic'
	| 'surface-dynamic'
	| 'surface-variant-dynamic'
	| 'outline-dynamic'
	| 'outline-variant-dynamic'
	| 'shadow-dynamic'
	| 'scrim-dynamic'
	| 'inverse-primary-dynamic'
	| 'inverse-surface-dynamic';

export type IThemeTextColors =
	| 'on-primary'
	| 'on-primary-container'
	| 'on-secondary'
	| 'on-secondary-container'
	| 'on-tertiary'
	| 'on-tertiary-container'
	| 'on-error'
	| 'on-error-container'
	| 'on-background'
	| 'on-surface'
	| 'on-surface-variant'
	| 'inverse-on-surface'
	| 'on-primary-dynamic'
	| 'on-primary-container-dynamic'
	| 'on-secondary-dynamic'
	| 'on-secondary-container-dynamic'
	| 'on-tertiary-dynamic'
	| 'on-tertiary-container-dynamic'
	| 'on-error-dynamic'
	| 'on-error-container-dynamic'
	| 'on-background-dynamic'
	| 'on-surface-dynamic'
	| 'on-surface-variant-dynamic'
	| 'inverse-on-surface-dynamic';

export type ThemeColors = IThemeBackgroundColors | IThemeTextColors;

export interface Theme {
	spacing: {
		xsmall: number;
		small: number;
		medium: number;
		large: number;
		xlarge: number;
	};
	palette: Record<ThemeColors, [number, number, number]>;
}

export const themeConfigs: Theme = {
	spacing: {
		xsmall: 8,
		small: 12,
		medium: 16,
		large: 24,
		xlarge: 32,
	},
	palette: {
		primary: [160, 201, 255],
		'on-primary': [0, 50, 90],
		'primary-container': [0, 73, 127],
		'on-primary-container': [210, 228, 255],
		secondary: [187, 199, 219],
		'on-secondary': [37, 49, 65],
		'secondary-container': [60, 72, 88],
		'on-secondary-container': [215, 227, 248],
		tertiary: [215, 189, 228],
		'on-tertiary': [59, 41, 71],
		'tertiary-container': [83, 63, 95],
		'on-tertiary-container': [243, 218, 255],
		error: [255, 180, 171],
		'on-error': [105, 0, 5],
		'error-container': [147, 0, 10],
		'on-error-container': [255, 180, 171],
		background: [26, 28, 30],
		'on-background': [227, 226, 230],
		surface: [26, 28, 30],
		'on-surface': [227, 226, 230],
		'surface-variant': [67, 71, 78],
		'on-surface-variant': [195, 198, 207],
		outline: [141, 145, 153],
		'outline-variant': [67, 71, 78],
		shadow: [0, 0, 0],
		scrim: [0, 0, 0],
		'inverse-surface': [227, 226, 230],
		'inverse-on-surface': [47, 48, 51],
		'inverse-primary': [0, 97, 166],
		'primary-dynamic': [160, 201, 255],
		'on-primary-dynamic': [0, 50, 90],
		'primary-container-dynamic': [0, 73, 127],
		'on-primary-container-dynamic': [210, 228, 255],
		'secondary-dynamic': [187, 199, 219],
		'on-secondary-dynamic': [37, 49, 65],
		'secondary-container-dynamic': [60, 72, 88],
		'on-secondary-container-dynamic': [215, 227, 248],
		'tertiary-dynamic': [215, 189, 228],
		'on-tertiary-dynamic': [59, 41, 71],
		'tertiary-container-dynamic': [83, 63, 95],
		'on-tertiary-container-dynamic': [243, 218, 255],
		'error-dynamic': [255, 180, 171],
		'on-error-dynamic': [105, 0, 5],
		'error-container-dynamic': [147, 0, 10],
		'on-error-container-dynamic': [255, 180, 171],
		'background-dynamic': [26, 28, 30],
		'on-background-dynamic': [227, 226, 230],
		'surface-dynamic': [26, 28, 30],
		'on-surface-dynamic': [227, 226, 230],
		'surface-variant-dynamic': [67, 71, 78],
		'on-surface-variant-dynamic': [195, 198, 207],
		'outline-dynamic': [141, 145, 153],
		'outline-variant-dynamic': [67, 71, 78],
		'shadow-dynamic': [0, 0, 0],
		'scrim-dynamic': [0, 0, 0],
		'inverse-surface-dynamic': [227, 226, 230],
		'inverse-on-surface-dynamic': [47, 48, 51],
		'inverse-primary-dynamic': [0, 97, 166],
	},
};

export const themeBackgroundPaletteKeys = [
	'primary',
	'primary-container',
	'secondary',
	'secondary-container',
	'tertiary',
	'tertiary-container',
	'error',
	'error-container',
	'background',
	'surface',
	'surface-variant',
	'outline',
	'outline-variant',
	'shadow',
	'scrim',
	'inverse-primary',
	'inverse-surface',
	'primary-dynamic',
	'primary-container-dynamic',
	'secondary-dynamic',
	'secondary-container-dynamic',
	'tertiary-dynamic',
	'tertiary-container-dynamic',
	'error-dynamic',
	'error-container-dynamic',
	'background-dynamic',
	'surface-dynamic',
	'surface-variant-dynamic',
	'outline-dynamic',
	'outline-variant-dynamic',
	'shadow-dynamic',
	'scrim-dynamic',
	'inverse-primary-dynamic',
	'inverse-surface-dynamic',
] as const;

export const themeTextPaletteKeys = [
	'on-primary',
	'on-primary-container',
	'on-secondary',
	'on-secondary-container',
	'on-tertiary',
	'on-tertiary-container',
	'on-error',
	'on-error-container',
	'on-background',
	'on-surface',
	'on-surface-variant',
	'inverse-on-surface',
	'on-primary-dynamic',
	'on-primary-container-dynamic',
	'on-secondary-dynamic',
	'on-secondary-container-dynamic',
	'on-tertiary-dynamic',
	'on-tertiary-container-dynamic',
	'on-error-dynamic',
	'on-error-container-dynamic',
	'on-background-dynamic',
	'on-surface-dynamic',
	'on-surface-variant-dynamic',
	'inverse-on-surface-dynamic',
] as const;

export const themePaletteKeys = [...themeBackgroundPaletteKeys, ...themeTextPaletteKeys] as const;
