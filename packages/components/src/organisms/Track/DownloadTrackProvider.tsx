import React, { createContext, useState } from 'react';

export type IDownloadTrackState = {
	isOpenModalDownloadTrack: boolean;
	trackId: null | string;
};

export type IDownloadTrackContextValue = {
	downloadTrackState: IDownloadTrackState;
	setDownloadTrackState: React.Dispatch<React.SetStateAction<IDownloadTrackState>>;
};

export const initialDownloadTrackState: IDownloadTrackState = {
	isOpenModalDownloadTrack: false,
	trackId: null,
};

export const DownloadTrackContext = createContext<IDownloadTrackContextValue>({} as IDownloadTrackContextValue);

export const DownloadTrackProvider = ({ children }: React.PropsWithChildren) => {
	const [downloadTrackState, setDownloadTrackState] = useState<IDownloadTrackState>(initialDownloadTrackState);

	return (
		<DownloadTrackContext.Provider
			value={{
				downloadTrackState,
				setDownloadTrackState,
			}}
		>
			{children}
		</DownloadTrackContext.Provider>
	);
};

export default DownloadTrackProvider;
