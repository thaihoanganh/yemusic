import React from 'react';

import { textDisplayVariants, textColorVariants } from './Text.css';
import { TextBaseProps } from './types';

export interface TextDisplayProps extends TextBaseProps, Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
	element?: 'p' | 'span';
}

export const TextDisplay = ({
	element: TextDisplayElement = 'p',
	color = 'onSurface',
	className,
	size = 'medium',
	...otherProps
}: TextDisplayProps) => {
	return (
		<TextDisplayElement
			className={[textColorVariants[color], textDisplayVariants[size], className].filter(Boolean).join(' ').trim()}
			{...otherProps}
		/>
	);
};

export default TextDisplay;
