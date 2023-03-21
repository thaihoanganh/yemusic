import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';

import {
	onChangeCurrentTime,
	onChangeVolume,
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
import { trackService } from '@yemusic/services/v1';

import { useTheme } from '../../Theme';

export function usePlayerControls() {
	const tracks = useContext(TracksContext.Context);
	const { isPlaying, isShuffling, repeatMode, volume, currentTime, duration, isMute, audioRef } = useContext(
		PlayerControlsContext.Context
	);
	const { currentTrackId } = useContext(QueueContext.Context);
	const { onSetDynamicThemeFromImage } = useTheme();

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

				if (trackNowPlaying.audioUrl) {
					onTogglePlaying({
						isPlaying: true,
					});
				} else {
					trackService
						.getTracKInfo({
							trackId: trackNowPlaying.id,
						})
						.then(data => {
							setAudioUrlTrack({
								trackId: trackNowPlaying.id,
								audioUrl: data.info.audioUrl,
							});
							onTogglePlaying({
								isPlaying: true,
							});
						});
				}
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[currentTrackId]
	);

	const trackNowPlaying = useMemo(() => {
		return tracks.find(track => track.id === currentTrackId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTrackId]);

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
			onSkipToNextTrack({
				isShuffling: isShuffling,
			});
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
		onTogglePlaying({
			isPlaying: false,
		});
		onSkipToNextTrack({
			isShuffling: isShuffling,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSkipToPreviousTrack = useCallback(() => {
		onTogglePlaying({
			isPlaying: false,
		});
		onSkipToPreviousTrack();
	}, []);

	const handleToggleShuffling = useCallback(() => {
		onToggleShuffling({
			isShuffling: !isShuffling,
		});
	}, [isShuffling]);

	const handleToggleRepeatMode = useCallback(() => {
		onToggleRepeatMode();
	}, []);

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
		audioRef,
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
		handleUpdateCurrentTime,
		handlePlayerEnded,
		handleChangeCurrentTime,
		handleTogglePlaying,
		handleSkipToNextTrack,
		handleSkipToPreviousTrack,
		handleToggleShuffling,
		handleToggleRepeatMode,
		handleChangeVolume,
		toggleMuteVolume,
	};

	return {
		...exportState,
		...exportActions,
	};
}
