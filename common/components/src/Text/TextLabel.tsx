import React, { createElement } from 'react';

import { textColorVariants, textLabelVariants, textVariants } from './Text.css';
import { TextBaseProps } from './types';

export interface TextLabelProps extends TextBaseProps, Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
	element?: 'p' | 'span';
}

export const TextLabel = ({
	element = 'p',
	color = 'on-surface',
	className,
	size = 'medium',
	...otherProps
}: TextLabelProps) => {
	return createElement(element, {
		className: [textVariants.initial, textColorVariants[color], textLabelVariants[size], className]
			.filter(Boolean)
			.join(' ')
			.trim(),
		...otherProps,
	});
};

export default TextLabel;
