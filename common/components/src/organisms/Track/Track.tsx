import { cloneElement } from 'react';

import Image from 'next/image';

import { UnstyledButton } from '../../atoms/Button';
import Frame, { Group, Stack } from '../../atoms/Frame';
import {
	FavoriteFillIcon,
	FavoriteIcon,
	MoreHorizIcon,
	PauseCircleFillIcon,
	PlayCircleFillIcon,
} from '../../atoms/Icons';
import { LoadingLayer } from '../../atoms/LoadingLayer';
import { Paper } from '../../atoms/Paper';
import { StateLayer } from '../../atoms/StateLayer';
import Typography from '../../atoms/Typography/Typography';

import { useTrack } from './hooks';
import { trackStyles } from './Track.css';

export interface TrackProps {
	author: string;
	duration?: string;
	isLiked?: boolean;
	isPlaying: boolean;
	nowPlaying?: boolean;
	trackId: string;
	thumbnail?: string;
	title: string;
	onTogglePlaying?: () => void;
}

const timeFormat = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time - minutes * 60);

	return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const Track = ({
	author,
	duration,
	isLiked,
	isPlaying,
	title,
	nowPlaying,
	trackId,
	thumbnail = '',
	onTogglePlaying,
}: TrackProps) => {
	const { setIsOpenMenu } = useTrack();

	const handleClickMore = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		setIsOpenMenu({
			trackId,
			isOpenMenu: true,
			position: {
				x: event.clientX,
				y: event.clientY,
			},
		});
	};

	const handleClickContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		setIsOpenMenu({
			trackId,
			isOpenMenu: true,
			position: {
				x: event.clientX,
				y: event.clientY,
			},
		});
	};

	return (
		<Frame cornerRadius="small" role="button" onContextMenu={handleClickContextMenu}>
			<StateLayer color="primary-container" state={['hover']}>
				{({ isHover }) => (
					<Paper color={nowPlaying ? 'primary-container-dynamic' : undefined} surfaceLevel={5}>
						<Group spacing="small" alignItems="center" verticalPadding="xsmall" horizontalPadding="xsmall">
							<LoadingLayer loading="inherit">
								<Group alignItems="center">
									<UnstyledButton className={trackStyles.imageWrapper} onClick={onTogglePlaying}>
										<div
											style={{
												transform: isHover ? 'scale(1.05)' : 'scale(1)',
											}}
											className={trackStyles.image}
										>
											<Image src={thumbnail} alt={title} fill quality={100} />
										</div>
										<div className={trackStyles.imageOverlay}>
											{cloneElement(isPlaying ? <PauseCircleFillIcon /> : <PlayCircleFillIcon />, {
												style: {
													opacity: nowPlaying || isHover ? 1 : 0,
													transform: nowPlaying || isHover ? 'scale(1)' : 'scale(0.95)',
													transition: 'transform 0.45s',
												},
												size: 'large',
												color: nowPlaying ? 'on-primary-container-dynamic' : 'on-primary-container',
											})}
										</div>
									</UnstyledButton>
								</Group>
							</LoadingLayer>

							<Stack spacing="xsmall" fillContainer>
								<LoadingLayer loading="inherit">
									<Typography
										variant="body"
										color={
											nowPlaying ? 'on-primary-container-dynamic' : isHover ? 'on-primary-container' : 'on-surface'
										}
										truncate
									>
										{title}
									</Typography>
								</LoadingLayer>

								<LoadingLayer loading="inherit">
									<Typography
										variant="body"
										color={
											nowPlaying
												? 'on-primary-container-dynamic'
												: isHover
												? 'on-primary-container'
												: 'on-surface-variant'
										}
										size="small"
										truncate
									>
										{author}
									</Typography>
								</LoadingLayer>
							</Stack>

							{isHover && (
								<LoadingLayer loading="inherit">
									<div className={trackStyles.actions}>
										<UnstyledButton>
											{isLiked ? (
												<FavoriteIcon
													color={
														nowPlaying
															? 'on-primary-container-dynamic'
															: isHover
															? 'on-primary-container'
															: 'on-surface-variant'
													}
													size="small"
												/>
											) : (
												<FavoriteFillIcon
													color={
														nowPlaying
															? 'on-primary-container-dynamic'
															: isHover
															? 'on-primary-container'
															: 'on-surface-variant'
													}
													size="small"
												/>
											)}
										</UnstyledButton>
										<UnstyledButton onClick={handleClickMore}>
											<MoreHorizIcon
												color={
													nowPlaying
														? 'on-primary-container-dynamic'
														: isHover
														? 'on-primary-container'
														: 'on-surface-variant'
												}
												size="small"
											/>
										</UnstyledButton>
									</div>
								</LoadingLayer>
							)}

							{!isHover && duration && (
								<LoadingLayer loading="inherit">
									<div className={trackStyles.duration}>
										<Typography
											variant="label"
											size="small"
											color={
												nowPlaying
													? 'on-primary-container-dynamic'
													: isHover
													? 'on-primary-container'
													: 'on-surface-variant'
											}
										>
											{timeFormat(Number(duration)) || '\u00A0'}
										</Typography>
									</div>
								</LoadingLayer>
							)}
						</Group>
					</Paper>
				)}
			</StateLayer>
		</Frame>
	);
};

export default Track;
