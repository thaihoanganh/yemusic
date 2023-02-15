import React from 'react';

import { AppProps } from 'next/app';

const _app = ({ Component, pageProps }: AppProps) => {
	return (
		<div>
			<Component {...pageProps} />
		</div>
	);
};

export default _app;
