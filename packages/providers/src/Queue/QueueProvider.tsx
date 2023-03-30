import { Fragment, PropsWithChildren } from 'react';

import createSingletonAppContext from '../createSingletonAppContext';

import { IQueueEntity } from './entity';

export const initialQueueState: IQueueEntity = {
	queueTrackIds: [],
	playedIds: [],
	currentTrackId: '',
	title: '',
};

export const QueueContext = createSingletonAppContext<IQueueEntity>(initialQueueState);

export const QueueProvider = QueueContext.withProvider(({ children }: PropsWithChildren) => {
	return <Fragment>{children}</Fragment>;
});

export default QueueProvider;
