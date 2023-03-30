import { iconColorStyles, iconOtherStyles, iconSizeStyles } from './Icon.css';
import { IconProps } from './Icon.types';

export const PlayCircleIcon = ({ color = 'on-surface', size = 'medium', ...otherProps }: IconProps) => {
	return (
		<svg
			className={[iconOtherStyles.root, iconColorStyles[color], iconSizeStyles[size]].filter(Boolean).join(' ')}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...otherProps}
		>
			<mask id="mask0_508_440" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24" />
			</mask>
			<g mask="url(#mask0_508_440)">
				<path d="M10 9.90193V14.0981C10 14.4245 10.1397 14.6625 10.4192 14.8121C10.6987 14.9617 10.9731 14.9474 11.2423 14.7692L14.5269 12.6769C14.7795 12.5192 14.9058 12.2936 14.9058 12C14.9058 11.7064 14.7795 11.4808 14.5269 11.3231L11.2423 9.23077C10.9731 9.05256 10.6987 9.03826 10.4192 9.18788C10.1397 9.33748 10 9.57549 10 9.90193ZM12.0034 21C10.7588 21 9.58872 20.7638 8.4931 20.2915C7.39748 19.8192 6.44444 19.1782 5.63397 18.3685C4.82352 17.5588 4.18192 16.6066 3.70915 15.512C3.23638 14.4174 3 13.2479 3 12.0033C3 10.7588 3.23616 9.58872 3.70848 8.4931C4.18081 7.39748 4.82183 6.44444 5.63153 5.63398C6.44123 4.82353 7.39337 4.18192 8.48795 3.70915C9.58255 3.23638 10.7521 3 11.9966 3C13.2412 3 14.4113 3.23616 15.5069 3.70848C16.6025 4.18081 17.5556 4.82182 18.366 5.63152C19.1765 6.44122 19.8181 7.39337 20.2908 8.48795C20.7636 9.58255 21 10.7521 21 11.9967C21 13.2412 20.7638 14.4113 20.2915 15.5069C19.8192 16.6025 19.1782 17.5556 18.3685 18.366C17.5588 19.1765 16.6066 19.8181 15.512 20.2908C14.4174 20.7636 13.2479 21 12.0034 21ZM12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 9.78333 19.2208 7.89583 17.6625 6.3375C16.1042 4.77917 14.2167 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20Z" />
			</g>
		</svg>
	);
};

export default PlayCircleIcon;
