import React from 'react';

import classNames from 'classnames';

import { unstyledButtonVariants } from './Button.css';

export interface UnstyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	fullWidth?: boolean;
}

export const UnstyledButton = ({ className, fullWidth, ...otherProps }: UnstyledButtonProps) => {
	return (
		<button
			className={classNames(unstyledButtonVariants.root, fullWidth && unstyledButtonVariants.fullWidth, className)}
			{...otherProps}
		/>
	);
};

export default UnstyledButton;
