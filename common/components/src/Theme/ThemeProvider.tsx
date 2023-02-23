import React from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from './hooks';
import { createThemeVars } from './Theme.css';

export interface ThemeProviderProps extends React.PropsWithChildren {
	colorScheme?: 'light' | 'dark';
}

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

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const theme = useTheme().theme;

	return (
		<div
			style={assignInlineVars({
				...createInlineColorsVars(theme.palette),
			})}
		>
			{children}
		</div>
	);
};

export default ThemeProvider;
