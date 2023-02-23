export type ThemeColors =
	| 'primary'
	| 'on-primary'
	| 'primary-container'
	| 'on-primary-container'
	| 'secondary'
	| 'on-secondary'
	| 'secondary-container'
	| 'on-secondary-container'
	| 'tertiary'
	| 'on-tertiary'
	| 'tertiary-container'
	| 'on-tertiary-container'
	| 'error'
	| 'on-error'
	| 'error-container'
	| 'on-error-container'
	| 'background'
	| 'on-background'
	| 'surface'
	| 'on-surface'
	| 'surface-variant'
	| 'on-surface-variant'
	| 'outline'
	| 'outline-variant'
	| 'shadow'
	| 'scrim'
	| 'inverse-primary'
	| 'inverse-on-surface'
	| 'inverse-surface'
	| 'primary-dynamic'
	| 'on-primary-dynamic'
	| 'primary-container-dynamic'
	| 'on-primary-container-dynamic'
	| 'secondary-dynamic'
	| 'on-secondary-dynamic'
	| 'secondary-container-dynamic'
	| 'on-secondary-container-dynamic'
	| 'tertiary-dynamic'
	| 'on-tertiary-dynamic'
	| 'tertiary-container-dynamic'
	| 'on-tertiary-container-dynamic'
	| 'error-dynamic'
	| 'on-error-dynamic'
	| 'error-container-dynamic'
	| 'on-error-container-dynamic'
	| 'background-dynamic'
	| 'on-background-dynamic'
	| 'surface-dynamic'
	| 'on-surface-dynamic'
	| 'surface-variant-dynamic'
	| 'on-surface-variant-dynamic'
	| 'outline-dynamic'
	| 'outline-variant-dynamic'
	| 'shadow-dynamic'
	| 'scrim-dynamic'
	| 'inverse-primary-dynamic'
	| 'inverse-on-surface-dynamic'
	| 'inverse-surface-dynamic';

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
		['primary']: [255, 180, 166],
		['on-primary']: [102, 7, 0],
		['primary-container']: [144, 14, 0],
		['on-primary-container']: [255, 218, 212],
		['secondary']: [231, 189, 181],
		['on-secondary']: [68, 42, 37],
		['secondary-container']: [93, 63, 58],
		['on-secondary-container']: [255, 218, 212],
		['tertiary']: [221, 196, 140],
		['on-tertiary']: [61, 46, 4],
		['tertiary-container']: [85, 69, 25],
		['on-tertiary-container']: [250, 224, 166],
		['error']: [255, 180, 171],
		['on-error']: [105, 0, 5],
		['error-container']: [147, 0, 10],
		['on-error-container']: [255, 180, 171],
		['background']: [32, 26, 25],
		['on-background']: [237, 224, 221],
		['surface']: [32, 26, 25],
		['on-surface']: [237, 224, 221],
		['surface-variant']: [83, 67, 64],
		['on-surface-variant']: [216, 194, 190],
		['outline']: [160, 140, 137],
		['outline-variant']: [83, 67, 64],
		['shadow']: [0, 0, 0],
		['scrim']: [0, 0, 0],
		['inverse-surface']: [237, 224, 221],
		['inverse-on-surface']: [54, 47, 45],
		['inverse-primary']: [188, 22, 0],
		['primary-dynamic']: [255, 180, 166],
		['on-primary-dynamic']: [102, 7, 0],
		['primary-container-dynamic']: [144, 14, 0],
		['on-primary-container-dynamic']: [255, 218, 212],
		['secondary-dynamic']: [231, 189, 181],
		['on-secondary-dynamic']: [68, 42, 37],
		['secondary-container-dynamic']: [93, 63, 58],
		['on-secondary-container-dynamic']: [255, 218, 212],
		['tertiary-dynamic']: [221, 196, 140],
		['on-tertiary-dynamic']: [61, 46, 4],
		['tertiary-container-dynamic']: [85, 69, 25],
		['on-tertiary-container-dynamic']: [250, 224, 166],
		['error-dynamic']: [255, 180, 171],
		['on-error-dynamic']: [105, 0, 5],
		['error-container-dynamic']: [147, 0, 10],
		['on-error-container-dynamic']: [255, 180, 171],
		['background-dynamic']: [32, 26, 25],
		['on-background-dynamic']: [237, 224, 221],
		['surface-dynamic']: [32, 26, 25],
		['on-surface-dynamic']: [237, 224, 221],
		['surface-variant-dynamic']: [83, 67, 64],
		['on-surface-variant-dynamic']: [216, 194, 190],
		['outline-dynamic']: [160, 140, 137],
		['outline-variant-dynamic']: [83, 67, 64],
		['shadow-dynamic']: [0, 0, 0],
		['scrim-dynamic']: [0, 0, 0],
		['inverse-surface-dynamic']: [237, 224, 221],
		['inverse-on-surface-dynamic']: [54, 47, 45],
		['inverse-primary-dynamic']: [188, 22, 0],
	},
};

export const themePaletteKeys = [
	'primary',
	'on-primary',
	'primary-container',
	'on-primary-container',
	'secondary',
	'on-secondary',
	'secondary-container',
	'on-secondary-container',
	'tertiary',
	'on-tertiary',
	'tertiary-container',
	'on-tertiary-container',
	'error',
	'on-error',
	'error-container',
	'on-error-container',
	'background',
	'on-background',
	'surface',
	'on-surface',
	'surface-variant',
	'on-surface-variant',
	'outline',
	'outline-variant',
	'shadow',
	'scrim',
	'inverse-primary',
	'inverse-on-surface',
	'inverse-surface',
	'primary-dynamic',
	'on-primary-dynamic',
	'primary-container-dynamic',
	'on-primary-container-dynamic',
	'secondary-dynamic',
	'on-secondary-dynamic',
	'secondary-container-dynamic',
	'on-secondary-container-dynamic',
	'tertiary-dynamic',
	'on-tertiary-dynamic',
	'tertiary-container-dynamic',
	'on-tertiary-container-dynamic',
	'error-dynamic',
	'on-error-dynamic',
	'error-container-dynamic',
	'on-error-container-dynamic',
	'background-dynamic',
	'on-background-dynamic',
	'surface-dynamic',
	'on-surface-dynamic',
	'surface-variant-dynamic',
	'on-surface-variant-dynamic',
	'outline-dynamic',
	'outline-variant-dynamic',
	'shadow-dynamic',
	'scrim-dynamic',
	'inverse-primary-dynamic',
	'inverse-on-surface-dynamic',
	'inverse-surface-dynamic',
] as const;
