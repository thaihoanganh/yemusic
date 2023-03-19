export interface TrackEntity {
	/**
	 * Unique identifier of the track
	 */
	id: string;
	/**
	 * Title of the track
	 */
	title: string;
	/**
	 * Author of the track
	 */
	author: string;
	/**
	 * Thumbnail of the track
	 */
	thumbnail: string;
	/**
	 * Duration of the track in seconds
	 */
	duration: number;
	/**
	 * List of sources of the track
	 */
	source: string[];
	/**
	 * URL of the audio file
	 */
	audioUrl: string;
	/**
	 * Whether the track is liked or not
	 */
	isLiked: boolean;
	/**
	 * Whether the track is currently loading or not
	 */
	isLoadingAudio: boolean;
	/**
	 * Whether the track is currently playing or not
	 */
	isNowPlaying: boolean;
}
