import React from 'react';

import classNames from 'classnames';

import { paperBackgrounds, paperBackgroundVariants, paperBaseVariants } from './Paper.css';

export interface PaperProps extends React.HTMLAttributes<HTMLElement> {
	background: (typeof paperBackgrounds)[number];
	bordered?: boolean;
	element?: keyof JSX.IntrinsicElements;
	rounded?: boolean;
}

export const Paper = ({
	className,
	background,
	bordered,
	element: Component = 'div',
	rounded,
	...otherProps
}: PaperProps) => {
	return (
		<Component
			className={classNames(
				paperBaseVariants.root,
				bordered && paperBaseVariants.bordered,
				paperBackgroundVariants[background],
				rounded && paperBaseVariants.rounded,
				className
			)}
			{...otherProps}
		/>
	);
};

export default Paper;
