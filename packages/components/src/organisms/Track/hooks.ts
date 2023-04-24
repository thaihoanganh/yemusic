import { useContext } from 'react';

import {
	generateId,
	onAddTrackToPlaylist,
	onAddTracksToQueue,
	onRemoveTrackFromPlaylist,
	onSetCurrentTrack,
	onTogglePlaying,
} from '@yemusic/providers';

import { DownloadTrackContext } from './DownloadTrackProvider';
import { TrackContextMenuContext } from './TrackContextMenuProvider';

export function useDownloadTrack() {
	const downloadTrackContext = useContext(DownloadTrackContext);

	if (!downloadTrackContext) {
		throw new Error('useDownloadTrack must be used within a DownloadTrackProvider');
	}

	const { downloadTrackState, setDownloadTrackState } = downloadTrackContext;

	const onOpenModalDownloadTrack = ({ trackId }: { trackId: string }) => {
		setDownloadTrackState(prevState => ({
			...prevState,
			isOpenModalDownloadTrack: true,
			trackId,
		}));
	};

	const onCloseModalDownloadTrack = () => {
		setDownloadTrackState(prevState => ({
			...prevState,
			isOpenModalDownloadTrack: false,
			trackId: null,
		}));
	};

	return {
		...downloadTrackState,
		onOpenModalDownloadTrack,
		onCloseModalDownloadTrack,
	};
}

export function useTrackContextMenu() {
	const trackContextMenuContext = useContext(TrackContextMenuContext);

	if (!trackContextMenuContext) {
		throw new Error('useTrack must be used within a TrackContextMenuProvider');
	}

	const { trackContextMenuState, setTrackContextMenuState } = trackContextMenuContext;

	const onOpenTrackContextMenu = ({
		desktopPosition,
		trackInfo,
	}: {
		desktopPosition: {
			x: number;
			y: number;
		};
		trackInfo: {
			author: string;
			id: string;
			isLiked: boolean;
			isInQueue: boolean;
			isNowPlaying: boolean;
			thumbnail: string;
			title: string;
			ref?: string;
		};
	}) => {
		setTrackContextMenuState(prevState => ({
			...prevState,
			desktopPosition,
			isOpen: true,
			trackInfo,
		}));
	};

	const onCloseTrackContextMenu = () => {
		setTrackContextMenuState(prevState => ({
			...prevState,
			desktopPosition: null,
			isOpen: false,
			trackInfo: null,
		}));
	};

	return {
		...trackContextMenuState,
		onOpenTrackContextMenu,
		onCloseTrackContextMenu,
	};
}

export function useTrack() {
	const handleTogglePlaying = ({ trackId }: { trackId: string }) => {
		onTogglePlaying({
			isPlaying: false,
		});
		onAddTracksToQueue({
			trackIds: [trackId],
		});
		onSetCurrentTrack({
			trackId,
		});
		onAddTrackToPlaylist({
			slug: 'recently-played',
			track: {
				_id: generateId(),
				trackId,
				addedAt: Date.now(),
			},
		});
	};

	const handleToggleLikeTrack = ({ trackId, isLike }: { trackId: string; isLike: boolean }) => {
		if (isLike) {
			onAddTrackToPlaylist({
				slug: 'liked-tracks',
				track: {
					_id: generateId(),
					trackId,
					addedAt: Date.now(),
				},
			});
		} else {
			onRemoveTrackFromPlaylist({
				slug: 'liked-tracks',
				trackId,
			});
		}
	};

	return {
		handleTogglePlaying,
		handleToggleLikeTrack,
	};
}
