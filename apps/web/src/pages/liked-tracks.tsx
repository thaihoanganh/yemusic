import { GetServerSideProps } from 'next';

const LikedTracks = () => {
	return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

	return {
		props: {
			userAgent,
		},
	};
};

export default LikedTracks;
