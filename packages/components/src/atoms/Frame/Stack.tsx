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
		className: classNames(
			frameOtherStyles.root,
			alignItems && frameAlignItemsStyles[alignItems],
			cornerRadius && frameCornerRadiusStyles[cornerRadius],
			frameDirectionStyles.column,
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

export default Stack;
