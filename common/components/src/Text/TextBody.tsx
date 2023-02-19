import React, { createElement } from 'react';

import { textBodyVariants, textColorVariants } from './Text.css';
import { TextBaseProps } from './types';

export interface TextBodyProps extends TextBaseProps, Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
	element?: 'p' | 'span';
}

export const TextBody = ({
	element = 'p',
	color = 'onSurface',
	className,
	size = 'medium',
	...otherProps
}: TextBodyProps) => {
	return createElement(element, {
		className: [textColorVariants[color], textBodyVariants[size], className].filter(Boolean).join(' ').trim(),
		...otherProps,
	});
};

export default TextBody;
