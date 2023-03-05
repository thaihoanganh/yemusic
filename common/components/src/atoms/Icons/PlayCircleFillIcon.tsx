import React from 'react';

import { iconColorVariants, iconOtherVariants, iconSizeVariants } from './Icon.css';
import { IconProps } from './Icon.types';

export const PlayCircleFillIcon = ({ color = 'on-surface', size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={[iconOtherVariants.root, iconColorVariants[color], iconSizeVariants[size]].filter(Boolean).join(' ')}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_280_1545" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_280_1545)">
				<path d="M9.75 9.625V14.375C9.75 14.7417 9.90833 15.0127 10.225 15.188C10.5417 15.3627 10.85 15.3417 11.15 15.125L14.875 12.75C15.1583 12.5833 15.3 12.3333 15.3 12C15.3 11.6667 15.1583 11.4167 14.875 11.25L11.15 8.875C10.85 8.65833 10.5417 8.63733 10.225 8.812C9.90833 8.98733 9.75 9.25833 9.75 9.625ZM12 21.5C10.6833 21.5 9.446 21.25 8.288 20.75C7.12933 20.25 6.125 19.575 5.275 18.725C4.425 17.875 3.75 16.8707 3.25 15.712C2.75 14.554 2.5 13.3167 2.5 12C2.5 10.6833 2.75 9.44567 3.25 8.287C3.75 7.129 4.425 6.125 5.275 5.275C6.125 4.425 7.12933 3.75 8.288 3.25C9.446 2.75 10.6833 2.5 12 2.5C13.3167 2.5 14.5543 2.75 15.713 3.25C16.871 3.75 17.875 4.425 18.725 5.275C19.575 6.125 20.25 7.129 20.75 8.287C21.25 9.44567 21.5 10.6833 21.5 12C21.5 13.3167 21.25 14.554 20.75 15.712C20.25 16.8707 19.575 17.875 18.725 18.725C17.875 19.575 16.871 20.25 15.713 20.75C14.5543 21.25 13.3167 21.5 12 21.5Z" />
			</g>
		</svg>
	);
};

export default PlayCircleFillIcon;
