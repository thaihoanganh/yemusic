import { AppProps } from 'next/app';
import '../../public/assets/styles/globals.css';

const _app = ({ Component, pageProps }: AppProps) => {
	return (
		<div>
			<Component {...pageProps} />
		</div>
	);
};

export default _app;
