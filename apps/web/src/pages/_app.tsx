import {
	DesktopAside,
	DesktopLayout,
	DesktopMainHeader,
	DesktopPlayerControls,
	DesktopSidebar,
	ThemeProvider,
	TrackProvider,
	useTheme,
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
import { useCallback } from 'react';
import '../../public/assets/styles/globals.css';

const _app = ({ Component, pageProps }: AppProps) => {
	const { onSetThemeFromSourceColor } = useTheme();

	const setThemeOnStartApp = useCallback(() => {
		onSetThemeFromSourceColor({
			primaryColor: '#2D8BE1',
			dynamicColor: '#2D8BE1',
		});
	}, []);

	return (
		<div ref={setThemeOnStartApp}>
			<Head>
				<title>Yemusic</title>
			</Head>
			<TracksProvider>
				<QueueProvider>
					<CategoriesProvider>
						<SearchProvider>
							<PlayerControlsProvider>
								<ThemeProvider>
									<TrackProvider>
										<DesktopLayout
											sidebar={<DesktopSidebar />}
											mainHeader={<DesktopMainHeader />}
											aside={<DesktopAside />}
											playerControls={<DesktopPlayerControls />}
										>
											<Component {...pageProps} />
										</DesktopLayout>
									</TrackProvider>
								</ThemeProvider>
							</PlayerControlsProvider>
						</SearchProvider>
					</CategoriesProvider>
				</QueueProvider>
			</TracksProvider>
		</div>
	);
};

export default _app;
