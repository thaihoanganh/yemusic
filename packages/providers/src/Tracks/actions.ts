import { ITrackEntity, TracksContext } from './TracksProvider';

export function onSetTracks({ tracks }: { tracks: ITrackEntity[] }) {
	const { updateState } = TracksContext;

	updateState(() => tracks);
}

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
	captions,
	audioFormats,
}: {
	trackId: string;
	captions: {
		baseUrl: string;
		languageCode: string;
	}[];
	audioFormats: {
		mimeType: string;
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

			cloneTracks[trackIndex].captions = captions;
			cloneTracks[trackIndex].audioFormats = audioFormats;

			return cloneTracks;
		});
	}
}
