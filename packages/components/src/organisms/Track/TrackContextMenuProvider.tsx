import { createContext, useMemo, useState } from 'react';

type ITrackContextMenuState =
	| {
			desktopPosition: {
				x: number;
				y: number;
			};
			isOpen: true;
			trackInfo: {
				author: string;
				id: string;
				isLiked: boolean;
				isInQueue: boolean;
				isNowPlaying: boolean;
				thumbnail: string;
				title: string;
			};
	  }
	| {
			desktopPosition: null;
			isOpen: false;
			trackInfo: null;
	  };

type ITrackContextMenuContextValue = {
	trackContextMenuState: ITrackContextMenuState;
	setTrackContextMenuState: React.Dispatch<React.SetStateAction<ITrackContextMenuState>>;
};

export const TrackContextMenuContext = createContext<ITrackContextMenuContextValue>(
	{} as ITrackContextMenuContextValue
);

export const TrackContextMenuProvider = ({ children }: React.PropsWithChildren) => {
	const [state, setState] = useState<ITrackContextMenuState>({
		desktopPosition: null,
		isOpen: false,
		trackInfo: null,
	});

	const exportTrackContextMenuContextValue = useMemo(
		() => ({
			trackContextMenuState: state,
			setTrackContextMenuState: setState,
		}),
		[state]
	);

	return (
		<TrackContextMenuContext.Provider value={exportTrackContextMenuContextValue}>
			{children}
		</TrackContextMenuContext.Provider>
	);
};

export default TrackContextMenuProvider;
