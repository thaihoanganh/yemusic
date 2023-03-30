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
			frameOtherStyles.root,
			alignItems && frameAlignItemsStyles[alignItems],
			cornerRadius && frameCornerRadiusStyles[cornerRadius],
			frameDirectionStyles.row,
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

export default Group;
