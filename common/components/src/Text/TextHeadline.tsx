import React, { createElement } from 'react';

import { textColorVariants, textHeadlineVariants } from './Text.css';
import { TextBaseProps } from './types';

export interface TextHeadlineProps extends TextBaseProps, Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
	element?: 'p' | 'span';
}

export const TextHeadline = ({
	element = 'p',
	color = 'onSurface',
	className,
	size = 'medium',
	...otherProps
}: TextHeadlineProps) => {
	return createElement(element, {
		className: [textColorVariants[color], textHeadlineVariants[size], className].filter(Boolean).join(' ').trim(),
		...otherProps,
	});
};

export default TextHeadline;
