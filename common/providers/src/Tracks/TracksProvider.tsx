import React, { PropsWithChildren } from 'react';

import createSingletonAppContext from '../createAppProvider';

import { ITrackEntity } from './types';

export type TracksState = ITrackEntity[];

export type ITracksContext = [TracksState, React.Dispatch<React.SetStateAction<TracksState>>];

export const TracksContext = createSingletonAppContext<TracksState>([]);

export const TracksProvider = ({ children }: PropsWithChildren) => {
	return <TracksContext.Provider>{children}</TracksContext.Provider>;
};

export default TracksProvider;
