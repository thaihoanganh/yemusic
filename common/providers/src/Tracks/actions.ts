import { TracksContext } from './TracksProvider';
import { TrackEntity } from './types';

export const onAddTracks = ({ newTracks }: { newTracks: TrackEntity[] }) => {
	const { getState, updateState } = TracksContext;
	const tracks = getState();

	const trackIds = tracks.map(track => track.id);
	const tracksWithoutDuplicates = newTracks.filter(track => !trackIds.includes(track.id));

	updateState(prevState => [...prevState, ...tracksWithoutDuplicates]);
};

export function onRemoveTrack({ trackId }: { trackId: string }) {
	const { updateState } = TracksContext;

	updateState(prevState => ({
		...prevState,
		items: prevState.filter(track => track.id !== trackId),
	}));
}

export function onToggleLikeTrack({ trackId, isLiked }: { trackId: string; isLiked?: boolean }) {
	const { getState, updateState } = TracksContext;
	const tracks = getState();

	const trackIndex = tracks.findIndex(track => track.id === trackId);

	if (trackIndex !== -1) {
		const track = tracks[trackIndex];

		updateState(prevState => {
			prevState[trackIndex] = {
				...track,
				isLiked: isLiked ?? !track.isLiked,
			};

			return prevState;
		});
	}
}

export function onToggleNowPlayingTrack({ trackId }: { trackId: string }) {
	const { getState, updateState } = TracksContext;
	const tracks = getState();

	const trackIndex = tracks.findIndex(track => track.id === trackId);

	if (trackIndex !== -1) {
		const track = tracks[trackIndex];

		updateState(prevState => {
			prevState[trackIndex] = {
				...track,
				isNowPlaying: !track.isNowPlaying,
			};

			return prevState;
		});
	}
}

export function toggleLoadingAudioTrack({ trackId }: { trackId: string }) {
	const { getState, updateState } = TracksContext;
	const tracks = getState();

	const trackIndex = tracks.findIndex(track => track.id === trackId);

	if (trackIndex !== -1) {
		const track = tracks[trackIndex];

		updateState(prevState => {
			prevState[trackIndex] = {
				...track,
				isLoadingAudio: !track.isLoadingAudio,
			};

			return prevState;
		});
	}
}

export function setAudioUrlTrack({ trackId, audioUrl }: { trackId: string; audioUrl: string }) {
	const { getState, updateState } = TracksContext;
	const tracks = getState();

	const trackIndex = tracks.findIndex(track => track.id === trackId);

	if (trackIndex !== -1) {
		updateState(prevState => {
			const cloneTracks = [...prevState];
			cloneTracks[trackIndex].audioUrl = audioUrl;

			return cloneTracks;
		});
	}
}
