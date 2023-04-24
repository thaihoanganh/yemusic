import { MobileHeader, Queue } from '@yemusic/components';
import { GetServerSideProps } from 'next';

import { NextPageWithLayoutComponents } from './_app';

const QueuePage: NextPageWithLayoutComponents = () => {
	return <Queue />;
};

QueuePage.getLayoutComponents = () => ({
	mobileHeader: <MobileHeader title="Danh sách chờ" />,
});

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

	return {
		props: {
			userAgent,
		},
	};
};

export default QueuePage;
