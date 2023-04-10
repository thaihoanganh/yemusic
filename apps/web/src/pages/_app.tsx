import { Fragment, useEffect } from 'react';

import {
	DesktopAside,
	DesktopHeader,
	DesktopLayout,
	DesktopPlayerControls,
	DesktopSidebar,
	DownloadTrackModal,
	DownloadTrackProvider,
	MobileLayout,
	MobileNavigation,
	MobilePlayerControls,
	ThemeProvider,
	TrackContextMenu,
	TrackContextMenuProvider,
} from '@yemusic/components';
import {
	CategoriesProvider,
	PlayerControlsProvider,
	PlaylistsProvider,
	QueueProvider,
	SearchProvider,
	TracksProvider,
} from '@yemusic/providers';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import '../../public/assets/styles/globals.css';

import * as gtag from '../lib/gtag';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayoutComponents<P = {}, IP = P> = NextPage<P, IP> & {
	getLayoutComponents?: () => {
		mobileHeader?: React.ReactNode;
	};
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayoutComponents;
};

let didInit = false;
const _app = ({ Component, pageProps }: AppPropsWithLayout) => {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url: string) => {
			gtag.pageview(url);
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	useEffect(() => {
		if (!didInit) {
			didInit = true;
			window.document.title = 'Yemusic';
		}
	}, []);

	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(pageProps.userAgent);
	const device = isMobile ? 'mobile' : 'desktop';

	const mobileHeader = Component.getLayoutComponents ? Component.getLayoutComponents().mobileHeader : undefined;

	return (
		<Fragment>
			<script
				dangerouslySetInnerHTML={{
					__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtag.GOOGLE_ANALYTICS_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
				}}
			/>
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GOOGLE_ANALYTICS_TRACKING_ID}`}
			/>

			<ThemeProvider device={device}>
				<TracksProvider>
					<PlaylistsProvider>
						<CategoriesProvider>
							<QueueProvider>
								<SearchProvider>
									<PlayerControlsProvider>
										<DownloadTrackProvider>
											<TrackContextMenuProvider>
												{isMobile ? (
													<MobileLayout
														bottomNavigation={<MobileNavigation />}
														header={mobileHeader}
														playerController={<MobilePlayerControls />}
													>
														<Component {...pageProps} />
													</MobileLayout>
												) : (
													<DesktopLayout
														aside={<DesktopAside />}
														header={<DesktopHeader />}
														playerControler={<DesktopPlayerControls />}
														sidebar={<DesktopSidebar />}
													>
														<Component {...pageProps} />
													</DesktopLayout>
												)}
												<DownloadTrackModal />
												<TrackContextMenu isMobile={isMobile} />
											</TrackContextMenuProvider>
										</DownloadTrackProvider>
									</PlayerControlsProvider>
								</SearchProvider>
							</QueueProvider>
						</CategoriesProvider>
					</PlaylistsProvider>
				</TracksProvider>
			</ThemeProvider>
		</Fragment>
	);
};

export default _app;
