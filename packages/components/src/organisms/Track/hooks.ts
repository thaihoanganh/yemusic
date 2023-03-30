import { useContext } from 'react';

import { TrackContextMenuContext } from './TrackContextMenuProvider';

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
