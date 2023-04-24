import classNames from 'classnames';

import { iconColorStyles, iconOtherStyles, iconSizeStyles } from './Icon.css';
import { IconProps } from './Icon.types';

export const VolumeUpIcon = ({ color, size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={classNames(iconOtherStyles.root, color && iconColorStyles[color], iconSizeStyles[size])}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_280_1919" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_280_1919)">
				<path d="M15.0499 19.775C14.7999 19.875 14.5709 19.8417 14.3629 19.675C14.1542 19.5084 14.0499 19.2834 14.0499 19C14.0499 18.8667 14.0876 18.75 14.1629 18.65C14.2376 18.55 14.3416 18.4667 14.4749 18.4C15.7916 17.8667 16.8499 17.021 17.6499 15.863C18.4499 14.7044 18.8499 13.4084 18.8499 11.975C18.8499 10.5417 18.4499 9.24569 17.6499 8.08702C16.8499 6.92902 15.7916 6.08336 14.4749 5.55002C14.3249 5.48336 14.2166 5.39569 14.1499 5.28702C14.0832 5.17902 14.0499 5.05836 14.0499 4.92502C14.0499 4.64169 14.1542 4.42069 14.3629 4.26202C14.5709 4.10402 14.7999 4.07502 15.0499 4.17502C16.6499 4.84169 17.9332 5.87502 18.8999 7.27502C19.8666 8.67502 20.3499 10.2417 20.3499 11.975C20.3499 13.7084 19.8666 15.275 18.8999 16.675C17.9332 18.075 16.6499 19.1084 15.0499 19.775ZM4.5499 14.5C4.2999 14.5 4.08757 14.4127 3.9129 14.238C3.73757 14.0627 3.6499 13.85 3.6499 13.6V10.4C3.6499 10.15 3.73757 9.93736 3.9129 9.76202C4.08757 9.58736 4.2999 9.50002 4.5499 9.50002H7.3749L10.1249 6.75002C10.4082 6.46669 10.7332 6.40402 11.0999 6.56202C11.4666 6.72069 11.6499 7.00002 11.6499 7.40002V16.6C11.6499 17 11.4666 17.2794 11.0999 17.438C10.7332 17.596 10.4082 17.5334 10.1249 17.25L7.3749 14.5H4.5499ZM14.0499 15.65V8.30002C14.6832 8.65002 15.1916 9.15836 15.5749 9.82502C15.9582 10.4917 16.1499 11.2167 16.1499 12C16.1499 12.7834 15.9582 13.5 15.5749 14.15C15.1916 14.8 14.6832 15.3 14.0499 15.65ZM10.1499 8.85002L7.9999 11H5.1499V13H7.9999L10.1499 15.15V8.85002Z" />
			</g>
		</svg>
	);
};

export default VolumeUpIcon;
