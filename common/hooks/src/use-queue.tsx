import { create } from 'zustand';

export type QueueTrack = {
	id: string;
	author: string;
	title: string;
	thumbnail: string;
	duration: number;
	audioUrl: string;
	isLiked: boolean;
	isLoadingAudio: boolean;
	isPlayed: boolean;
};

export type QueueState = {
	nowPlayingTrackId: null | string;
	isShuffle: boolean;
	repeatMode: 'none' | 'one' | 'all';
	tracks: QueueTrack[];
};

export type QueueActions = {
	setTracks: (setTracksPayload: { tracks: QueueTrack[] }) => void;
	onAddTrack: (addTrackPayload: { track: QueueTrack }) => void;
	onRemoveTrack: (removeTrackPayload: { trackId: string }) => void;
	setNowPlayingTrackId: (setNowPlayingTrackIdPayload: { trackId: string }) => void;
	onUpdateTrack: (updateTrackPayload: { trackId: string; updateData: Partial<QueueTrack> }) => void;
	setShuffle: (setShufflePayload: { isShuffle: boolean }) => void;
	setRepeatMode: (setRepeatModePayload: { repeatMode: 'none' | 'one' | 'all' }) => void;
	setTrackIsLiked: (setTrackIsLiked: { trackId: string; isLiked: boolean }) => void;
	setTrackIsPlayed: (setTrackIsPayload: { trackId: string; isPlayed: boolean }) => void;
};

const initialQueueState: QueueState = {
	nowPlayingTrackId: null,
	isShuffle: false,
	repeatMode: 'none',
	tracks: [],
};

export const useQueue = create<QueueState & QueueActions>(set => ({
	...initialQueueState,
	setTracks: ({ tracks }) => {
		set({ tracks });
	},
	onAddTrack: ({ track }) => {
		set(state => ({ tracks: [...state.tracks, track] }));
	},
	onRemoveTrack: ({ trackId }) => {
		set(state => ({ tracks: state.tracks.filter(track => track.id !== trackId) }));
	},
	setNowPlayingTrackId: ({ trackId }) => {
		set({ nowPlayingTrackId: trackId });
	},
	onUpdateTrack: ({ trackId, updateData }) => {
		set(state => ({
			tracks: state.tracks.map(track => (track.id === trackId ? { ...track, ...updateData } : track)),
		}));
	},
	setShuffle: ({ isShuffle }) => {
		set({ isShuffle });
	},
	setRepeatMode: ({ repeatMode }) => {
		set({ repeatMode });
	},
	setTrackIsLiked: ({ trackId, isLiked }) => {
		set(state => ({
			tracks: state.tracks.map(track => (track.id === trackId ? { ...track, isLiked } : track)),
		}));
	},
	setTrackIsPlayed: ({ trackId, isPlayed }) => {
		set(state => ({
			tracks: state.tracks.map(track => (track.id === trackId ? { ...track, isPlayed } : track)),
		}));
	},
}));
