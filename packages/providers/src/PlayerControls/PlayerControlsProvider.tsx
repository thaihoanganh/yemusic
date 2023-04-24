/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRef, Fragment, PropsWithChildren, useContext, useEffect } from 'react';

import createSingletonAppContext from '../createSingletonAppContext';

export interface IPlayerControlsEntity {
	duration: number;
	currentTime: number;
	isPlaying: boolean;
	isShuffling: boolean;
	repeatMode: 'none' | 'one' | 'all';
	volume: number;
	isMute: boolean;
	audioRef: any;
}

export const initialPlayerControlsState: IPlayerControlsEntity = {
	isPlaying: false,
	isShuffling: false,
	repeatMode: 'none',
	volume: 0.75,
	duration: 0,
	currentTime: 0,
	isMute: false,
	audioRef: createRef<HTMLAudioElement | null>(),
};

export const PlayerControlsContext = createSingletonAppContext<IPlayerControlsEntity>(initialPlayerControlsState);

export const PlayerControlsProvider = PlayerControlsContext.withProvider<PropsWithChildren>(({ children }) => {
	const state = useContext(PlayerControlsContext.Context);

	useEffect(() => {
		if (state.audioRef.current) {
			if (state.isPlaying) {
				window.document.title = state.audioRef.current.title;
				state.audioRef.current.play();
			} else {
				window.document.title = 'Yemusic';
				state.audioRef.current.pause();
			}
		}
	}, [state.isPlaying, state.audioRef]);

	useEffect(() => {
		if (state.audioRef.current) {
			state.audioRef.current.muted = state.isMute;
		}
	}, [state.isMute, state.audioRef]);

	return <Fragment>{children}</Fragment>;
});

export default PlayerControlsProvider;
