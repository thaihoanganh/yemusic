import { Fragment, useState } from 'react';

import { formatTime } from '@yemusic/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { UnstyledButton } from '../../atoms/Button';
import { Group, Stack } from '../../atoms/Frame';
import {
	ExpandMoreIcon,
	FavoriteFillIcon,
	FavoriteIcon,
	MoreVertIcon,
	PauseCircleFillIcon,
	PauseCircleIcon,
	PlayCircleFillIcon,
	PlayCircleIcon,
	PlaylistPlayIcon,
	RepeatIcon,
	RepeatOneIcon,
	ShuffleIcon,
	SkipNextIcon,
	SkipPreviousIcon,
} from '../../atoms/Icons';
import { Paper } from '../../atoms/Paper';
import { Slider } from '../../atoms/Slider';
import Typography from '../../atoms/Typography/Typography';
import { themeVars } from '../../Theme/Theme.css';
import { useTrackContextMenu } from '../Track';

import { usePlayerControls } from './hooks';
import { mobilePlayerControlsStyles } from './PlayerControls.css';

const mobilePlayerControlsColapsedHeight = 56;

export const MobilePlayerControls = () => {
	const router = useRouter();
	const [isCollapsed, setIsCollapsed] = useState(true);
	const { onOpenTrackContextMenu } = useTrackContextMenu();

	const {
		thumbnailRef,
		trackNowPlaying,
		duration,
		currentTime,
		isPlaying,
		isShuffling,
		repeatMode,
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
	} = usePlayerControls();

	const onOpenQueue = () => {
		router.push('/queue');
		setIsCollapsed(true);
	};

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
			<motion.div
				variants={{
					collapsed: {
						display: 'block',
						opacity: 1,
						transition: {
							duration: 0.4,
						},
					},
					expanded: {
						opacity: 0,
						display: 'none',
						transition: {
							duration: 0.4,
						},
					},
				}}
				className={mobilePlayerControlsStyles.sliderColapsed}
			>
				<div
					style={{
						width: `${(currentTime / duration) * 100}%`,
					}}
					className={mobilePlayerControlsStyles.sliderColapsedValue}
				/>
			</motion.div>
			<motion.div
				style={{
					position: isCollapsed ? 'initial' : 'fixed',
					right: 0,
					bottom: 0,
					left: 0,
				}}
				variants={{
					collapsed: {
						zIndex: 1,
					},
					expanded: {
						zIndex: 9,
						background: themeVars.palette.background,
					},
				}}
				animate={isCollapsed ? 'collapsed' : 'expanded'}
				onClick={() => {
					if (isCollapsed) {
						setIsCollapsed(false);
					}
				}}
			>
				<Paper color="primary-dynamic" surfaceLevel={3}>
					<motion.div
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
						variants={{
							collapsed: {
								height: mobilePlayerControlsColapsedHeight,
								transition: {
									duration: 0.8,
								},
							},
							expanded: {
								height: globalThis.window?.innerHeight,
								transition: {
									duration: 0.8,
								},
							},
						}}
					>
						<motion.div
							style={{
								overflow: 'hidden',
								display: 'none',
							}}
							variants={{
								collapsed: {
									display: 'none',
									opacity: 0.5,
									transition: {
										duration: 0.6,
									},
								},
								expanded: {
									display: 'block',
									opacity: 1,
									transition: {
										duration: 0.6,
									},
								},
							}}
						>
							<Group horizontalPadding="medium" verticalPadding="medium">
								<UnstyledButton onClick={() => setIsCollapsed(true)}>
									<ExpandMoreIcon />
								</UnstyledButton>
								<Group justifyContent="center" fillContainer>
									<Typography variant="title" color="on-surface-dynamic">
										Now playing
									</Typography>
								</Group>
								{trackNowPlaying && (
									<UnstyledButton
										onClick={e => {
											onOpenTrackContextMenu({
												desktopPosition: {
													x: e.clientX,
													y: e.clientY,
												},
												trackInfo: {
													author: trackNowPlaying.author,
													id: trackNowPlaying.id,
													isInQueue: true,
													isLiked: trackNowPlaying.isLiked,
													isNowPlaying: true,
													thumbnail: trackNowPlaying.thumbnail,
													title: trackNowPlaying.title,
												},
											});
										}}
									>
										<MoreVertIcon />
									</UnstyledButton>
								)}
							</Group>
						</motion.div>

						<Group alignItems="center" justifyContent="center" fillContainer>
							<motion.div
								style={{
									overflow: 'hidden',
									position: 'relative',
									width: 96,
									minWidth: 96,
									height: 54,
								}}
								variants={{
									collapsed: {
										width: 96,
										minWidth: 96,
										height: 54,
										borderRadius: 0,
										transition: {
											duration: 0.8,
										},
									},
									expanded: {
										width: globalThis.window?.innerWidth - 64,
										minWidth: globalThis.window?.innerWidth - 64,
										height: (globalThis.window?.innerWidth - 64) * (9 / 16),
										borderRadius: 8,
										transition: {
											duration: 0.8,
										},
									},
								}}
							>
								<Image
									ref={thumbnailRef}
									src={trackNowPlaying?.thumbnail || ''}
									alt={trackNowPlaying?.title || ''}
									quality={100}
									fill
								/>
							</motion.div>

							<motion.div
								style={{
									overflow: 'hidden',
									flexGrow: 1,
									width: 'initial',
								}}
								variants={{
									collapsed: {
										display: 'block',
										width: 'auto',
										minWidth: 'auto',
										transition: {
											duration: 0.4,
										},
									},
									expanded: {
										display: 'none',
										width: 0,
										minWidth: 0,
										transition: {
											duration: 0.4,
										},
									},
								}}
							>
								<Stack
									style={{
										height: '100%',
									}}
									justifyContent="center"
									horizontalPadding="small"
								>
									<Typography variant="body" color="on-surface-dynamic" truncate={isCollapsed}>
										{trackNowPlaying?.title}
									</Typography>
									<Typography variant="body" size="small" color="on-surface-variant-dynamic" truncate={isCollapsed}>
										{trackNowPlaying?.author}
									</Typography>
								</Stack>
							</motion.div>
							<motion.div
								style={{
									overflow: 'hidden',
									minWidth: 64,
								}}
								variants={{
									collapsed: {
										display: 'block',
										scale: 1,
										opacity: 1,
										transition: {
											duration: 0.4,
										},
									},
									expanded: {
										display: 'none',
										scale: 0,
										opacity: 0,
										transition: {
											duration: 0.4,
										},
									},
								}}
							>
								<Group
									style={{
										height: '100%',
									}}
									spacing="small"
									horizontalPadding="small"
								>
									<UnstyledButton
										onClick={e => {
											e.stopPropagation();
											handleTogglePlaying(!isPlaying);
										}}
									>
										{isPlaying ? (
											<PauseCircleIcon size="large" color="primary-dynamic" />
										) : (
											<PlayCircleIcon size="large" color="primary-dynamic" />
										)}
									</UnstyledButton>
								</Group>
							</motion.div>
						</Group>

						<motion.div
							style={{
								display: 'none',
							}}
							variants={{
								collapsed: {
									display: 'none',
									opacity: 0.5,
									transition: {
										duration: 0.6,
									},
								},
								expanded: {
									display: 'block',
									opacity: 1,
									transition: {
										duration: 0.6,
									},
								},
							}}
						>
							<Stack spacing="medium">
								<Group spacing="xlarge" horizontalPadding="medium" verticalPadding="medium">
									<Stack spacing="xsmall" fillContainer>
										<Typography variant="body" size="large" textAlign="center" color="on-surface-dynamic">
											{trackNowPlaying?.title}
										</Typography>
										<Typography variant="body" color="on-surface-variant-dynamic" textAlign="center">
											{trackNowPlaying?.author}
										</Typography>
									</Stack>
								</Group>

								<Stack spacing="xsmall" horizontalPadding="medium" verticalPadding="medium">
									<Slider min={0} max={duration} value={currentTime} onUpdateValue={handleChangeCurrentTime} />

									<Group justifyContent="space-between">
										<Typography variant="label" size="small" color="on-surface-variant-dynamic">
											{formatTime(currentTime)}
										</Typography>
										<Typography variant="label" size="small" color="on-surface-variant-dynamic">
											{formatTime(duration)}
										</Typography>
									</Group>
								</Stack>

								<Group justifyContent="space-between" horizontalPadding="medium" verticalPadding="medium">
									<UnstyledButton onClick={handleToggleShuffling}>
										<ShuffleIcon color={isShuffling ? 'primary-dynamic' : 'on-surface-variant-dynamic'} />
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

								<Group justifyContent="space-between" horizontalPadding="medium" verticalPadding="medium">
									<UnstyledButton onClick={handleToggleLikeTrack}>
										{trackNowPlaying?.isLiked ? (
											<FavoriteFillIcon size="medium" color="primary-dynamic" />
										) : (
											<FavoriteIcon size="medium" color="on-surface-variant-dynamic" />
										)}
									</UnstyledButton>

									<UnstyledButton onClick={onOpenQueue}>
										<Group spacing="small" alignItems="center">
											<Typography variant="body" color="on-surface-variant-dynamic">
												Tiếp theo
											</Typography>
											<PlaylistPlayIcon color="on-surface-variant-dynamic" />
										</Group>
									</UnstyledButton>
								</Group>
							</Stack>
						</motion.div>
					</motion.div>
				</Paper>
			</motion.div>
		</Fragment>
	);
};

export default MobilePlayerControls;
