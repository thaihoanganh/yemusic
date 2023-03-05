import React from 'react';

import { iconColorVariants, iconOtherVariants, iconSizeVariants } from './Icon.css';
import { IconProps } from './Icon.types';

export const ArrowBackIcon = ({ color = 'on-surface', size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={[iconOtherVariants.root, iconColorVariants[color], iconSizeVariants[size]].filter(Boolean).join(' ')}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_270_741" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_270_741)">
				<path d="M11.1 19.1L4.65 12.625C4.55 12.5417 4.47933 12.4457 4.438 12.337C4.396 12.229 4.375 12.1167 4.375 12C4.375 11.8833 4.396 11.7707 4.438 11.662C4.47933 11.554 4.55 11.4583 4.65 11.375L11.1 4.90001C11.25 4.76668 11.425 4.69568 11.625 4.68701C11.825 4.67901 12 4.75001 12.15 4.90001C12.3 5.05001 12.379 5.22501 12.387 5.42501C12.3957 5.62501 12.325 5.80834 12.175 5.97501L6.875 11.25H18.5C18.7 11.25 18.875 11.3207 19.025 11.462C19.175 11.604 19.25 11.7833 19.25 12C19.25 12.2167 19.175 12.3957 19.025 12.537C18.875 12.679 18.7 12.75 18.5 12.75H6.875L12.175 18.05C12.3083 18.1833 12.379 18.354 12.387 18.562C12.3957 18.7707 12.325 18.95 12.175 19.1C12.025 19.25 11.846 19.325 11.638 19.325C11.4293 19.325 11.25 19.25 11.1 19.1Z" />
			</g>
		</svg>
	);
};

export default ArrowBackIcon;
