import { cloneElement } from 'react';

import Image from 'next/image';

import { UnstyledButton } from '../../atoms/Button';
import Frame, { Group } from '../../atoms/Frame';
import {
	FavoriteFillIcon,
	FavoriteIcon,
	MoreHorizIcon,
	PauseCircleFillIcon,
	PlayCircleFillIcon,
} from '../../atoms/Icons';
import { Paper } from '../../atoms/Paper';
import { StateLayer } from '../../atoms/StateLayer';
import Typography from '../../atoms/Typography/Typography';

import { trackStyles } from './Track.css';

export interface TrackProps {
	artist: string;
	duration?: string;
	isLoading?: boolean;
	isLiked?: boolean;
	isPlaying: boolean;
	nowPlaying?: boolean;
	thumbnail: string;
	title: string;
	onClickFavorite?: () => void;
	onClickMore?: () => void;
	onTogglePlay?: () => void;
}

const timeFormat = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time - minutes * 60);

	return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const Track = ({
	artist,
	duration,
	isLoading,
	isLiked,
	isPlaying,
	title,
	nowPlaying,
	thumbnail,
	onClickFavorite,
	onClickMore,
	onTogglePlay,
}: TrackProps) => {
	const loadingWrapperClassName = isLoading ? trackStyles.loadingWrapper : undefined;
	const loadingClassName = isLoading ? trackStyles.loading : undefined;

	return (
		<Frame
			style={{
				pointerEvents: isLoading ? 'none' : 'initial',
			}}
			cornerRadius="small"
		>
			<StateLayer color="primary-container" state={['hover']}>
				{({ isHover }) => (
					<Paper color={nowPlaying ? 'primary-container' : undefined}>
						<Group spacing="small" alignItems="center" verticalPadding="xsmall" horizontalPadding="xsmall">
							<div className={loadingWrapperClassName}>
								<div className={loadingClassName}>
									<Group alignItems="center">
										<UnstyledButton className={trackStyles.imageWrapper} onClick={onTogglePlay}>
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
													color: 'on-primary-container',
												})}
											</div>
										</UnstyledButton>
									</Group>
								</div>
							</div>

							<div className={trackStyles.description}>
								<div className={loadingWrapperClassName}>
									<div className={loadingClassName}>
										<Typography
											variant="body"
											color={isHover || nowPlaying ? 'on-primary-container' : 'on-surface-variant'}
											truncate
										>
											{title || '\u00A0'}
										</Typography>
									</div>
								</div>
								<div className={loadingWrapperClassName}>
									<div className={loadingClassName}>
										<Typography
											variant="body"
											color={isHover || nowPlaying ? 'on-primary-container' : 'on-surface-variant'}
											size="small"
											truncate
										>
											{artist || '\u00A0'}
										</Typography>
									</div>
								</div>
							</div>

							{isHover && (
								<div className={trackStyles.actions}>
									<UnstyledButton onClick={onClickFavorite}>
										{isLiked ? (
											<FavoriteIcon color="on-primary-container" size="small" />
										) : (
											<FavoriteFillIcon color="on-primary-container" size="small" />
										)}
									</UnstyledButton>
									<UnstyledButton onClick={onClickMore}>
										<MoreHorizIcon color="on-primary-container" size="small" />
									</UnstyledButton>
								</div>
							)}

							{!isHover && duration && (
								<div className={loadingWrapperClassName}>
									<div className={loadingClassName}>
										<div className={trackStyles.duration}>
											<Typography variant="label" size="small" color="on-surface-variant">
												{timeFormat(Number(duration)) || '\u00A0'}
											</Typography>
										</div>
									</div>
								</div>
							)}
						</Group>
					</Paper>
				)}
			</StateLayer>
		</Frame>
	);
};

export default Track;
