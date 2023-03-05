import React from 'react';

import { iconColorVariants, iconOtherVariants, iconSizeVariants } from './Icon.css';
import { IconProps } from './Icon.types';

export const SkipNextIcon = ({ color = 'on-surface', size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={[iconOtherVariants.root, iconColorVariants[color], iconSizeVariants[size]].filter(Boolean).join(' ')}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_280_1549" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_280_1549)">
				<path d="M17.125 17.3C16.925 17.3 16.75 17.229 16.6 17.087C16.45 16.9457 16.375 16.7667 16.375 16.55V7.45001C16.375 7.23335 16.45 7.05401 16.6 6.91201C16.75 6.77068 16.925 6.70001 17.125 6.70001C17.3417 6.70001 17.521 6.77068 17.663 6.91201C17.8043 7.05401 17.875 7.23335 17.875 7.45001V16.55C17.875 16.7667 17.8043 16.9457 17.663 17.087C17.521 17.229 17.3417 17.3 17.125 17.3ZM7.525 16.375C7.225 16.5917 6.91667 16.6083 6.6 16.425C6.28333 16.2417 6.125 15.975 6.125 15.625V8.37501C6.125 8.02501 6.28333 7.75835 6.6 7.57501C6.91667 7.39168 7.225 7.40835 7.525 7.62501L12.95 11.25C13.2333 11.4333 13.375 11.6833 13.375 12C13.375 12.3167 13.2333 12.5667 12.95 12.75L7.525 16.375ZM7.625 14.5L11.375 12L7.625 9.50001V14.5Z" />
			</g>
		</svg>
	);
};

export default SkipNextIcon;
