import { PropsWithChildren } from 'react';

import createAppContext from '../createAppProvider';

import { PlayerControlsEntity } from './entity';

export const initialPlayerControlsState: PlayerControlsEntity = {
	isPlaying: false,
	isShuffling: false,
	repeatMode: 'none',
	volume: 0.5,
	duration: 0,
	currentTime: 0,
};

export const PlayerControlsContext = createAppContext<PlayerControlsEntity>(initialPlayerControlsState);

export const PlayerControlsProvider = ({ children }: PropsWithChildren) => {
	return <PlayerControlsContext.Provider>{children}</PlayerControlsContext.Provider>;
};

export default PlayerControlsProvider;
