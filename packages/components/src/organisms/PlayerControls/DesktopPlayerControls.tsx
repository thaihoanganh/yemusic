import { Fragment } from 'react';

import { formatTime } from '@yemusic/utils';
import Image from 'next/image';

import { UnstyledButton } from '../../atoms/Button';
import { Group, Stack } from '../../atoms/Frame';
import {
	DownloadIcon,
	FavoriteFillIcon,
	FavoriteIcon,
	PauseCircleFillIcon,
	PlayCircleFillIcon,
	RepeatIcon,
	RepeatOneIcon,
	ShuffleIcon,
	SkipNextIcon,
	SkipPreviousIcon,
	VolumeMuteIcon,
	VolumeOffIcon,
	VolumeUpIcon,
} from '../../atoms/Icons';
import { Slider } from '../../atoms/Slider';
import Typography from '../../atoms/Typography/Typography';

import { usePlayerControls } from './hooks';
import { desktopPlayerControlsStyles } from './PlayerControls.css';

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
		isMute,
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
	} = usePlayerControls();

	const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	const audioSrc = trackNowPlaying?.audioFormats[isSafari ? 1 : 0]?.url;

	return (
		<Fragment>
			<audio
				ref={handleSetAudioRef}
				src={audioSrc}
				title={trackNowPlaying?.title}
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
						<Typography title={trackNowPlaying?.title} variant="body" color="on-surface-variant-dynamic" truncate>
							{trackNowPlaying?.title}
						</Typography>
						<Typography
							title={trackNowPlaying?.title}
							variant="body"
							size="small"
							color="on-surface-variant-dynamic"
							truncate
						>
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
						<UnstyledButton onClick={handleToggleLikeTrack}>
							{trackNowPlaying?.isLiked ? (
								<FavoriteFillIcon size="medium" color="primary-dynamic" />
							) : (
								<FavoriteIcon size="medium" color="on-surface-variant-dynamic" />
							)}
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
					<UnstyledButton onClick={handleDownloadTrack}>
						<DownloadIcon size="medium" color="on-surface-variant-dynamic" />
					</UnstyledButton>
					<Group spacing="xsmall" alignItems="center">
						<UnstyledButton onClick={toggleMuteVolume}>
							{isMute ? (
								<VolumeOffIcon color="on-surface-variant-dynamic" />
							) : volume === 0 ? (
								<VolumeMuteIcon color="on-surface-variant-dynamic" />
							) : (
								<VolumeUpIcon color="on-surface-variant-dynamic" />
							)}
						</UnstyledButton>
						<Slider
							min={0}
							max={1}
							step={0.05}
							value={volume}
							onChange={e => handleChangeVolume(e.target.valueAsNumber)}
						/>
					</Group>
				</div>
			</div>
		</Fragment>
	);
};

export default DesktopPlayerControls;
