import { Categories, Frame, MobileHomeHeader, useTheme } from '@yemusic/components';
import { GetServerSideProps } from 'next';

import { NextPageWithLayoutComponents } from './_app';

const HomePage: NextPageWithLayoutComponents = () => {
	const { device } = useTheme();

	return (
		<Frame horizontalPadding={device === 'desktop' ? 'large' : 'small'} verticalPadding="large">
			<Categories />
		</Frame>
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
