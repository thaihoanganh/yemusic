import React, { Fragment, PropsWithChildren } from 'react';

import TrackMenu from './TrackMenu';

export const TrackProvider = ({ children }: PropsWithChildren) => {
	return (
		<Fragment>
			{children}
			<TrackMenu />
		</Fragment>
	);
};

export default TrackProvider;
