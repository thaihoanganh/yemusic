import React, { createElement } from 'react';

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
	variant: 'body' | 'display' | 'headline' | 'label' | 'title';
}

const Typography = ({
	className,
	color = 'on-surface',
	element = 'p',
	size = 'medium',
	textAlign,
	variant,
	...otherProps
}: TypographyProps) => {
	return createElement(element, {
		className: [
			typographyOtherVariants.root,
			typographyColorVariants[color],
			textAlign && typographyTextAlignVariants[textAlign],
			typographyVariants[variant][size],
			className,
		]
			.filter(Boolean)
			.join(' ')
			.trim(),
		...otherProps,
	});
};

export default Typography;
