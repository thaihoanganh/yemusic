import React, { Fragment, PropsWithChildren } from 'react';

import createSingletonAppContext from '../createSingletonAppContext';

export interface ITrackEntity {
	id: string;
	title: string;
	author: string;
	thumbnail: string;
	duration: number;
	source: string[];
	isLiked: boolean;
	captions: {
		baseUrl: string;
		languageCode: string;
	}[];
	audioFormats: {
		mimeType: string;
		itag: number;
		url: string;
	}[];
	trackingId?: string;
}

export type TracksState = ITrackEntity[];

export type ITracksContext = [TracksState, React.Dispatch<React.SetStateAction<TracksState>>];

export const TracksContext = createSingletonAppContext<TracksState>([]);

export const TracksProvider = TracksContext.withProvider<PropsWithChildren>(({ children }) => {
	return <Fragment>{children}</Fragment>;
});

export default TracksProvider;
