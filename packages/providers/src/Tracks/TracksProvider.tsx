import React, { Fragment, PropsWithChildren } from 'react';

import createSingletonAppContext from '../createSingletonAppContext';

import { ITrackEntity } from './entity';

export type TracksState = ITrackEntity[];

export type ITracksContext = [TracksState, React.Dispatch<React.SetStateAction<TracksState>>];

export const TracksContext = createSingletonAppContext<TracksState>([]);

export const TracksProvider = TracksContext.withProvider<PropsWithChildren>(({ children }) => {
	return <Fragment>{children}</Fragment>;
});

export default TracksProvider;
