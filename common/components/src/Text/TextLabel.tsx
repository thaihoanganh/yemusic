import React, { createElement } from 'react';

import { textColorVariants, textLabelVariants } from './Text.css';
import { TextBaseProps } from './types';

export interface TextLabelProps extends TextBaseProps, Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
	element?: 'p' | 'span';
}

export const TextLabel = ({
	element = 'p',
	color = 'onSurface',
	className,
	size = 'medium',
	...otherProps
}: TextLabelProps) => {
	return createElement(element, {
		className: [textColorVariants[color], textLabelVariants[size], className].filter(Boolean).join(' ').trim(),
		...otherProps,
	});
};

export default TextLabel;
