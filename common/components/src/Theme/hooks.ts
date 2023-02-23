/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	argbFromHex,
	blueFromArgb,
	greenFromArgb,
	redFromArgb,
	themeFromSourceColor,
} from '@material/material-color-utilities';
import { create } from 'zustand';

import { themeConfigs } from './theme.config';

interface UseTheme {
	theme: typeof themeConfigs;
	onSetThemeFromSourceColor: ({ primaryColor, dynamicColor }: { primaryColor: string; dynamicColor: string }) => void;
}

function convertColorName(colorName: string) {
	return colorName.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}

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

export const useTheme = create<UseTheme>(set => ({
	theme: themeConfigs,
	onSetThemeFromSourceColor: ({ primaryColor, dynamicColor }) => {
		const { schemes } = themeFromSourceColor(argbFromHex(primaryColor));
		const { schemes: dynamicSchemes } = themeFromSourceColor(argbFromHex(dynamicColor));

		const newPalette = createPaletteFromSchemes({ schemes });
		const newDynamicPalette = createPaletteFromSchemes({
			schemes: dynamicSchemes,
			isDynamic: true,
		});

		set(prevState => ({
			theme: {
				...prevState.theme,
				palette: {
					...newPalette,
					...newDynamicPalette,
				},
			},
		}));
	},
}));
