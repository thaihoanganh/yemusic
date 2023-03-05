import React from 'react';

import { unstyledButtonVariants } from './Button.css';

export interface UnstyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	fullWidth?: boolean;
}

export const UnstyledButton = ({ className, fullWidth, ...otherProps }: UnstyledButtonProps) => {
	return (
		<button
			className={[unstyledButtonVariants.root, fullWidth && unstyledButtonVariants.fullWidth, className]
				.filter(Boolean)
				.join(' ')}
			{...otherProps}
		/>
	);
};

export default UnstyledButton;
