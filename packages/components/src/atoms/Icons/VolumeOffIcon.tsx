import classNames from 'classnames';

import { iconColorStyles, iconOtherStyles, iconSizeStyles } from './Icon.css';
import { IconProps } from './Icon.types';

export const VolumeOffIcon = ({ color, size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={classNames(iconOtherStyles.root, color && iconColorStyles[color], iconSizeStyles[size])}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_280_1553" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_280_1553)">
				<path d="M18.9499 21.6L16.4499 19.125C16.2499 19.2417 16.0459 19.354 15.8379 19.462C15.6292 19.5707 15.4166 19.675 15.1999 19.775C14.9499 19.875 14.7166 19.8417 14.4999 19.675C14.2832 19.5083 14.1749 19.2833 14.1749 19C14.1749 18.8667 14.2166 18.75 14.2999 18.65C14.3832 18.55 14.4832 18.4667 14.5999 18.4C14.7332 18.35 14.8666 18.2957 14.9999 18.237C15.1332 18.179 15.2582 18.1167 15.3749 18.05L11.7999 14.45V16.6C11.7999 17 11.6126 17.2793 11.2379 17.438C10.8626 17.596 10.5332 17.5333 10.2499 17.25L7.49989 14.5H4.69989C4.43322 14.5 4.21655 14.4127 4.04989 14.238C3.88322 14.0627 3.79989 13.85 3.79989 13.6V10.4C3.79989 10.15 3.88322 9.93732 4.04989 9.76199C4.21655 9.58732 4.43322 9.49999 4.69989 9.49999H6.82489L2.52489 5.19999C2.39155 5.04999 2.32055 4.87065 2.31189 4.66199C2.30389 4.45399 2.37489 4.27499 2.52489 4.12499C2.67489 3.99165 2.84989 3.92499 3.04989 3.92499C3.24989 3.92499 3.42489 3.99165 3.57489 4.12499L19.9999 20.55C20.1332 20.7 20.2042 20.879 20.2129 21.087C20.2209 21.2957 20.1499 21.4667 19.9999 21.6C19.8499 21.75 19.6749 21.825 19.4749 21.825C19.2749 21.825 19.0999 21.75 18.9499 21.6ZM15.1999 4.17499C16.7832 4.84165 18.0582 5.87499 19.0249 7.27499C19.9916 8.67499 20.4749 10.2417 20.4749 11.975C20.4749 12.8583 20.3459 13.7 20.0879 14.5C19.8292 15.3 19.4582 16.0417 18.9749 16.725L17.8999 15.65C18.2499 15.1167 18.5166 14.5373 18.6999 13.912C18.8832 13.2873 18.9749 12.6417 18.9749 11.975C18.9749 10.5417 18.5749 9.24565 17.7749 8.08699C16.9749 6.92899 15.9166 6.08332 14.5999 5.54999C14.4666 5.48332 14.3626 5.39565 14.2879 5.28699C14.2126 5.17899 14.1749 5.05832 14.1749 4.92499C14.1749 4.64165 14.2832 4.42065 14.4999 4.26199C14.7166 4.10399 14.9499 4.07499 15.1999 4.17499ZM15.9249 13.675L14.1749 11.925V8.29999C14.8416 8.66665 15.3626 9.18332 15.7379 9.84999C16.1126 10.5167 16.2999 11.2333 16.2999 12C16.2999 12.3 16.2666 12.5873 16.1999 12.862C16.1332 13.1373 16.0416 13.4083 15.9249 13.675ZM11.7999 9.52499L9.62489 7.37499L10.2499 6.74999C10.5332 6.46665 10.8626 6.40399 11.2379 6.56199C11.6126 6.72065 11.7999 6.99999 11.7999 7.39999V9.52499ZM10.2999 15.15V12.95L8.32489 11H5.29989V13H8.14989L10.2999 15.15Z" />
			</g>
		</svg>
	);
};

export default VolumeOffIcon;
