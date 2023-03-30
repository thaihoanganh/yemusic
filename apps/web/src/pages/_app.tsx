import { Fragment } from 'react';

import {
	DesktopLayout,
	MobileLayout,
	ThemeProvider,
	TrackContextMenu,
	TrackContextMenuProvider,
} from '@yemusic/components';
import {
	CategoriesProvider,
	PlayerControlsProvider,
	QueueProvider,
	SearchProvider,
	TracksProvider,
} from '@yemusic/providers';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../../public/assets/styles/globals.css';

const _app = ({
	Component,
	pageProps,
}: AppProps<{
	userAgent: string;
}>) => {
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(pageProps.userAgent);
	const device = isMobile ? 'mobile' : 'desktop';

	return (
		<Fragment>
			<Head>
				<title>Yemusic</title>
			</Head>
			<ThemeProvider device={device}>
				<TracksProvider>
					<QueueProvider>
						<CategoriesProvider>
							<SearchProvider>
								<PlayerControlsProvider>
									<TrackContextMenuProvider>
										{isMobile ? (
											<MobileLayout>
												<Component {...pageProps} />
											</MobileLayout>
										) : (
											<DesktopLayout>
												<Component {...pageProps} />
											</DesktopLayout>
										)}
										<TrackContextMenu isMobile={isMobile} />
									</TrackContextMenuProvider>
								</PlayerControlsProvider>
							</SearchProvider>
						</CategoriesProvider>
					</QueueProvider>
				</TracksProvider>
			</ThemeProvider>
		</Fragment>
	);
};

export default _app;
