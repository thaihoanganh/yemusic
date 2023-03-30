import { logoStyles } from './Logo.css';

export const Logo = () => {
	return (
		<div className={logoStyles.root}>
			<svg className={logoStyles.symbol} viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M19.9873 0.528588C18.7562 -0.176196 17.2438 -0.176196 16.0127 0.528587L2.01272 8.54319C0.767951 9.25578 0 10.5803 0 12.0146V27.9852C0 29.4195 0.767951 30.744 2.01272 31.4566L16.0127 39.4712C17.2438 40.176 18.7562 40.176 19.9873 39.4712L33.9873 31.4566C35.232 30.744 36 29.4195 36 27.9852V12.0146C36 10.5803 35.232 9.25578 33.9873 8.54319L19.9873 0.528588ZM24.3206 21.7357C25.6625 20.9676 25.6625 19.0325 24.3206 18.2643L16.3166 13.6822C14.9833 12.9189 13.323 13.8816 13.323 15.4179L13.323 24.5821C13.323 26.1184 14.9833 27.0811 16.3166 26.3178L24.3206 21.7357Z"
				/>
			</svg>

			<span className={logoStyles.text}>Yemusic</span>
			<span className={logoStyles.textSub}>.app</span>
		</div>
	);
};

export default Logo;
