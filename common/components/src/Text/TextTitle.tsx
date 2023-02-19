import React from 'react';

import { textTitleVariants, textColorVariants } from './Text.css';
import { TextBaseProps } from './types';

export interface TextTitleProps extends TextBaseProps, Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
	element?: 'p' | 'span';
}

export const TextTitle = ({
	element: TextTitleElement = 'p',
	color = 'onSurface',
	className,
	size = 'medium',
	...otherProps
}: TextTitleProps) => {
	return (
		<TextTitleElement
			className={[textColorVariants[color], textTitleVariants[size], className].filter(Boolean).join(' ').trim()}
			{...otherProps}
		/>
	);
};

export default TextTitle;
