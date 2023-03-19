import { Fragment } from 'react';

import Image from 'next/image';

import { UnstyledButton } from '../../atoms/Button';
import { Group, Stack } from '../../atoms/Frame';
import {
	DownloadIcon,
	FavoriteIcon,
	PauseCircleFillIcon,
	PlayCircleFillIcon,
	RepeatIcon,
	RepeatOneIcon,
	ShuffleIcon,
	SkipNextIcon,
	SkipPreviousIcon,
	VolumeDownAltIcon,
} from '../../atoms/Icons';
import { Slider } from '../../atoms/Slider';
import Typography from '../../atoms/Typography/Typography';

import { desktopPlayerControlsStyles } from './DesktopPlayerControls.css';
import { usePlayerControls } from './hooks';

const formatTime = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);

	return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const DesktopPlayerControls = () => {
	const {
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
	} = usePlayerControls();

	return (
		<Fragment>
			<audio
				ref={handleAudioControls}
				src={trackNowPlaying?.audioUrl}
				loop={repeatMode === 'one'}
				onPause={() => handleTogglePlaying(false)}
				onPlay={() => handleTogglePlaying(true)}
				onEnded={handlePlayerEnded}
				onTimeUpdate={e => handleUpdateCurrentTime((e.target as HTMLAudioElement).currentTime)}
			/>
			<div className={desktopPlayerControlsStyles.root}>
				<div className={desktopPlayerControlsStyles.trackInfo}>
					<div className={desktopPlayerControlsStyles.thumnbailWrapper}>
						<Image
							ref={thumbnailRef}
							className={desktopPlayerControlsStyles.thumbnail}
							src={trackNowPlaying?.thumbnail || ''}
							alt=""
							fill
						/>
					</div>

					<Stack spacing="xsmall" justifyContent="center" fillContainer>
						<Typography variant="body" color="on-surface-variant-dynamic" truncate>
							{trackNowPlaying?.title}
						</Typography>
						<Typography variant="body" size="small" color="on-surface-variant-dynamic" truncate>
							{trackNowPlaying?.author}
						</Typography>
					</Stack>
					<Group
						style={{
							width: 40,
							minWidth: 40,
						}}
						justifyContent="center"
					>
						<UnstyledButton>
							<FavoriteIcon size="medium" color="on-surface-variant-dynamic" />
						</UnstyledButton>
					</Group>
				</div>

				<div className={desktopPlayerControlsStyles.trackControls}>
					<Group spacing="medium" justifyContent="center">
						<UnstyledButton onClick={handleToggleShuffling}>
							<ShuffleIcon size="medium" color={isShuffling ? 'primary-dynamic' : 'on-surface-variant-dynamic'} />
						</UnstyledButton>
						<UnstyledButton onClick={handleSkipToPreviousTrack}>
							<SkipPreviousIcon size="large" color="on-surface-variant-dynamic" />
						</UnstyledButton>
						<UnstyledButton onClick={() => handleTogglePlaying(!isPlaying)}>
							{isPlaying ? (
								<PauseCircleFillIcon size="xlarge" color="primary-dynamic" />
							) : (
								<PlayCircleFillIcon size="xlarge" color="primary-dynamic" />
							)}
						</UnstyledButton>
						<UnstyledButton onClick={handleSkipToNextTrack}>
							<SkipNextIcon size="large" color="on-surface-variant-dynamic" />
						</UnstyledButton>
						<UnstyledButton onClick={handleToggleRepeatMode}>
							{repeatMode === 'none' && <RepeatIcon size="medium" color="on-surface-variant-dynamic" />}
							{repeatMode === 'one' && <RepeatOneIcon size="medium" color="primary-dynamic" />}
							{repeatMode === 'all' && <RepeatIcon size="medium" color="primary-dynamic" />}
						</UnstyledButton>
					</Group>

					<Group spacing="xsmall" alignItems="center">
						<Typography variant="label" size="small" color="on-surface-variant-dynamic">
							{formatTime(currentTime)}
						</Typography>
						<Slider min={0} max={duration} value={currentTime} onUpdateValue={handleChangeCurrentTime} />
						<Typography variant="label" size="small" color="on-surface-variant-dynamic">
							{formatTime(duration)}
						</Typography>
					</Group>
				</div>

				<div className={desktopPlayerControlsStyles.trackMore}>
					<UnstyledButton>
						<DownloadIcon size="medium" color="on-surface-variant-dynamic" />
					</UnstyledButton>
					<Group alignItems="center">
						<VolumeDownAltIcon size="large" color="on-surface-variant-dynamic" />
						<Slider
							min={0}
							max={1}
							step={0.05}
							defaultValue={volume}
							onChange={e => handleChangeVolume(e.target.valueAsNumber)}
						/>
					</Group>
				</div>
			</div>
		</Fragment>
	);
};

export default DesktopPlayerControls;
