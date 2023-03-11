import React, { createElement } from 'react';

import classNames from 'classnames';

import { themePaletteKeys } from '../../Theme/theme.config';

import {
	typographyColorVariants,
	typographyOtherVariants,
	typographyTextAlignVariants,
	typographyVariants,
} from './Typography.css';

export interface TypographyProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
	color?: (typeof themePaletteKeys)[number];
	element?: keyof JSX.IntrinsicElements;
	size?: 'small' | 'medium' | 'large';
	textAlign?: 'left' | 'center' | 'right';
	truncate?: boolean;
	variant: 'body' | 'display' | 'headline' | 'label' | 'title';
}

const Typography = ({
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
			typographyOtherVariants.root,
			typographyColorVariants[color],
			textAlign && typographyTextAlignVariants[textAlign],
			truncate && typographyOtherVariants.truncate,
			typographyVariants[variant][size],
			className
		),
		...otherProps,
	});
};

export default Typography;
