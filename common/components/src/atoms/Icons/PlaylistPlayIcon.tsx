import React from 'react';

import { iconColorVariants, iconOtherVariants, iconSizeVariants } from './Icon.css';
import { IconProps } from './Icon.types';

export const PlaylistPlayIcon = ({ color = 'on-surface', size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={[iconOtherVariants.root, iconColorVariants[color], iconSizeVariants[size]].filter(Boolean).join(' ')}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_280_1538" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_280_1538)">
				<path d="M3.69995 7.75C3.48328 7.75 3.30428 7.679 3.16295 7.537C3.02095 7.39567 2.94995 7.21667 2.94995 7C2.94995 6.78333 3.02095 6.60433 3.16295 6.463C3.30428 6.321 3.48328 6.25 3.69995 6.25H13.7C13.9 6.25 14.075 6.321 14.225 6.463C14.375 6.60433 14.45 6.78333 14.45 7C14.45 7.21667 14.375 7.39567 14.225 7.537C14.075 7.679 13.9 7.75 13.7 7.75H3.69995ZM3.69995 11.75C3.48328 11.75 3.30428 11.679 3.16295 11.537C3.02095 11.3957 2.94995 11.2167 2.94995 11C2.94995 10.7833 3.02095 10.604 3.16295 10.462C3.30428 10.3207 3.48328 10.25 3.69995 10.25H13.7C13.9 10.25 14.075 10.3207 14.225 10.462C14.375 10.604 14.45 10.7833 14.45 11C14.45 11.2167 14.375 11.3957 14.225 11.537C14.075 11.679 13.9 11.75 13.7 11.75H3.69995ZM3.69995 15.75C3.48328 15.75 3.30428 15.679 3.16295 15.537C3.02095 15.3957 2.94995 15.2167 2.94995 15C2.94995 14.7833 3.02095 14.604 3.16295 14.462C3.30428 14.3207 3.48328 14.25 3.69995 14.25H9.69995C9.89995 14.25 10.075 14.3207 10.225 14.462C10.375 14.604 10.45 14.7833 10.45 15C10.45 15.2167 10.375 15.3957 10.225 15.537C10.075 15.679 9.89995 15.75 9.69995 15.75H3.69995ZM16.925 19.775C16.675 19.9417 16.4166 19.95 16.15 19.8C15.8833 19.65 15.75 19.425 15.75 19.125V14.875C15.75 14.575 15.8833 14.35 16.15 14.2C16.4166 14.05 16.675 14.0583 16.925 14.225L20.125 16.375C20.3583 16.525 20.475 16.7333 20.475 17C20.475 17.2667 20.3583 17.475 20.125 17.625L16.925 19.775Z" />
			</g>
		</svg>
	);
};

export default PlaylistPlayIcon;