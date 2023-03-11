import { createElement } from 'react';

import classNames from 'classnames';

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
import { GroupProps } from './Frame.types';

export const Group = ({
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
}: GroupProps) => {
	return createElement(element, {
		className: classNames(
			frameOtherVariants.root,
			alignItems && frameAlignItemsVariants[alignItems],
			cornerRadius && frameCornerRadiusVariants[cornerRadius],
			frameDirectionVariants.row,
			fillContainer && frameOtherVariants.fillContainer,
			horizontalPadding && frameHorizontalPaddingVariants[horizontalPadding],
			justifyContent && frameJustifyContentVariants[justifyContent],
			noWrap && frameOtherVariants.noWrap,
			verticalPadding && frameVerticalPaddingVariants[verticalPadding],
			spacing && frameSpacingVariants[spacing],
			className
		),
		...otherProps,
	});
};

export default Group;
