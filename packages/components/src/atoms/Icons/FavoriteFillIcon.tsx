import classNames from 'classnames';

import { iconColorStyles, iconOtherStyles, iconSizeStyles } from './Icon.css';
import { IconProps } from './Icon.types';

export const FavoriteFillIcon = ({ color, size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={classNames(iconOtherStyles.root, color && iconColorStyles[color], iconSizeStyles[size])}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_280_1525" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_280_1525)">
				<path d="M10.65 19.8L8.925 18.225C7.15833 16.6084 5.56267 15.004 4.138 13.412C2.71267 11.8207 2 10.0667 2 8.15002C2 6.58336 2.525 5.27502 3.575 4.22502C4.625 3.17502 5.93333 2.65002 7.5 2.65002C8.38333 2.65002 9.21667 2.83736 10 3.21202C10.7833 3.58736 11.45 4.10002 12 4.75002C12.55 4.10002 13.2167 3.58736 14 3.21202C14.7833 2.83736 15.6167 2.65002 16.5 2.65002C18.0667 2.65002 19.375 3.17502 20.425 4.22502C21.475 5.27502 22 6.58336 22 8.15002C22 10.0667 21.2917 11.825 19.875 13.425C18.4583 15.025 16.85 16.6334 15.05 18.25L13.35 19.8C12.9667 20.15 12.5167 20.325 12 20.325C11.4833 20.325 11.0333 20.15 10.65 19.8Z" />
			</g>
		</svg>
	);
};

export default FavoriteFillIcon;
