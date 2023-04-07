import React, { useState } from 'react';

import classNames from 'classnames';

import { scrollAreaStyles } from './ScrollArea.css';

export interface ScrollAreaProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	fillContainer?: boolean;
	visibleScrollbarOnHover?: boolean;
}

export const ScrollArea = ({ children, fillContainer, visibleScrollbarOnHover, ...otherProps }: ScrollAreaProps) => {
	const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		if (visibleScrollbarOnHover) {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			setIsHovered(true);
		}
	};

	const handleMouseLeave = () => {
		if (visibleScrollbarOnHover) {
			timeoutRef.current = setTimeout(() => {
				setIsHovered(false);
			}, 1000);
		}
	};

	return (
		<div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={classNames(
				scrollAreaStyles.root,
				fillContainer && scrollAreaStyles.fillContainer,
				isHovered && scrollAreaStyles.visibleScrollbar
			)}
			{...otherProps}
		>
			{children}
		</div>
	);
};

export default ScrollArea;
