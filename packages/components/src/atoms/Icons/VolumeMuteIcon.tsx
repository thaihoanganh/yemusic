import classNames from 'classnames';

import { iconColorStyles, iconOtherStyles, iconSizeStyles } from './Icon.css';
import { IconProps } from './Icon.types';

export const VolumeMuteIcon = ({ color, size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={classNames(iconOtherStyles.root, color && iconColorStyles[color], iconSizeStyles[size])}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_280_1543" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_280_1543)">
				<path d="M8.4 14.5C8.15 14.5 7.93767 14.4127 7.763 14.238C7.58767 14.0627 7.5 13.85 7.5 13.6V10.4C7.5 10.15 7.58767 9.93735 7.763 9.76202C7.93767 9.58735 8.15 9.50002 8.4 9.50002H11.2L13.975 6.75002C14.2583 6.46669 14.5833 6.40402 14.95 6.56202C15.3167 6.72069 15.5 7.00002 15.5 7.40002V16.6C15.5 17 15.3167 17.2794 14.95 17.438C14.5833 17.596 14.2583 17.5334 13.975 17.25L11.2 14.5H8.4ZM14 8.85002L11.85 11H9V13H11.85L14 15.15V8.85002Z" />
			</g>
		</svg>
	);
};

export default VolumeMuteIcon;
