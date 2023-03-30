import React from 'react';

import { iconColorStyles, iconOtherStyles, iconSizeStyles } from './Icon.css';
import { IconProps } from './Icon.types';

export const ArrowForwardIcon = ({ color = 'on-surface', size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={[iconOtherStyles.root, iconColorStyles[color], iconSizeStyles[size]].filter(Boolean).join(' ')}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_270_744" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_270_744)">
				<path d="M11.475 19.1C11.325 18.95 11.25 18.7706 11.25 18.562C11.25 18.354 11.3167 18.175 11.45 18.025L16.75 12.75H5.125C4.925 12.75 4.75 12.679 4.6 12.537C4.45 12.3956 4.375 12.2166 4.375 12C4.375 11.7833 4.45 11.604 4.6 11.462C4.75 11.3206 4.925 11.25 5.125 11.25H16.75L11.45 5.97495C11.3167 5.82495 11.25 5.64595 11.25 5.43795C11.25 5.22928 11.325 5.04995 11.475 4.89995C11.625 4.76662 11.8 4.69995 12 4.69995C12.2 4.69995 12.375 4.76662 12.525 4.89995L18.975 11.375C19.075 11.4583 19.146 11.554 19.188 11.662C19.2293 11.7706 19.25 11.8833 19.25 12C19.25 12.1166 19.2293 12.229 19.188 12.337C19.146 12.4456 19.075 12.5416 18.975 12.625L12.525 19.1C12.375 19.2333 12.2 19.3 12 19.3C11.8 19.3 11.625 19.2333 11.475 19.1Z" />
			</g>
		</svg>
	);
};

export default ArrowForwardIcon;
