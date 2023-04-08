import React from 'react';

import { iconColorStyles, iconOtherStyles, iconSizeStyles } from './Icon.css';
import { IconProps } from './Icon.types';

export const InstallDesktopIcon = ({ color = 'on-surface', size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={[iconOtherStyles.root, iconColorStyles[color], iconSizeStyles[size]].filter(Boolean).join(' ')}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_280_1547" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_280_1547)">
				<path d="M9.34995 20.5C9.09995 20.5 8.88762 20.4127 8.71295 20.238C8.53762 20.0627 8.44995 19.85 8.44995 19.6V18.5H4.24995C3.76662 18.5 3.34595 18.325 2.98795 17.975C2.62928 17.625 2.44995 17.2 2.44995 16.7V5.3C2.44995 4.8 2.62928 4.375 2.98795 4.025C3.34595 3.675 3.76662 3.5 4.24995 3.5H12V5H4.24995C4.16662 5 4.09562 5.02933 4.03695 5.088C3.97895 5.146 3.94995 5.21667 3.94995 5.3V16.7C3.94995 16.7833 3.97895 16.8543 4.03695 16.913C4.09562 16.971 4.16662 17 4.24995 17H19.65C19.7333 17 19.8043 16.971 19.863 16.913C19.921 16.8543 19.95 16.7833 19.95 16.7V14.25H21.45V16.7C21.45 17.2 21.2749 17.625 20.9249 17.975C20.5749 18.325 20.15 18.5 19.65 18.5H15.45V19.6C15.45 19.85 15.3626 20.0627 15.188 20.238C15.0126 20.4127 14.8 20.5 14.55 20.5H9.34995ZM16.95 13.25C16.8333 13.25 16.721 13.2293 16.613 13.188C16.5043 13.146 16.4083 13.0833 16.325 13L12.825 9.5C12.675 9.36667 12.6 9.19567 12.6 8.987C12.6 8.779 12.675 8.6 12.825 8.45C12.9583 8.3 13.1293 8.225 13.338 8.225C13.546 8.225 13.725 8.3 13.875 8.45L16.2 10.775V4.25C16.2 4.03333 16.271 3.854 16.413 3.712C16.5543 3.57067 16.7333 3.5 16.95 3.5C17.1666 3.5 17.346 3.57067 17.488 3.712C17.6293 3.854 17.7 4.03333 17.7 4.25V10.775L20.025 8.45C20.175 8.31667 20.354 8.246 20.562 8.238C20.7706 8.22933 20.95 8.3 21.1 8.45C21.2333 8.58333 21.2999 8.75833 21.2999 8.975C21.2999 9.19167 21.2333 9.36667 21.1 9.5L17.575 13C17.4916 13.0833 17.396 13.146 17.288 13.188C17.1793 13.2293 17.0666 13.25 16.95 13.25Z" />
			</g>
		</svg>
	);
};

export default InstallDesktopIcon;