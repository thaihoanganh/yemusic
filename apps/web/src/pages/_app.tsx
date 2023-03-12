import {
	DesktopLayout,
	DesktopMainHeader,
	DesktopPlayerControls,
	DesktopSidebar,
	PlayerControlsProvider,
	ThemeProvider,
	useTheme,
} from '@yemusic/components';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import '../../public/assets/styles/globals.css';

const _app = ({ Component, pageProps }: AppProps) => {
	const { onSetThemeFromSourceColor } = useTheme();

	useEffect(() => {
		onSetThemeFromSourceColor({
			primaryColor: '#2D8BE1',
			dynamicColor: '#2D8BE1',
		});
	}, []);

	return (
		<ThemeProvider>
			<DesktopLayout
				sidebar={<DesktopSidebar />}
				mainHeader={<DesktopMainHeader />}
				playerControls={<DesktopPlayerControls />}
			>
				<Component {...pageProps} />
			</DesktopLayout>
		</ThemeProvider>
	);
};

export default _app;
