import { PropsWithChildren } from 'react';

import createSingletonAppContext from '../createAppProvider';

import { QueueEntity } from './entity';

export const initialQueueState: QueueEntity = {
	queueTrackIds: [],
	playedIds: [],
	currentTrackId: '',
	title: '',
};

export const QueueContext = createSingletonAppContext<QueueEntity>(initialQueueState);

export const QueueProvider = ({ children }: PropsWithChildren) => {
	return <QueueContext.Provider>{children}</QueueContext.Provider>;
};

export default QueueProvider;
