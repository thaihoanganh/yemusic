import { create } from 'zustand';

export type PlayerControlsState = {
	audioUrl: string;
	duration: number;
	currentTime: number;
	isPlaying: boolean;
	volume: number;
};

export type PlayerControlsActions = {
	setAudioUrl: (setAudioUrlPayloadPayload: { audioUrl: string }) => void;
	setDuration: (setDurationPayloadPayload: { duration: number }) => void;
	setCurrentTime: (setCurrentTimePayload: { currentTime: number }) => void;
	setIsPlaying: (setIsPlayingPayload: { isPlaying: boolean }) => void;
	setVolume: (setVolumePayload: { volume: number }) => void;
};

const initialPlayerControlsState: PlayerControlsState = {
	audioUrl: '',
	duration: 0,
	currentTime: 0,
	isPlaying: false,
	volume: 0.85,
};

export const usePlayerControls = create<PlayerControlsState & PlayerControlsActions>(set => ({
	...initialPlayerControlsState,
	setAudioUrl: ({ audioUrl }) => {
		set({ audioUrl });
	},
	setDuration: ({ duration }) => {
		set({ duration });
	},
	setCurrentTime: ({ currentTime }) => {
		set({ currentTime });
	},
	setIsPlaying: ({ isPlaying }) => {
		set({ isPlaying });
	},
	setVolume: ({ volume }) => {
		set({ volume });
	},
}));
