import React from 'react';

import { textLabelVariants, textColorVariants } from './Text.css';
import { TextBaseProps } from './types';

export interface TextLabelProps extends TextBaseProps, Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
	element?: 'p' | 'span';
}

export const TextLabel = ({
	element: TextLabelElement = 'p',
	color = 'onSurface',
	className,
	size = 'medium',
	...otherProps
}: TextLabelProps) => {
	return (
		<TextLabelElement
			className={[textColorVariants[color], textLabelVariants[size], className].filter(Boolean).join(' ').trim()}
			{...otherProps}
		/>
	);
};

export default TextLabel;
