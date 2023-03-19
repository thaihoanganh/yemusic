import { PropsWithChildren } from 'react';

import createAppContext from '../createAppProvider';

import { QueueEntity } from './entity';

export const initialQueueState: QueueEntity = {
	queueTrackIds: [],
	playedIds: [],
	currentTrackId: '',
	title: '',
};

export const QueueContext = createAppContext<QueueEntity>(initialQueueState);

export const QueueProvider = ({ children }: PropsWithChildren) => {
	return <QueueContext.Provider>{children}</QueueContext.Provider>;
};

export default QueueProvider;
