export type ThemeColors =
	| 'primary'
	| 'onPrimary'
	| 'primaryContainer'
	| 'onPrimaryContainer'
	| 'secondary'
	| 'onSecondary'
	| 'secondaryContainer'
	| 'onSecondaryContainer'
	| 'tertiary'
	| 'onTertiary'
	| 'tertiaryContainer'
	| 'onTertiaryContainer'
	| 'error'
	| 'onError'
	| 'errorContainer'
	| 'onErrorContainer'
	| 'background'
	| 'onBackground'
	| 'surface'
	| 'onSurface'
	| 'surfaceVariant'
	| 'onSurfaceVariant'
	| 'outline'
	| 'outlineVariant'
	| 'shadow'
	| 'scrim'
	| 'inversePrimary'
	| 'inverseOnSurface'
	| 'inverseSurface'
	| 'primaryDynamic'
	| 'onPrimaryDynamic'
	| 'primaryContainerDynamic'
	| 'onPrimaryContainerDynamic'
	| 'secondaryDynamic'
	| 'onSecondaryDynamic'
	| 'secondaryContainerDynamic'
	| 'onSecondaryContainerDynamic'
	| 'tertiaryDynamic'
	| 'onTertiaryDynamic'
	| 'tertiaryContainerDynamic'
	| 'onTertiaryContainerDynamic'
	| 'errorDynamic'
	| 'onErrorDynamic'
	| 'errorContainerDynamic'
	| 'onErrorContainerDynamic'
	| 'backgroundDynamic'
	| 'onBackgroundDynamic'
	| 'surfaceDynamic'
	| 'onSurfaceDynamic'
	| 'surfaceVariantDynamic'
	| 'onSurfaceVariantDynamic'
	| 'outlineDynamic'
	| 'outlineVariantDynamic'
	| 'shadowDynamic'
	| 'scrimDynamic'
	| 'inversePrimaryDynamic'
	| 'inverseOnSurfaceDynamic'
	| 'inverseSurfaceDynamic';

