import React, { createElement } from 'react';

import classNames from 'classnames';

import {
	stackAlignItemsVariants,
	stackBaseVariants,
	stackJustifyContentVariants,
	stackPaddingHorizontalVariants,
	stackPaddingVerticalVariants,
	stackSpacingVariants,
} from './Stack.css';

interface StackProps extends React.HTMLAttributes<HTMLElement> {
	alignItems?: 'flex-start' | 'flex-end' | 'center';
	element?: keyof JSX.IntrinsicElements;
	grow?: boolean;
	justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
	spacing?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
	paddingHorizontal?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
	paddingVertical?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}

export const Stack = ({
	alignItems,
	className,
	element = 'div',
	grow,
	justifyContent,
	spacing,
	paddingHorizontal,
	paddingVertical,
	...otherProps
}: StackProps) => {
	return createElement(element, {
		className: classNames(
			stackBaseVariants.root,
			alignItems && stackAlignItemsVariants[alignItems],
			grow && stackBaseVariants.grow,
			justifyContent && stackJustifyContentVariants[justifyContent],
			spacing && stackSpacingVariants[spacing],
			paddingHorizontal && stackPaddingHorizontalVariants[paddingHorizontal],
			paddingVertical && stackPaddingVerticalVariants[paddingVertical],
			className
		),
		...otherProps,
	});
};

export default Stack;
