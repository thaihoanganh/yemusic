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
      frameOtherVariants.root,
      alignItems && frameAlignItemsVariants[alignItems],
      cornerRadius && frameCornerRadiusVariants[cornerRadius],
      direction && frameDirectionVariants[direction],
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

export default Frame;
