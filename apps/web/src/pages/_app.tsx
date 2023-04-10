import { useEffect } from 'react';

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
import '../../public/assets/styles/globals.css';

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
	);
};

export default _app;
