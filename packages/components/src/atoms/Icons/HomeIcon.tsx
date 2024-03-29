import classNames from 'classnames';

import { iconColorStyles, iconOtherStyles, iconSizeStyles } from './Icon.css';
import { IconProps } from './Icon.types';

export const HomeIcon = ({ color, size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={classNames(iconOtherStyles.root, color && iconColorStyles[color], iconSizeStyles[size])}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_280_1527" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_280_1527)">
				<path d="M6 19H9.35V13.05H14.65V19H18V10L12 5.475L6 10V19ZM6 20.5C5.58333 20.5 5.22933 20.354 4.938 20.062C4.646 19.7707 4.5 19.4167 4.5 19V10C4.5 9.76667 4.554 9.54167 4.662 9.325C4.77067 9.10833 4.91667 8.93333 5.1 8.8L11.1 4.275C11.2333 4.175 11.375 4.104 11.525 4.062C11.675 4.02067 11.8333 4 12 4C12.1667 4 12.325 4.02067 12.475 4.062C12.625 4.104 12.7667 4.175 12.9 4.275L18.9 8.8C19.0833 8.93333 19.229 9.10833 19.337 9.325C19.4457 9.54167 19.5 9.76667 19.5 10V19C19.5 19.4167 19.354 19.7707 19.062 20.062C18.7707 20.354 18.4167 20.5 18 20.5H13.15V14.55H10.85V20.5H6Z" />
			</g>
		</svg>
	);
};

export default HomeIcon;
