import React, { createElement } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import classNames from 'classnames';

import { themeBackgroundPaletteKeys } from '../../Theme/theme.config';
import { createThemeVars } from '../../Theme/Theme.css';

import { paperColorStyles } from './Paper.css';

export interface PaperProps extends React.PropsWithChildren {
	color?: (typeof themeBackgroundPaletteKeys)[number];
	backgroundOpacity?: number;
	bordered?: boolean;
	element?: keyof JSX.IntrinsicElements;
	surfaceLevel?: 1 | 2 | 3 | 4 | 5;
	style?: React.CSSProperties;
}

export const Paper = ({
	children,
	color,
	backgroundOpacity,
	element = 'div',
	surfaceLevel,
	style,
	...otherProps
}: PaperProps) => {
	if (surfaceLevel || backgroundOpacity) {
		let paperColorOpacity = '1';

		if (surfaceLevel) {
			switch (surfaceLevel) {
				case 1:
					paperColorOpacity = '0.05';
					break;
				case 2:
					paperColorOpacity = '0.08';
					break;
				case 3:
					paperColorOpacity = '0.11';
					break;
				case 4:
					paperColorOpacity = '0.12';
					break;
				case 5:
					paperColorOpacity = '0.14';
					break;

				default:
					break;
			}
		}

		if (backgroundOpacity) {
			paperColorOpacity = `${backgroundOpacity}`;
		}

		return createElement(element, {
			style: {
				...assignInlineVars({
					[createThemeVars.stateLayerOpacity]: paperColorOpacity,
				}),
				...(style as {
					[x: string]: string;
				}),
			},
			className: classNames(color && paperColorStyles[color]),
			children: (
				<div
					style={assignInlineVars({
						[createThemeVars.stateLayerOpacity]: '1',
					})}
				>
					{children}
				</div>
			),
			...otherProps,
		});
	} else {
		return createElement(element, {
			style,
			className: classNames(color && paperColorStyles[color]),
			children,
			...otherProps,
		});
	}
};

export default Paper;
