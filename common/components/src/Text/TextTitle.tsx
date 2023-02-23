import React, { createElement } from 'react';

import { textColorVariants, textTitleVariants, textVariants } from './Text.css';
import { TextBaseProps } from './types';

export interface TextTitleProps extends TextBaseProps, Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
	element?: 'p' | 'span';
}

export const TextTitle = ({
	element = 'p',
	color = 'on-surface',
	className,
	size = 'medium',
	...otherProps
}: TextTitleProps) => {
	return createElement(element, {
		className: [textVariants.initial, textColorVariants[color], textTitleVariants[size], className]
			.filter(Boolean)
			.join(' ')
			.trim(),
		...otherProps,
	});
};

export default TextTitle;
