import React from 'react';

import { textHeadlineVariants, textColorVariants } from './Text.css';
import { TextBaseProps } from './types';

export interface TextHeadlineProps extends TextBaseProps, Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
	element?: 'p' | 'span';
}

export const TextHeadline = ({
	element: TextHeadlineElement = 'p',
	color = 'onSurface',
	className,
	size = 'medium',
	...otherProps
}: TextHeadlineProps) => {
	return (
		<TextHeadlineElement
			className={[textColorVariants[color], textHeadlineVariants[size], className].filter(Boolean).join(' ').trim()}
			{...otherProps}
		/>
	);
};

export default TextHeadline;
