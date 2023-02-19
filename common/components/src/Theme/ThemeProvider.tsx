import React from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from './hooks';
import { createThemeVars } from './Theme.css';

export interface ThemeProviderProps extends React.PropsWithChildren {
	colorScheme?: 'light' | 'dark';
}

const createInlineColorsVars = (
	vars: Record<
		string,
		{
			r: number;
			g: number;
			b: number;
		}
	>
) => {
	const inlineVars: {
		[key: string]: string;
	} = {};

	Object.keys(vars).forEach(key => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		inlineVars[(createThemeVars.palette as any)[key]] = `${vars[key].r}, ${vars[key].g}, ${vars[key].b}`;
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
