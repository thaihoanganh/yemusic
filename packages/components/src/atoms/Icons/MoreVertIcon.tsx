import classNames from 'classnames';

import { iconColorStyles, iconOtherStyles, iconSizeStyles } from './Icon.css';
import { IconProps } from './Icon.types';

export const MoreVertIcon = ({ color, size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={classNames(iconOtherStyles.root, color && iconColorStyles[color], iconSizeStyles[size])}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_280_1539" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_280_1539)">
				<path d="M12 19.275C11.5833 19.275 11.2293 19.129 10.938 18.837C10.646 18.5457 10.5 18.1917 10.5 17.775C10.5 17.3583 10.646 17.004 10.938 16.712C11.2293 16.4207 11.5833 16.275 12 16.275C12.4167 16.275 12.7707 16.4207 13.062 16.712C13.354 17.004 13.5 17.3583 13.5 17.775C13.5 18.1917 13.354 18.5457 13.062 18.837C12.7707 19.129 12.4167 19.275 12 19.275ZM12 13.5C11.5833 13.5 11.2293 13.354 10.938 13.062C10.646 12.7707 10.5 12.4167 10.5 12C10.5 11.5833 10.646 11.2293 10.938 10.938C11.2293 10.646 11.5833 10.5 12 10.5C12.4167 10.5 12.7707 10.646 13.062 10.938C13.354 11.2293 13.5 11.5833 13.5 12C13.5 12.4167 13.354 12.7707 13.062 13.062C12.7707 13.354 12.4167 13.5 12 13.5ZM12 7.72501C11.5833 7.72501 11.2293 7.57901 10.938 7.28701C10.646 6.99567 10.5 6.64167 10.5 6.22501C10.5 5.80834 10.646 5.45401 10.938 5.16201C11.2293 4.87067 11.5833 4.72501 12 4.72501C12.4167 4.72501 12.7707 4.87067 13.062 5.16201C13.354 5.45401 13.5 5.80834 13.5 6.22501C13.5 6.64167 13.354 6.99567 13.062 7.28701C12.7707 7.57901 12.4167 7.72501 12 7.72501Z" />
			</g>
		</svg>
	);
};

export default MoreVertIcon;
