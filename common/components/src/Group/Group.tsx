import React, { createElement } from 'react';

import classNames from 'classnames';

import {
	groupAlignItemsVariants,
	groupBaseVariants,
	groupJustifyContentVariants,
	groupPaddingHorizontalVariants,
	groupPaddingVerticalVariants,
	groupSpacingVariants,
} from './Group.css';

interface GroupProps extends React.HTMLAttributes<HTMLElement> {
	alignItems?: 'flex-start' | 'flex-end' | 'center';
	element?: keyof JSX.IntrinsicElements;
	grow?: boolean;
	justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
	noWrap?: boolean;
	spacing?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
	paddingHorizontal?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
	paddingVertical?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}

export const Group = ({
	alignItems,
	className,
	element = 'div',
	grow,
	justifyContent,
	noWrap,
	spacing,
	paddingHorizontal,
	paddingVertical,
	...otherProps
}: GroupProps) => {
	return createElement(element, {
		className: classNames(
			groupBaseVariants.root,
			alignItems && groupAlignItemsVariants[alignItems],
			grow && groupBaseVariants.grow,
			justifyContent && groupJustifyContentVariants[justifyContent],
			noWrap && groupBaseVariants.noWrap,
			spacing && groupSpacingVariants[spacing],
			paddingHorizontal && groupPaddingHorizontalVariants[paddingHorizontal],
			paddingVertical && groupPaddingVerticalVariants[paddingVertical],
			className
		),
		...otherProps,
	});
};

export default Group;
