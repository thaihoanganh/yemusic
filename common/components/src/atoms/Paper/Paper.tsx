import React, { createElement } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { createThemeVars } from '../../Theme/Theme.css';

import { paperBackgrounds, paperBackgroundVariants, paperOtherVariants } from './Paper.css';

export interface PaperProps extends React.HTMLAttributes<HTMLElement> {
	color?: (typeof paperBackgrounds)[number];
	bordered?: boolean;
	element?: keyof JSX.IntrinsicElements;
	surfaceLevel?: 1 | 2 | 3 | 4 | 5;
}

export const Paper = ({
	children,
	className,
	color,
	bordered,
	element = 'div',
	surfaceLevel,
	style,
	...otherProps
}: PaperProps) => {
	if (surfaceLevel) {
		let paperColorOpacity = '1';

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

		return createElement(element, {
			style: {
				...assignInlineVars({
					[createThemeVars.stateLayerOpacity]: paperColorOpacity,
				}),
				...(style as {
					[x: string]: string;
				}),
			},
			className: [bordered && paperOtherVariants.bordered, color && paperBackgroundVariants[color]]
				.filter(Boolean)
				.join(' '),
			children: (
				<div
					style={assignInlineVars({
						[createThemeVars.stateLayerOpacity]: '1',
					})}
					className={className}
				>
					{children}
				</div>
			),
			...otherProps,
		});
	} else {
		return createElement(element, {
			style,
			className: [bordered && paperOtherVariants.bordered, color && paperBackgroundVariants[color], className]
				.filter(Boolean)
				.join(' '),
			children,
			...otherProps,
		});
	}
};

export default Paper;
