import { createElement } from 'react';

import {
	frameAlignItemsVariants,
	frameCornerRadiusVariants,
	frameDirectionVariants,
	frameHorizontalPaddingVariants,
	frameJustifyContentVariants,
	frameOtherVariants,
	frameSpacingVariants,
	frameVerticalPaddingVariants,
} from './Frame.css';
import { StackProps } from './Frame.types';

export const Stack = ({
	alignItems,
	className,
	cornerRadius,
	element = 'div',
	fillContainer,
	horizontalPadding,
	justifyContent,
	noWrap,
	verticalPadding,
	spacing,
	...otherProps
}: StackProps) => {
	return createElement(element, {
		className: [
			alignItems && frameAlignItemsVariants[alignItems],
			cornerRadius && frameCornerRadiusVariants[cornerRadius],
			frameDirectionVariants.column,
			fillContainer && frameOtherVariants.fillContainer,
			horizontalPadding && frameHorizontalPaddingVariants[horizontalPadding],
			justifyContent && frameJustifyContentVariants[justifyContent],
			noWrap && frameOtherVariants.noWrap,
			verticalPadding && frameVerticalPaddingVariants[verticalPadding],
			spacing && frameSpacingVariants[spacing],
			className,
		]
			.filter(Boolean)
			.join(' '),
		...otherProps,
	});
};

export default Stack;
