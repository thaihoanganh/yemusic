import React, { useCallback } from 'react';

import { scrollAreaStyles } from './ScrollArea.css';

export interface ScrollAreaProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	fillContainer?: boolean;
}

export const ScrollArea = ({ children, fillContainer, ...otherProps }: ScrollAreaProps) => {
	const handleScrollAreaNode = useCallback(
		(node: HTMLDivElement | null) => {
			if (node && fillContainer) {
				const parentHeight = node.parentElement?.clientHeight;
				if (parentHeight) {
					node.style.height = `${parentHeight}px`;
				}
			}
		},
		[fillContainer]
	);

	return (
		<div ref={handleScrollAreaNode} className={scrollAreaStyles.root} {...otherProps}>
			{children}
		</div>
	);
};

export default ScrollArea;
