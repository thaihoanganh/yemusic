export interface PlayerControlsEntity {
	duration: number;
	currentTime: number;
	isPlaying: boolean;
	isShuffling: boolean;
	repeatMode: 'none' | 'one' | 'all';
	volume: number;
}
