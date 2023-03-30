import { ITrackEntity } from './entity';
import { TracksContext } from './TracksProvider';

export const onAddTracks = ({ newTracks }: { newTracks: ITrackEntity[] }) => {
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

export function onToggleLikeTrack({ trackId, isLiked }: { trackId: string; isLiked: boolean }) {
	const { getState, updateState } = TracksContext;
	const tracks = getState();

	const trackIndex = tracks.findIndex(track => track.id === trackId);

	if (trackIndex !== -1) {
		updateState(prevState => {
			const cloneTracks = [...prevState];
			cloneTracks[trackIndex] = {
				...cloneTracks[trackIndex],
				isLiked,
			};

			return cloneTracks;
		});
	}
}

export function setAudioUrlTrack({
	trackId,
	audio,
}: {
	trackId: string;
	audio: {
		itag: number;
		url: string;
	}[];
}) {
	const { getState, updateState } = TracksContext;
	const tracks = getState();

	const trackIndex = tracks.findIndex(track => track.id === trackId);

	if (trackIndex !== -1) {
		updateState(prevState => {
			const cloneTracks = [...prevState];
			cloneTracks[trackIndex].audio = audio;

			return cloneTracks;
		});
	}
}
