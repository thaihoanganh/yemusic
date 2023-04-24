import classNames from 'classnames';

import { iconColorStyles, iconOtherStyles, iconSizeStyles } from './Icon.css';
import { IconProps } from './Icon.types';

export const SkipPreviousIcon = ({ color, size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={classNames(iconOtherStyles.root, color && iconColorStyles[color], iconSizeStyles[size])}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_280_1550" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_280_1550)">
				<path d="M6.875 17.3C6.65833 17.3 6.47933 17.229 6.338 17.087C6.196 16.9457 6.125 16.7667 6.125 16.55V7.45001C6.125 7.23335 6.196 7.05401 6.338 6.91201C6.47933 6.77068 6.65833 6.70001 6.875 6.70001C7.075 6.70001 7.25 6.77068 7.4 6.91201C7.55 7.05401 7.625 7.23335 7.625 7.45001V16.55C7.625 16.7667 7.55 16.9457 7.4 17.087C7.25 17.229 7.075 17.3 6.875 17.3ZM16.475 16.375L11.05 12.75C10.7667 12.5667 10.625 12.3167 10.625 12C10.625 11.6833 10.7667 11.4333 11.05 11.25L16.475 7.62501C16.775 7.40835 17.0833 7.39168 17.4 7.57501C17.7167 7.75835 17.875 8.02501 17.875 8.37501V15.625C17.875 15.975 17.7167 16.2417 17.4 16.425C17.0833 16.6083 16.775 16.5917 16.475 16.375ZM16.375 14.5V9.50001L12.625 12L16.375 14.5Z" />
			</g>
		</svg>
	);
};

export default SkipPreviousIcon;
