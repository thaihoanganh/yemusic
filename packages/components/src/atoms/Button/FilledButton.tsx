import React, { cloneElement, isValidElement } from 'react';

import classNames from 'classnames';

import { IconProps } from '../Icons/Icon.types';
import { StateLayer } from '../StateLayer';

import {
	baseButtonColors,
	baseButtonRoundedStyles,
	baseButtonSizeStyles,
	filledButtonColorStyles,
	filledButtonStyles,
} from './Button.css';

type IBaseButton = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export interface FilledButtonProps extends IBaseButton {
	color?: keyof typeof baseButtonColors;
	icon?: React.ReactElement<IconProps>;
	fullWidth?: boolean;
	rounded?: 'none' | 'small' | 'medium' | 'large';
	size?: 'small' | 'medium' | 'large';
}

export const FilledButton = ({
	color = 'primary-container',
	className,
	disabled,
	children,
	icon,
	fullWidth,
	rounded = 'small',
	size = 'medium',
	...otherProps
}: FilledButtonProps) => {
	return (
		<label
			className={classNames(
				filledButtonStyles.root,
				baseButtonRoundedStyles[rounded],
				fullWidth && filledButtonStyles.fullWidth
			)}
		>
			<button
				className={classNames(
					filledButtonStyles.button,
					filledButtonColorStyles[color],
					baseButtonSizeStyles[size],
					className
				)}
				disabled={disabled}
				{...otherProps}
			>
				{isValidElement(icon) &&
					cloneElement(icon, {
						color: baseButtonColors[color],
					})}
				{children}
			</button>
			{!disabled && (
				<StateLayer
					className={filledButtonStyles.overlay}
					color="inverse-surface"
					state={['hover', 'focus', 'pressed']}
				/>
			)}
		</label>
	);
};

export default FilledButton;
