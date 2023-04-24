import classNames from 'classnames';

import { iconColorStyles, iconOtherStyles, iconSizeStyles } from './Icon.css';
import { IconProps } from './Icon.types';

export const DownloadIcon = ({ color, size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={classNames(iconOtherStyles.root, color && iconColorStyles[color], iconSizeStyles[size])}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_280_1554" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_280_1554)">
				<path d="M12 15.25C11.8833 15.25 11.771 15.2293 11.663 15.188C11.5543 15.146 11.4583 15.075 11.375 14.975L8.25 11.875C8.11667 11.7417 8.05 11.5667 8.05 11.35C8.05 11.1333 8.11667 10.9583 8.25 10.825C8.4 10.675 8.579 10.5957 8.787 10.587C8.99567 10.579 9.175 10.65 9.325 10.8L11.25 12.725V5.07501C11.25 4.85835 11.321 4.67901 11.463 4.53701C11.6043 4.39568 11.7833 4.32501 12 4.32501C12.2167 4.32501 12.396 4.39568 12.538 4.53701C12.6793 4.67901 12.75 4.85835 12.75 5.07501V12.725L14.675 10.8C14.8083 10.6667 14.9833 10.6 15.2 10.6C15.4167 10.6 15.6 10.675 15.75 10.825C15.8833 10.9583 15.95 11.129 15.95 11.337C15.95 11.5457 15.8833 11.725 15.75 11.875L12.625 14.975C12.5417 15.075 12.446 15.146 12.338 15.188C12.2293 15.2293 12.1167 15.25 12 15.25ZM6.3 19.5C5.8 19.5 5.375 19.325 5.025 18.975C4.675 18.625 4.5 18.2 4.5 17.7V15.75C4.5 15.5333 4.571 15.354 4.713 15.212C4.85433 15.0707 5.03333 15 5.25 15C5.46667 15 5.64567 15.0707 5.787 15.212C5.929 15.354 6 15.5333 6 15.75V17.7C6 17.7667 6.03333 17.8333 6.1 17.9C6.16667 17.9667 6.23333 18 6.3 18H17.7C17.7667 18 17.8333 17.9667 17.9 17.9C17.9667 17.8333 18 17.7667 18 17.7V15.75C18 15.5333 18.0707 15.354 18.212 15.212C18.354 15.0707 18.5333 15 18.75 15C18.9667 15 19.146 15.0707 19.288 15.212C19.4293 15.354 19.5 15.5333 19.5 15.75V17.7C19.5 18.2 19.325 18.625 18.975 18.975C18.625 19.325 18.2 19.5 17.7 19.5H6.3Z" />
			</g>
		</svg>
	);
};

export default DownloadIcon;
