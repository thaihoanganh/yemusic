import { Categories, Frame, useTheme } from '@yemusic/components';
import { GetServerSideProps, NextPage } from 'next';

const HomePage: NextPage = () => {
	const { device } = useTheme();

	return (
		<Frame horizontalPadding={device === 'desktop' ? 'large' : 'small'} verticalPadding="small">
			<Categories />
		</Frame>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

	return {
		props: {
			userAgent,
		},
	};
};

export default HomePage;