export interface Theme {
	spacing: {
		xsmall: number;
		small: number;
		medium: number;
		large: number;
		xlarge: number;
	};
	palette: Record<
		ThemeColors,
		{
			r: number;
			g: number;
			b: number;
		}
	>;
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
		primary: {
			r: 255,
			g: 180,
			b: 166,
		},
		onPrimary: {
			r: 102,
			g: 7,
			b: 0,
		},
		primaryContainer: {
			r: 144,
			g: 14,
			b: 0,
		},
		onPrimaryContainer: {
			r: 255,
			g: 218,
			b: 212,
		},
		secondary: {
			r: 231,
			g: 189,
			b: 181,
		},
		onSecondary: {
			r: 68,
			g: 42,
			b: 37,
		},
		secondaryContainer: {
			r: 93,
			g: 63,
			b: 58,
		},
		onSecondaryContainer: {
			r: 255,
			g: 218,
			b: 212,
		},
		tertiary: {
			r: 221,
			g: 196,
			b: 140,
		},
		onTertiary: {
			r: 61,
			g: 46,
			b: 4,
		},
		tertiaryContainer: {
			r: 85,
			g: 69,
			b: 25,
		},
		onTertiaryContainer: {
			r: 250,
			g: 224,
			b: 166,
		},
		error: {
			r: 255,
			g: 180,
			b: 171,
		},
		onError: {
			r: 105,
			g: 0,
			b: 5,
		},
		errorContainer: {
			r: 147,
			g: 0,
			b: 10,
		},
		onErrorContainer: {
			r: 255,
			g: 180,
			b: 171,
		},
		background: {
			r: 32,
			g: 26,
			b: 25,
		},
		onBackground: {
			r: 237,
			g: 224,
			b: 221,
		},
		surface: {
			r: 32,
			g: 26,
			b: 25,
		},
		onSurface: {
			r: 237,
			g: 224,
			b: 221,
		},
		surfaceVariant: {
			r: 83,
			g: 67,
			b: 64,
		},
		onSurfaceVariant: {
			r: 216,
			g: 194,
			b: 190,
		},
		outline: {
			r: 160,
			g: 140,
			b: 137,
		},
		outlineVariant: {
			r: 83,
			g: 67,
			b: 64,
		},
		shadow: {
			r: 0,
			g: 0,
			b: 0,
		},
		scrim: {
			r: 0,
			g: 0,
			b: 0,
		},
		inverseSurface: {
			r: 237,
			g: 224,
			b: 221,
		},
		inverseOnSurface: {
			r: 54,
			g: 47,
			b: 45,
		},
		inversePrimary: {
			r: 188,
			g: 22,
			b: 0,
		},
		primaryDynamic: {
			r: 255,
			g: 180,
			b: 166,
		},
		onPrimaryDynamic: {
			r: 102,
			g: 7,
			b: 0,
		},
		primaryContainerDynamic: {
			r: 144,
			g: 14,
			b: 0,
		},
		onPrimaryContainerDynamic: {
			r: 255,
			g: 218,
			b: 212,
		},
		secondaryDynamic: {
			r: 231,
			g: 189,
			b: 181,
		},
		onSecondaryDynamic: {
			r: 68,
			g: 42,
			b: 37,
		},
		secondaryContainerDynamic: {
			r: 93,
			g: 63,
			b: 58,
		},
		onSecondaryContainerDynamic: {
			r: 255,
			g: 218,
			b: 212,
		},
		tertiaryDynamic: {
			r: 221,
			g: 196,
			b: 140,
		},
		onTertiaryDynamic: {
			r: 61,
			g: 46,
			b: 4,
		},
		tertiaryContainerDynamic: {
			r: 85,
			g: 69,
			b: 25,
		},
		onTertiaryContainerDynamic: {
			r: 250,
			g: 224,
			b: 166,
		},
		errorDynamic: {
			r: 255,
			g: 180,
			b: 171,
		},
		onErrorDynamic: {
			r: 105,
			g: 0,
			b: 5,
		},
		errorContainerDynamic: {
			r: 147,
			g: 0,
			b: 10,
		},
		onErrorContainerDynamic: {
			r: 255,
			g: 180,
			b: 171,
		},
		backgroundDynamic: {
			r: 32,
			g: 26,
			b: 25,
		},
		onBackgroundDynamic: {
			r: 237,
			g: 224,
			b: 221,
		},
		surfaceDynamic: {
			r: 32,
			g: 26,
			b: 25,
		},
		onSurfaceDynamic: {
			r: 237,
			g: 224,
			b: 221,
		},
		surfaceVariantDynamic: {
			r: 83,
			g: 67,
			b: 64,
		},
		onSurfaceVariantDynamic: {
			r: 216,
			g: 194,
			b: 190,
		},
		outlineDynamic: {
			r: 160,
			g: 140,
			b: 137,
		},
		outlineVariantDynamic: {
			r: 83,
			g: 67,
			b: 64,
		},
		shadowDynamic: {
			r: 0,
			g: 0,
			b: 0,
		},
		scrimDynamic: {
			r: 0,
			g: 0,
			b: 0,
		},
		inverseSurfaceDynamic: {
			r: 237,
			g: 224,
			b: 221,
		},
		inverseOnSurfaceDynamic: {
			r: 54,
			g: 47,
			b: 45,
		},
		inversePrimaryDynamic: {
			r: 188,
			g: 22,
			b: 0,
		},
	},
};

export const themePaletteKeys: ThemeColors[] = [
	'background',
	'error',
	'errorContainer',
	'inverseOnSurface',
	'inversePrimary',
	'inverseSurface',
	'onBackground',
	'onError',
	'onErrorContainer',
	'onPrimary',
	'onPrimaryContainer',
	'onSecondary',
	'onSecondaryContainer',
	'onSurface',
	'onSurfaceVariant',
	'onTertiary',
	'onTertiaryContainer',
	'outline',
	'outlineVariant',
	'primary',
	'primaryContainer',
	'scrim',
	'secondary',
	'secondaryContainer',
	'shadow',
	'surface',
	'surfaceVariant',
	'tertiary',
	'tertiaryContainer',
	'backgroundDynamic',
	'errorDynamic',
	'errorContainerDynamic',
	'inverseOnSurfaceDynamic',
	'inversePrimaryDynamic',
	'inverseSurfaceDynamic',
	'onBackgroundDynamic',
	'onErrorDynamic',
	'onErrorContainerDynamic',
	'onPrimaryDynamic',
	'onPrimaryContainerDynamic',
	'onSecondaryDynamic',
	'onSecondaryContainerDynamic',
	'onSurfaceDynamic',
	'onSurfaceVariantDynamic',
	'onTertiaryDynamic',
	'onTertiaryContainerDynamic',
	'outlineDynamic',
	'outlineVariantDynamic',
	'primaryDynamic',
	'primaryContainerDynamic',
	'scrimDynamic',
	'secondaryDynamic',
	'secondaryContainerDynamic',
	'shadowDynamic',
	'surfaceDynamic',
	'surfaceVariantDynamic',
	'tertiaryDynamic',
	'tertiaryContainerDynamic',
];
