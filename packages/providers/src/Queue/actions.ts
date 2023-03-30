import { QueueContext } from './QueueProvider';

export function onSetqueueTrackIds({ queueTrackIds }: { queueTrackIds: string[] }) {
	const { updateState } = QueueContext;

	updateState(prevState => ({
		...prevState,
		queueTrackIds,
	}));
}

export function onAddTrackIdToQueueIds({ trackId }: { trackId: string }) {
	const { getState, updateState } = QueueContext;
	const { queueTrackIds } = getState();

	const isTrackAlreadyAdded = queueTrackIds.find(id => id === trackId);

	if (!isTrackAlreadyAdded) {
		updateState(prevState => ({
			...prevState,
			queueTrackIds: [...prevState.queueTrackIds, trackId],
		}));
	}
}

export function onRemoveTrackIdFromQueueIds({ trackId }: { trackId: string }) {
	const { updateState } = QueueContext;

	updateState(prevState => ({
		...prevState,
		queueTrackIds: prevState.queueTrackIds.filter(id => id !== trackId),
	}));
}

export const onSetCurrentTrackId = ({ trackId }: { trackId: string }) => {
	const { updateState } = QueueContext;

	updateState(prevState => ({
		...prevState,
		playedIds: [...prevState.playedIds.filter(id => id !== trackId), trackId],
		currentTrackId: trackId,
	}));
};

export function onSkipToNextTrack({ isShuffling }: { isShuffling: boolean }) {
	const { getState, updateState } = QueueContext;
	const { queueTrackIds, playedIds, currentTrackId } = getState();

	if (!currentTrackId || playedIds.length >= queueTrackIds.length) {
		return updateState(prevState => ({
			...prevState,
			playedIds: [queueTrackIds[0]],
			currentTrackId: queueTrackIds[0],
		}));
	}

	const currentTrackIndex = queueTrackIds.findIndex(id => id === currentTrackId);
	const trackIdsOtherThanPlayed = queueTrackIds.filter(id => !playedIds.includes(id));
	const randomIndex = Math.floor(Math.random() * trackIdsOtherThanPlayed.length);
	const nextShufflingdTrackId = trackIdsOtherThanPlayed[randomIndex];
	const nextWithoutShufflingTrackId = queueTrackIds[currentTrackIndex + 1];

	const nextTrackId = isShuffling ? nextShufflingdTrackId : nextWithoutShufflingTrackId;

	updateState(prevState => ({
		...prevState,
		playedIds: [...prevState.playedIds, nextTrackId],
		currentTrackId: nextTrackId,
	}));
}

export function onSkipToPreviousTrack() {
	const { getState, updateState } = QueueContext;
	const { queueTrackIds, playedIds, currentTrackId } = getState();

	if (!currentTrackId) {
		updateState(prevState => ({
			...prevState,
			playedIds: [queueTrackIds[0]],
			currentTrackId: queueTrackIds[0],
		}));
	} else {
		const currentTrackPlayedIndex = playedIds.findIndex(id => id === currentTrackId);
		const previousTrackId = currentTrackPlayedIndex > 0 ? playedIds[currentTrackPlayedIndex - 1] : queueTrackIds[0];

		updateState(prevState => ({
			...prevState,
			currentTrackId: previousTrackId,
		}));
	}
}
