import React, { useMemo, useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { themeConfigs } from './theme.config';
import { createThemeVars } from './Theme.css';

export interface ThemeProviderProps extends React.PropsWithChildren {
	device: 'mobile' | 'desktop';
}

export interface IThemeState {
	device: 'mobile' | 'desktop';
	theme: typeof themeConfigs;
}

export interface IThemeContextValue {
	themeState: IThemeState;
	setThemeState: React.Dispatch<React.SetStateAction<IThemeState>>;
}

export const ThemeContext = React.createContext<IThemeContextValue>({} as IThemeContextValue);

const createInlineColorsVars = (vars: Record<string, [number, number, number]>) => {
	const inlineVars: {
		[key: string]: string;
	} = {};

	Object.keys(vars).forEach(key => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		inlineVars[(createThemeVars.palette as any)[key]] = `${vars[key][0]}, ${vars[key][1]}, ${vars[key][2]}`;
	});

	return inlineVars;
};

export const ThemeProvider = ({ children, device }: ThemeProviderProps) => {
	const [themeState, setThemeState] = useState<IThemeState>({
		device,
		theme: themeConfigs,
	});

	const exportThemeContextValue = useMemo(
		() => ({
			themeState,
			setThemeState,
		}),
		[themeState]
	);

	return (
		<ThemeContext.Provider value={exportThemeContextValue}>
			<div
				style={assignInlineVars({
					...createInlineColorsVars(themeState.theme.palette),
				})}
			>
				{children}
			</div>
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
