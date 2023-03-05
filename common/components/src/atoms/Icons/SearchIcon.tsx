import React from 'react';

import { iconColorVariants, iconOtherVariants, iconSizeVariants } from './Icon.css';
import { IconProps } from './Icon.types';

export const SearchIcon = ({ color = 'on-surface', size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={[iconOtherVariants.root, iconColorVariants[color], iconSizeVariants[size]].filter(Boolean).join(' ')}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_280_1535" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_280_1535)">
				<path d="M19.0249 20.05L13.2499 14.3C12.7499 14.7167 12.1749 15.0417 11.5249 15.275C10.8749 15.5083 10.2082 15.625 9.5249 15.625C7.80824 15.625 6.35824 15.0333 5.1749 13.85C3.99157 12.6667 3.3999 11.2167 3.3999 9.5C3.3999 7.8 3.99157 6.354 5.1749 5.162C6.35824 3.97067 7.80824 3.375 9.5249 3.375C11.2249 3.375 12.6666 3.96667 13.8499 5.15C15.0332 6.33333 15.6249 7.78333 15.6249 9.5C15.6249 10.2167 15.5082 10.9 15.2749 11.55C15.0416 12.2 14.7249 12.7667 14.3249 13.25L20.0999 19.025C20.2332 19.1583 20.2999 19.325 20.2999 19.525C20.2999 19.725 20.2249 19.9 20.0749 20.05C19.9249 20.2 19.7459 20.275 19.5379 20.275C19.3292 20.275 19.1582 20.2 19.0249 20.05ZM9.5249 14.125C10.8082 14.125 11.8959 13.675 12.7879 12.775C13.6792 11.875 14.1249 10.7833 14.1249 9.5C14.1249 8.21667 13.6792 7.125 12.7879 6.225C11.8959 5.325 10.8082 4.875 9.5249 4.875C8.2249 4.875 7.12924 5.325 6.2379 6.225C5.3459 7.125 4.8999 8.21667 4.8999 9.5C4.8999 10.7833 5.3459 11.875 6.2379 12.775C7.12924 13.675 8.2249 14.125 9.5249 14.125Z" />
			</g>
		</svg>
	);
};

export default SearchIcon;
