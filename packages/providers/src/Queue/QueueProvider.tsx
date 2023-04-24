import { Fragment, PropsWithChildren } from 'react';

import createSingletonAppContext from '../createSingletonAppContext';

export interface IQueueEntity {
	queueTrackIds: string[];
	playedIds: string[];
	currentTrackId: string;
	title: string;
	playlistSlug: null | string;
	isMixed: boolean;
}

export const initialQueueState: IQueueEntity = {
	queueTrackIds: [],
	playedIds: [],
	currentTrackId: '',
	title: '',
	playlistSlug: null,
	isMixed: false,
};

export const QueueContext = createSingletonAppContext<IQueueEntity>(initialQueueState);

export const QueueProvider = QueueContext.withProvider(({ children }: PropsWithChildren) => {
	return <Fragment>{children}</Fragment>;
});

export default QueueProvider;
