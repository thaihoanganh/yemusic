import { useContext } from 'react';

import {
	argbFromHex,
	blueFromArgb,
	greenFromArgb,
	redFromArgb,
	themeFromImage,
	themeFromSourceColor,
} from '@material/material-color-utilities';

import { ThemeContext } from './ThemeProvider';

function convertColorName(colorName: string) {
	return colorName.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createPaletteFromSchemes({ schemes, isDynamic }: { schemes: any; isDynamic?: boolean }): any {
	const colors = schemes.dark.props;
	const newPalette: { [prop: string]: [number, number, number] } = {};

	for (const key in colors) {
		const colorKey = colors[key];
		const colorName = isDynamic ? `${convertColorName(key)}-dynamic` : convertColorName(key);
		newPalette[colorName] = [redFromArgb(colorKey), greenFromArgb(colorKey), blueFromArgb(colorKey)];
	}

	return newPalette;
}

export function useTheme() {
	const themeContext = useContext(ThemeContext);

	if (!themeContext) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}

	const { themeState, setThemeState } = themeContext;

	const onSetThemeFromSourceColor = ({
		primaryColor,
		dynamicColor,
	}: {
		primaryColor: string;
		dynamicColor: string;
	}) => {
		const { schemes } = themeFromSourceColor(argbFromHex(primaryColor));
		const { schemes: dynamicSchemes } = themeFromSourceColor(argbFromHex(dynamicColor));

		const newPalette = createPaletteFromSchemes({ schemes });
		const newDynamicPalette = createPaletteFromSchemes({
			schemes: dynamicSchemes,
			isDynamic: true,
		});

		setThemeState(prevState => ({
			...prevState,
			theme: {
				...prevState.theme,
				palette: {
					...newPalette,
					...newDynamicPalette,
				},
			},
		}));
	};

	const onSetDynamicThemeFromImage = async ({ image }: { image: HTMLImageElement }) => {
		const { schemes } = await themeFromImage(image);

		const newPalette = createPaletteFromSchemes({
			schemes,
			isDynamic: true,
		});

		setThemeState(prevState => ({
			...prevState,
			theme: {
				...prevState.theme,
				palette: {
					...prevState.theme.palette,
					...newPalette,
				},
			},
		}));
	};

	return {
		...themeState,
		onSetThemeFromSourceColor,
		onSetDynamicThemeFromImage,
	};
}
