import { SearchResults } from '@yemusic/components';
import MobileSearchHeader from '@yemusic/components/src/organisms/MobileHeader/MobileSearchHeader';
import { GetServerSideProps } from 'next';

import { NextPageWithLayoutComponents } from './_app';

const SearchPage: NextPageWithLayoutComponents = () => {
	return <SearchResults />;
};

SearchPage.getLayoutComponents = () => ({
	mobileHeader: <MobileSearchHeader />,
});

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

	return {
		props: {
			userAgent,
		},
	};
};

export default SearchPage;
