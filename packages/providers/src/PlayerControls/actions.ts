import { PlayerControlsContext } from './PlayerControlsProvider';

export function onSetDuration({ duration }: { duration: number }) {
	const { updateState } = PlayerControlsContext;

	updateState(prevState => ({
		...prevState,
		duration,
	}));
}

export function onChangeCurrentTime({ currentTime }: { currentTime: number }) {
	const { updateState } = PlayerControlsContext;

	updateState(prevState => ({
		...prevState,
		currentTime,
	}));
}

export function onTogglePlaying({ isPlaying }: { isPlaying?: boolean }) {
	const { updateState } = PlayerControlsContext;

	updateState(prevState => ({
		...prevState,
		isPlaying: isPlaying ?? !prevState.isPlaying,
	}));
}

export function onToggleShuffling({ isShuffling }: { isShuffling?: boolean }) {
	const { updateState } = PlayerControlsContext;

	updateState(prevState => ({
		...prevState,
		isShuffling: isShuffling ?? !prevState.isShuffling,
	}));
}

export function onToggleRepeatMode() {
	const { updateState } = PlayerControlsContext;

	updateState(prevState => {
		switch (prevState.repeatMode) {
			case 'none':
				return {
					...prevState,
					repeatMode: 'one',
				};
			case 'one':
				return {
					...prevState,
					repeatMode: 'all',
				};
			case 'all':
				return {
					...prevState,
					repeatMode: 'none',
				};
		}
	});
}

export function onChangeVolume({ volume }: { volume: number }) {
	const { updateState } = PlayerControlsContext;

	updateState(prevState => ({
		...prevState,
		volume,
	}));
}

export function toggleMuteVolume() {
	const { updateState } = PlayerControlsContext;

	updateState(prevState => ({
		...prevState,
		isMute: !prevState.isMute,
	}));
}
