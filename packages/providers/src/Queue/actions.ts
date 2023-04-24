import { QueueContext } from './QueueProvider';

export function onSetQueue({
	queueTrackIds,
	playlistSlug = null,
}: {
	queueTrackIds: string[];
	playlistSlug?: null | string;
}) {
	console.log('onSetQueue');

	const { updateStateWithImmer } = QueueContext;

	updateStateWithImmer(state => {
		state.queueTrackIds = queueTrackIds;
		state.playlistSlug = playlistSlug;
	});
}

export function onAddTracksToQueue({
	trackIds,
	playlistSlug = null,
}: {
	trackIds: string[];
	playlistSlug?: null | string;
}) {
	const { updateStateWithImmer } = QueueContext;

	updateStateWithImmer(state => {
		const prevQueueTrackIdsLength = state.queueTrackIds.length;

		state.queueTrackIds = [...state.queueTrackIds, ...trackIds].filter((id, index, self) => self.indexOf(id) === index);

		state.isMixed = prevQueueTrackIdsLength !== 0 && prevQueueTrackIdsLength < state.queueTrackIds.length;
		state.playlistSlug = playlistSlug ?? state.playlistSlug;
	});
}

export function onRemoveTrackFromQueue({ trackId }: { trackId: string }) {
	const { updateStateWithImmer } = QueueContext;

	updateStateWithImmer(state => {
		const playedIndex = state.playedIds.findIndex(id => id === trackId);
		const queueTrackIndex = state.queueTrackIds.findIndex(id => id === trackId);

		if (playedIndex !== -1) {
			state.playedIds.splice(playedIndex, 1);
		}

		state.queueTrackIds.splice(queueTrackIndex, 1);
	});
}

export const onSetCurrentTrack = ({ trackId }: { trackId: string }) => {
	const { updateStateWithImmer } = QueueContext;

	updateStateWithImmer(state => {
		state.currentTrackId = trackId;

		const playedIndex = state.playedIds.findIndex(id => id === trackId);

		if (playedIndex !== -1) {
			state.playedIds.splice(playedIndex, 1);
		}

		state.playedIds.push(trackId);
	});
};

export function onSkipToNextTrack({ isShuffling }: { isShuffling: boolean }) {
	const { getState, updateState } = QueueContext;
	const { queueTrackIds, playedIds, currentTrackId } = getState();

	if (!currentTrackId || playedIds.length >= queueTrackIds.length) {
		updateState(prevState => ({
			...prevState,
			playedIds: [queueTrackIds[0]],
			currentTrackId: queueTrackIds[0],
		}));

		return {
			nextTrackId: queueTrackIds[0],
		};
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

	return {
		nextTrackId,
	};
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

		return {
			previousTrackId: queueTrackIds[0],
		};
	} else {
		const currentTrackPlayedIndex = playedIds.findIndex(id => id === currentTrackId);
		const previousTrackId = currentTrackPlayedIndex > 0 ? playedIds[currentTrackPlayedIndex - 1] : queueTrackIds[0];

		updateState(prevState => ({
			...prevState,
			currentTrackId: previousTrackId,
		}));

		return {
			previousTrackId,
		};
	}
}
