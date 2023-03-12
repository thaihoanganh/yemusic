import { create } from 'zustand';

type PlayerControlsState = {
	audioUrl: string;
	isPlaying: boolean;
	duration: number;
	currentTime: number;
};

type PlayerControlsActions = {
	setIsPlaying: (isPlaying: boolean) => void;
	setAudioUrl: (audioUrl: string) => void;
	setDuration: (duration: number) => void;
	setCurrentTime: (currentTime: number) => void;
};

export const usePlayerControls = create<PlayerControlsState & PlayerControlsActions>(set => ({
	audioUrl: '',
	isPlaying: false,
	duration: 0,
	currentTime: 0,
	setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
	setAudioUrl: (audioUrl: string) => set({ audioUrl }),
	setDuration: (duration: number) => set({ duration }),
	setCurrentTime: (currentTime: number) => set({ currentTime }),
}));
