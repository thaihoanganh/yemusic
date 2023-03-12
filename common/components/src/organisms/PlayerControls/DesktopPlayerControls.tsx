/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useCallback, useRef } from 'react';

import { usePlayerControls, useQueue } from '@yemusic/hooks';

import { UnstyledButton } from '../../atoms/Button';
import { Group, Stack } from '../../atoms/Frame';
import {
	DownloadIcon,
	FavoriteIcon,
	PauseCircleFillIcon,
	PlayCircleFillIcon,
	QueueMusicIcon,
	RepeatIcon,
	RepeatOneIcon,
	ShuffleIcon,
	SkipNextIcon,
	SkipPreviousIcon,
	VolumeUpIcon,
} from '../../atoms/Icons';
import { Slider } from '../../atoms/Slider';
import { StateLayer } from '../../atoms/StateLayer';
import Typography from '../../atoms/Typography/Typography';

const timeFormat = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time - minutes * 60);

	return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const DesktopPlayerControls = () => {
	const audioRef = useRef<null | HTMLAudioElement>(null);

	const { audioUrl, duration, currentTime, isPlaying, setIsPlaying, setCurrentTime } = usePlayerControls();
	const { isShuffle, repeatMode, setRepeatMode, setShuffle } = useQueue();

	const handleToggleSetRepeatMode = useCallback(() => {
		switch (repeatMode) {
			case 'none':
				setRepeatMode({ repeatMode: 'all' });
				break;
			case 'all':
				setRepeatMode({ repeatMode: 'one' });
				break;
			case 'one':
				setRepeatMode({ repeatMode: 'none' });
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [repeatMode]);

	const handleTogglePlaying = useCallback(
		(isPlaying: boolean) => {
			if (audioRef.current) {
				setIsPlaying({ isPlaying });

				if (isPlaying) {
					(audioRef.current as any).play();
				} else {
					(audioRef.current as any).pause();
				}
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const handleChangeCurrentTime = useCallback((currentTime: number) => {
		if (audioRef.current) {
			(audioRef.current as any).currentTime = currentTime;
			setCurrentTime({ currentTime });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Fragment>
			<Stack
				style={{
					height: '100%',
				}}
				spacing="medium"
				justifyContent="center"
				horizontalPadding="large"
			>
				<Group>
					<Group
						style={{
							width: '20%',
							minWidth: '20%',
						}}
						spacing="small"
						justifyContent="flex-start"
						alignItems="center"
					>
						<StateLayer state={['pressed']}>
							{({ isPressed }) => (
								<UnstyledButton>
									<FavoriteIcon
										style={{
											transform: isPressed ? 'scale(1.2)' : 'scale(1)',
											transition: 'transform 0.2s',
										}}
										color="on-surface-variant"
									/>
								</UnstyledButton>
							)}
						</StateLayer>
						<UnstyledButton>
							<DownloadIcon color="on-surface-variant" />
						</UnstyledButton>
					</Group>

					<Group spacing="small" justifyContent="center" alignItems="center" fillContainer>
						<UnstyledButton
							onClick={() =>
								setShuffle({
									isShuffle: !isShuffle,
								})
							}
						>
							<ShuffleIcon color={isShuffle ? 'primary' : 'on-surface-variant'} />
						</UnstyledButton>
						<UnstyledButton>
							<SkipPreviousIcon size="large" color="on-surface-variant" />
						</UnstyledButton>
						<UnstyledButton onClick={() => handleTogglePlaying(!isPlaying)}>
							{isPlaying ? (
								<PauseCircleFillIcon size="xlarge" color="primary" />
							) : (
								<PlayCircleFillIcon size="xlarge" color="primary" />
							)}
						</UnstyledButton>
						<UnstyledButton>
							<SkipNextIcon size="large" color="on-surface-variant" />
						</UnstyledButton>
						<UnstyledButton onClick={handleToggleSetRepeatMode}>
							{repeatMode === 'none' && <RepeatIcon color="on-surface-variant" />}
							{repeatMode === 'all' && <RepeatIcon color="primary" />}
							{repeatMode === 'one' && <RepeatOneIcon color="primary" />}
						</UnstyledButton>
					</Group>

					<Group
						style={{
							width: '20%',
							minWidth: '20%',
						}}
						spacing="small"
						justifyContent="flex-end"
						alignItems="center"
					>
						<StateLayer state={['hover']}>
							{({ isHover }) => (
								<Group alignItems="center" spacing="xsmall">
									<UnstyledButton>
										<VolumeUpIcon color="on-surface-variant" />
									</UnstyledButton>
									<div
										style={{
											overflow: 'hidden',
											width: isHover ? 80 : 80,
											paddingBottom: 4,
											transition: 'width 0.5s',
										}}
									>
										<Slider max={100} step={0} />
									</div>
								</Group>
							)}
						</StateLayer>
						<UnstyledButton>
							<QueueMusicIcon color="on-surface-variant" />
						</UnstyledButton>
					</Group>
				</Group>

				<Group>
					<Group
						style={{
							width: 36,
						}}
						justifyContent="flex-start"
					>
						<Typography variant="body" size="small" color="on-surface-variant">
							{timeFormat(currentTime)}
						</Typography>
					</Group>
					<Group alignItems="center" fillContainer>
						<Slider
							key={currentTime}
							min={0}
							max={duration}
							value={currentTime}
							onChange={(e: any) => handleChangeCurrentTime(e.target.value)}
						/>
					</Group>
					<Group
						style={{
							width: 36,
						}}
						justifyContent="flex-end"
					>
						<Typography variant="body" size="small" color="on-surface-variant">
							{timeFormat(duration)}
						</Typography>
					</Group>
				</Group>
			</Stack>

			<audio
				ref={audioRef}
				src={audioUrl}
				autoPlay
				loop={repeatMode === 'one'}
				onTimeUpdate={(e: any) =>
					setCurrentTime({
						currentTime: e.target.currentTime,
					})
				}
			/>
		</Fragment>
	);
};

export default DesktopPlayerControls;
