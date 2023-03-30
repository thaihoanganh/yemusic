import React from 'react';

import { iconColorStyles, iconOtherStyles, iconSizeStyles } from './Icon.css';
import { IconProps } from './Icon.types';

export const ExpandMoreIcon = ({ color = 'on-surface', size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={[iconOtherStyles.root, iconColorStyles[color], iconSizeStyles[size]].filter(Boolean).join(' ')}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_512_440" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_512_440)">
				<path d="M12 14.6615C11.8859 14.6615 11.7753 14.6423 11.6683 14.6038C11.5612 14.5654 11.4609 14.4993 11.3673 14.4057L6.85769 9.89615C6.71282 9.75128 6.64296 9.57821 6.64809 9.37693C6.65321 9.17564 6.72821 9.00257 6.87309 8.8577C7.01796 8.71283 7.19359 8.6404 7.39999 8.6404C7.60639 8.6404 7.78202 8.71283 7.92689 8.8577L12 12.9308L16.0885 8.84232C16.2333 8.69746 16.4064 8.62758 16.6077 8.6327C16.809 8.63783 16.982 8.71283 17.1269 8.8577C17.2718 9.00257 17.3442 9.17821 17.3442 9.38463C17.3442 9.59103 17.2718 9.76666 17.1269 9.91153L12.6327 14.4057C12.5391 14.4993 12.4404 14.5654 12.3365 14.6038C12.2327 14.6423 12.1205 14.6615 12 14.6615Z" />
			</g>
		</svg>
	);
};

export default ExpandMoreIcon;
