import React, { createElement } from 'react';

import { textColorVariants, textDisplayVariants } from './Text.css';
import { TextBaseProps } from './types';

export interface TextDisplayProps extends TextBaseProps, Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
	element?: 'p' | 'span';
}

export const TextDisplay = ({
	element = 'p',
	color = 'onSurface',
	className,
	size = 'medium',
	...otherProps
}: TextDisplayProps) => {
	return createElement(element, {
		className: [textColorVariants[color], textDisplayVariants[size], className].filter(Boolean).join(' ').trim(),
		...otherProps,
	});
};

export default TextDisplay;
