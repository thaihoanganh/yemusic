import React from 'react';

import { unstyledButtonVariant } from './Button.css';

export type UnstyledButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export const UnstyledButton = ({ className, ...otherProps }: UnstyledButtonProps) => {
	return <button className={[unstyledButtonVariant, className].filter(Boolean).join(' ')} {...otherProps} />;
};

export default UnstyledButton;
