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
	TracksContext,
} from '@yemusic/providers';
import { trackService } from '@yemusic/services/v1';

import { useTheme } from '../../Theme';

export function usePlayerControls() {
	const tracks = useContext(TracksContext.initial);
	const { isPlaying, isShuffling, repeatMode, volume, currentTime, duration } = useContext(
		PlayerControlsContext.initial
	);
	const { currentTrackId } = useContext(QueueContext.initial);
	const { onSetDynamicThemeFromImage } = useTheme();

	const audioRef = useRef<null | HTMLAudioElement>(null);
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

	const handleAudioControls = useCallback(
		(node: HTMLAudioElement) => {
			if (node) {
				audioRef.current = node;
				audioRef.current.volume = volume;

				if (isPlaying) {
					audioRef.current.play();
				} else {
					audioRef.current.pause();
				}
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isPlaying]
	);

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

	const handleChangeCurrentTime = useCallback((newCurrentTime: number) => {
		if (audioRef.current) {
			audioRef.current.currentTime = newCurrentTime;
		}

		onChangeCurrentTime({
			currentTime: newCurrentTime,
		});
	}, []);

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

	const handleChangeVolume = useCallback((newVolume: number) => {
		if (audioRef.current) {
			audioRef.current.volume = newVolume;
		}
		onChangeVolume({
			volume: newVolume,
		});
	}, []);

	return {
		audioRef,
		thumbnailRef,
		trackNowPlaying,
		duration,
		volume,
		currentTime,
		isPlaying,
		isShuffling,
		repeatMode,
		handleAudioControls,
		handleUpdateCurrentTime,
		handlePlayerEnded,
		handleChangeCurrentTime,
		handleTogglePlaying,
		handleSkipToNextTrack,
		handleSkipToPreviousTrack,
		handleToggleShuffling,
		handleToggleRepeatMode,
		handleChangeVolume,
	};
}
