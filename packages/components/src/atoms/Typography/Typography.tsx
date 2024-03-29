import React, { createElement } from 'react';

import classNames from 'classnames';

import { themeTextPaletteKeys } from '../../Theme/theme.config';

import {
	typographyColorStyles,
	typographyOtherStyles,
	typographyTextAlignStyles,
	typographySizeStyles,
} from './Typography.css';

export interface TypographyProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
	color?: (typeof themeTextPaletteKeys)[number];
	element?: keyof JSX.IntrinsicElements;
	size?: 'small' | 'medium' | 'large';
	textAlign?: 'left' | 'center' | 'right';
	truncate?: boolean;
	variant: 'body' | 'display' | 'headline' | 'label' | 'title';
}

export const Typography = ({
	className,
	color = 'on-surface',
	element = 'p',
	size = 'medium',
	textAlign,
	truncate,
	variant,
	...otherProps
}: TypographyProps) => {
	return createElement(element, {
		className: classNames(
			typographyOtherStyles.root,
			typographyColorStyles[color],
			textAlign && typographyTextAlignStyles[textAlign],
			truncate && typographyOtherStyles.truncate,
			typographySizeStyles[variant][size],
			className
		),
		...otherProps,
	});
};

export default Typography;
