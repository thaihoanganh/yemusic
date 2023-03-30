import { Frame, SearchResults, useTheme } from '@yemusic/components';
import { GetServerSideProps, NextPage } from 'next';

const search: NextPage = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { device } = useTheme();

	const isDesktop = device === 'desktop';

	return (
		<Frame horizontalPadding={isDesktop ? 'large' : 'small'} verticalPadding="small">
			<SearchResults />
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

export default search;
