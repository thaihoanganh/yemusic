import { createElement } from 'react';

import classNames from 'classnames';

import {
	frameAlignItemsStyles,
	frameCornerRadiusStyles,
	frameDirectionStyles,
	frameHorizontalPaddingStyles,
	frameJustifyContentStyles,
	frameOtherStyles,
	frameSpacingStyles,
	frameVerticalPaddingStyles,
} from './Frame.css';
import { FrameProps } from './Frame.types';

export const Frame = ({
	alignItems,
	className,
	cornerRadius,
	direction,
	element = 'div',
	fillContainer,
	horizontalPadding,
	justifyContent,
	noWrap,
	verticalPadding,
	spacing,
	...otherProps
}: FrameProps) => {
	return createElement(element, {
		className: classNames(
			frameOtherStyles.root,
			alignItems && frameAlignItemsStyles[alignItems],
			cornerRadius && frameCornerRadiusStyles[cornerRadius],
			direction && frameDirectionStyles[direction],
			fillContainer && frameOtherStyles.fillContainer,
			horizontalPadding && frameHorizontalPaddingStyles[horizontalPadding],
			justifyContent && frameJustifyContentStyles[justifyContent],
			noWrap && frameOtherStyles.noWrap,
			verticalPadding && frameVerticalPaddingStyles[verticalPadding],
			spacing && frameSpacingStyles[spacing],
			className
		),
		...otherProps,
	});
};

export default Frame;
