import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';

import {
	generateId,
	onAddTrackToPlaylist,
	onChangeCurrentTime,
	onChangeVolume,
	onRemoveTrackFromPlaylist,
	onSetDuration,
	onSkipToNextTrack,
	onSkipToPreviousTrack,
	onTogglePlaying,
	onToggleRepeatMode,
	onToggleShuffling,
	PlayerControlsContext,
	QueueContext,
	setAudioUrlTrack,
	toggleMuteVolume,
	TracksContext,
} from '@yemusic/providers';
import { tracksService } from '@yemusic/services/v1';

import { useTheme } from '../../Theme';
import { useDownloadTrack } from '../Track';

export function usePlayerControls() {
	const tracks = useContext(TracksContext.Context);
	const { isPlaying, isShuffling, repeatMode, volume, currentTime, duration, isMute, audioRef } = useContext(
		PlayerControlsContext.Context
	);
	const { currentTrackId, queueTrackIds } = useContext(QueueContext.Context);
	const { onSetDynamicThemeFromImage } = useTheme();
	const { onOpenModalDownloadTrack } = useDownloadTrack();

	const thumbnailRef = useRef<null | HTMLImageElement>(null);

	useEffect(
		function handleOnChangeCurrentTrackId() {
			if (trackNowPlaying) {
				if (thumbnailRef.current) {
					onSetDynamicThemeFromImage({
						image: thumbnailRef.current,
					});
				}

				onSetDuration({
					duration: trackNowPlaying.duration,
				});

				if (trackNowPlaying.audioFormats.length > 0) {
					onTogglePlaying({
						isPlaying: true,
					});
				} else {
					tracksService
						.getTrackDetails({
							trackId: trackNowPlaying.id,
							ref: trackNowPlaying.trackingId,
						})
						.then(data => {
							setAudioUrlTrack({
								trackId: trackNowPlaying.id,
								captions: data.captions,
								audioFormats: data.audioFormats,
							});
							onTogglePlaying({
								isPlaying: true,
							});
						});
				}

				navigator.mediaSession.metadata = new MediaMetadata({
					title: trackNowPlaying.title,
					artist: trackNowPlaying.author,
					artwork: [
						{
							src: trackNowPlaying.thumbnail,
							sizes: '512x512',
							type: 'image/png',
						},
					],
				});

				navigator.mediaSession.setActionHandler('play', () => {
					onTogglePlaying({
						isPlaying: true,
					});
				});

				navigator.mediaSession.setActionHandler('pause', () => {
					onTogglePlaying({
						isPlaying: false,
					});
				});

				navigator.mediaSession.setActionHandler('previoustrack', () => {
					handleSkipToPreviousTrack();
				});

				navigator.mediaSession.setActionHandler('nexttrack', () => {
					handleSkipToNextTrack();
				});
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[currentTrackId]
	);

	const handleSetAudioRef = useCallback((audioNode: HTMLAudioElement | null) => {
		if (audioNode) {
			audioNode.volume = volume;
			audioRef.current = audioNode;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const trackNowPlaying = useMemo(() => {
		return tracks.find(track => track.id === currentTrackId);
	}, [tracks, currentTrackId]);

	const handleUpdateCurrentTime = useCallback((newCurrentTime: number) => {
		onChangeCurrentTime({
			currentTime: newCurrentTime,
		});
	}, []);

	const handlePlayerEnded = useCallback(() => {
		if (repeatMode === 'one' && audioRef.current) {
			audioRef.current.play();
		}
		if (repeatMode === 'all') {
			handleSkipToNextTrack();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isShuffling, repeatMode]);

	const handleChangeCurrentTime = useCallback(
		(newCurrentTime: number) => {
			if (audioRef.current) {
				audioRef.current.currentTime = newCurrentTime;
			}

			onChangeCurrentTime({
				currentTime: newCurrentTime,
			});
		},
		[audioRef]
	);

	const handleTogglePlaying = useCallback((isPlaying: boolean) => {
		onTogglePlaying({
			isPlaying,
		});
	}, []);

	const handleSkipToNextTrack = useCallback(() => {
		if (queueTrackIds.length === 1 && audioRef.current) {
			audioRef.current.currentTime = 0;
			audioRef.current.play();
		} else {
			onTogglePlaying({
				isPlaying: false,
			});
			const { nextTrackId } = onSkipToNextTrack({
				isShuffling: isShuffling,
			});
			if (trackNowPlaying) {
				onAddTrackToPlaylist({
					slug: 'recently-played',
					track: {
						_id: generateId(),
						trackId: nextTrackId,
						addedAt: Date.now(),
					},
				});
			}
		}
	}, [trackNowPlaying, isShuffling, queueTrackIds, audioRef]);

	const handleSkipToPreviousTrack = useCallback(() => {
		onTogglePlaying({
			isPlaying: false,
		});
		const { previousTrackId } = onSkipToPreviousTrack();
		if (trackNowPlaying) {
			onAddTrackToPlaylist({
				slug: 'recently-played',
				track: {
					_id: generateId(),
					trackId: previousTrackId,
					addedAt: Date.now(),
				},
			});
		}
	}, [trackNowPlaying]);

	const handleToggleShuffling = useCallback(() => {
		onToggleShuffling({
			isShuffling: !isShuffling,
		});
	}, [isShuffling]);

	const handleToggleRepeatMode = useCallback(() => {
		onToggleRepeatMode();
	}, []);

	const handleToggleLikeTrack = useCallback(() => {
		if (trackNowPlaying) {
			if (!trackNowPlaying.isLiked) {
				onAddTrackToPlaylist({
					slug: 'liked-tracks',
					track: {
						_id: generateId(),
						trackId: trackNowPlaying.id,
						addedAt: Date.now(),
					},
				});
			} else {
				onRemoveTrackFromPlaylist({
					slug: 'liked-tracks',
					trackId: trackNowPlaying.id,
				});
			}
		}
	}, [trackNowPlaying]);

	const handleDownloadTrack = useCallback(() => {
		if (trackNowPlaying) {
			onOpenModalDownloadTrack({
				trackId: trackNowPlaying.id,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trackNowPlaying]);

	const handleChangeVolume = useCallback(
		(newVolume: number) => {
			if (audioRef.current) {
				audioRef.current.volume = newVolume;
			}
			onChangeVolume({
				volume: newVolume,
			});
		},
		[audioRef]
	);

	const exportState = {
		thumbnailRef,
		trackNowPlaying,
		duration,
		volume,
		currentTime,
		isPlaying,
		isShuffling,
		repeatMode,
		isMute,
	};

	const exportActions = {
		handleSetAudioRef,
		handleUpdateCurrentTime,
		handlePlayerEnded,
		handleChangeCurrentTime,
		handleTogglePlaying,
		handleSkipToNextTrack,
		handleSkipToPreviousTrack,
		handleToggleShuffling,
		handleToggleRepeatMode,
		handleToggleLikeTrack,
		handleChangeVolume,
		handleDownloadTrack,
		toggleMuteVolume,
	};

	return {
		...exportState,
		...exportActions,
	};
}
