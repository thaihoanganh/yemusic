import classNames from 'classnames';

import { iconColorStyles, iconOtherStyles, iconSizeStyles } from './Icon.css';
import { IconProps } from './Icon.types';

export const VolumeDownAltIcon = ({ color, size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={classNames(iconOtherStyles.root, color && iconColorStyles[color], iconSizeStyles[size])}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_280_1552" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_280_1552)">
				<path d="M6.4 14.5C6.15 14.5 5.93767 14.4127 5.763 14.238C5.58767 14.0627 5.5 13.85 5.5 13.6V10.4C5.5 10.15 5.58767 9.93735 5.763 9.76202C5.93767 9.58735 6.15 9.50002 6.4 9.50002H9.2L11.975 6.75002C12.2583 6.46669 12.5833 6.40402 12.95 6.56202C13.3167 6.72069 13.5 7.00002 13.5 7.40002V16.6C13.5 17 13.3167 17.2794 12.95 17.438C12.5833 17.596 12.2583 17.5334 11.975 17.25L9.2 14.5H6.4ZM15.875 15.65V8.30002C16.525 8.65002 17.0417 9.15835 17.425 9.82502C17.8083 10.4917 18 11.2167 18 12C18 12.7834 17.8083 13.5 17.425 14.15C17.0417 14.8 16.525 15.3 15.875 15.65ZM12 8.85002L9.85 11H7V13H9.85L12 15.15V8.85002Z" />
			</g>
		</svg>
	);
};

export default VolumeDownAltIcon;
