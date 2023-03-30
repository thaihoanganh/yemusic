import React from 'react';

import classNames from 'classnames';

import { unstyledButtonStyles } from './Button.css';

export interface UnstyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	fullWidth?: boolean;
}

export const UnstyledButton = ({ className, fullWidth, ...otherProps }: UnstyledButtonProps) => {
	return (
		<button
			className={classNames(unstyledButtonStyles.root, fullWidth && unstyledButtonStyles.fullWidth, className)}
			{...otherProps}
		/>
	);
};

export default UnstyledButton;
