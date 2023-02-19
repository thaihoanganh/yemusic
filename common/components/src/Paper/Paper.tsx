import React, { createElement } from 'react';

import classNames from 'classnames';

import { paperBackgrounds, paperBackgroundVariants, paperBaseVariants } from './Paper.css';

export interface PaperProps extends React.HTMLAttributes<HTMLElement> {
	background: (typeof paperBackgrounds)[number];
	bordered?: boolean;
	element?: keyof JSX.IntrinsicElements;
	rounded?: boolean;
}

export const Paper = ({ className, background, bordered, element = 'div', rounded, ...otherProps }: PaperProps) => {
	return createElement(element, {
		className: classNames(
			paperBaseVariants.root,
			bordered && paperBaseVariants.bordered,
			paperBackgroundVariants[background],
			rounded && paperBaseVariants.rounded,
			className
		),
		...otherProps,
	});
};

export default Paper;
