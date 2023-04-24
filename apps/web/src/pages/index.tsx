import { MobileHomeHeader, RecentlyPlayedTracks, Stack, TrendingTracks } from '@yemusic/components';
import { GetServerSideProps } from 'next';

import { NextPageWithLayoutComponents } from './_app';

const HomePage: NextPageWithLayoutComponents = () => {
	return (
		<Stack spacing="large">
			<RecentlyPlayedTracks />
			<TrendingTracks />
		</Stack>
	);
};

HomePage.getLayoutComponents = () => ({
	mobileHeader: <MobileHomeHeader />,
});

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

	return {
		props: {
			userAgent,
		},
	};
};

export default HomePage;
