import React, { PropsWithChildren } from 'react';

import createAppContext from '../createAppProvider';

import { TrackEntity } from './types';

export type TracksState = TrackEntity[];

export type ITracksContext = [TracksState, React.Dispatch<React.SetStateAction<TracksState>>];

export const TracksContext = createAppContext<TracksState>([]);

export const TracksProvider = ({ children }: PropsWithChildren) => {
	return <TracksContext.Provider>{children}</TracksContext.Provider>;
};

export default TracksProvider;
