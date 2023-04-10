import { ITrackEntity } from '@yemusic/providers';
import { formatTime } from '@yemusic/utils';
import Image from 'next/image';

import { UnstyledButton } from '../../atoms/Button';
import { Group, Stack } from '../../atoms/Frame';
import { FavoriteFillIcon, FavoriteIcon, MoreHorizIcon, MoreVertIcon, PlayCircleIcon } from '../../atoms/Icons';
import { LoadingLayer } from '../../atoms/LoadingLayer';
import { Paper } from '../../atoms/Paper';
import { StateLayer } from '../../atoms/StateLayer';
import Typography from '../../atoms/Typography/Typography';
import { useTheme } from '../../Theme';

export interface TrackSecondaryProps
	extends Pick<ITrackEntity, 'author' | 'duration' | 'id' | 'isLiked' | 'thumbnail' | 'title'> {
	isNowPlaying?: boolean;
	isVisibleDuration?: boolean;
	isVisibleMoreOnlyOnHover?: boolean;
	onToggleLikeTrack?: () => void;
	onTogglePlaying?: () => void;
	onOpenTrackContextMenu?: ({
		position,
	}: {
		position: {
			x: number;
			y: number;
		};
	}) => void;
}

const imageSize = {
	desktop: {
		width: 96,
		height: 54,
	},
};

export const TrackSecondary = ({
	author,
	duration,
	isLiked,
	isNowPlaying,
	isVisibleDuration,
	isVisibleMoreOnlyOnHover,
	thumbnail,
	title,
	onOpenTrackContextMenu,
	onToggleLikeTrack,
	onTogglePlaying,
}: TrackSecondaryProps) => {
	const { device } = useTheme();

	const isDesktop = device === 'desktop';

	const handleOpenTrackContextMenu = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		if (!onOpenTrackContextMenu) {
			return;
		}

		e.preventDefault();
		onOpenTrackContextMenu({
			position: {
				x: e.clientX,
				y: e.clientY,
			},
		});
	};

	return (
		<StateLayer state={isDesktop ? ['hover'] : []}>
			{({ isHover }) => (
				<Paper
					style={{
						overflow: 'hidden',
						borderRadius: 4,
					}}
					color={isNowPlaying ? 'primary-container-dynamic' : isHover ? 'primary-container' : undefined}
					surfaceLevel={isNowPlaying ? 5 : 1}
				>
					<Group
						spacing="small"
						role="button"
						onClick={() => {
							if (!isDesktop && onTogglePlaying) {
								onTogglePlaying();
							}
						}}
						onContextMenu={handleOpenTrackContextMenu}
					>
						<LoadingLayer loading="inherit">
							<div
								style={{
									overflow: 'hidden',
									position: 'relative',
									borderRadius: 4,
									...imageSize.desktop,
								}}
							>
								{thumbnail && (
									<Image
										style={{
											transform: isHover ? 'scale(1.05)' : 'scale(1)',
											transition: 'transform 0.45s ease-in-out',
										}}
										src={thumbnail}
										alt={title}
										quality={100}
										fill
									/>
								)}

								{isHover && (
									<div
										style={{
											position: 'absolute',
										}}
									>
										<Paper color="surface" backgroundOpacity={0.6}>
											<Group
												style={{
													...imageSize.desktop,
												}}
												spacing="small"
												justifyContent="center"
												alignItems="center"
											>
												<UnstyledButton onClick={onTogglePlaying}>
													<PlayCircleIcon size="xlarge" color={isNowPlaying ? 'primary-dynamic' : 'primary'} />
												</UnstyledButton>
											</Group>
										</Paper>
									</div>
								)}
							</div>
						</LoadingLayer>

						<Stack spacing="xsmall" justifyContent="center" fillContainer>
							<LoadingLayer loading="inherit">
								<Typography
									variant="title"
									size="small"
									color={
										isNowPlaying ? 'on-primary-container-dynamic' : isHover ? 'on-primary-container' : 'on-surface'
									}
									title={title}
									truncate
								>
									{title}
								</Typography>
							</LoadingLayer>
							<LoadingLayer loading="inherit">
								<Typography
									variant="body"
									size="small"
									color={
										isNowPlaying
											? 'on-primary-container-dynamic'
											: isHover
											? 'on-primary-container'
											: 'on-surface-variant'
									}
									title={author}
									truncate
								>
									{author}
								</Typography>
							</LoadingLayer>
						</Stack>

						{isDesktop ? (
							(!isVisibleMoreOnlyOnHover || (isVisibleMoreOnlyOnHover && isHover)) && (
								<Group
									style={{
										minWidth: isVisibleDuration ? 168 : 84,
									}}
									spacing="small"
									justifyContent="flex-end"
									horizontalPadding="small"
								>
									{isVisibleDuration && (
										<Group alignItems="center" fillContainer>
											<LoadingLayer loading="inherit">
												<Typography
													variant="body"
													size="small"
													color={
														isNowPlaying
															? 'on-primary-container-dynamic'
															: isHover
															? 'on-primary-container'
															: 'on-surface-variant'
													}
												>
													{formatTime(duration)}
												</Typography>
											</LoadingLayer>
										</Group>
									)}
									<UnstyledButton onClick={onToggleLikeTrack}>
										<LoadingLayer loading="inherit">
											{isLiked ? (
												<FavoriteFillIcon color={isNowPlaying ? 'primary-dynamic' : 'primary'} />
											) : (
												<FavoriteIcon
													color={isNowPlaying ? 'primary-dynamic' : isHover ? 'primary' : 'on-surface-variant'}
												/>
											)}
										</LoadingLayer>
									</UnstyledButton>
									<UnstyledButton onClick={handleOpenTrackContextMenu}>
										<LoadingLayer loading="inherit">
											<MoreHorizIcon
												color={
													isNowPlaying
														? 'on-primary-container-dynamic'
														: isHover
														? 'on-primary-container'
														: 'on-surface-variant'
												}
											/>
										</LoadingLayer>
									</UnstyledButton>
								</Group>
							)
						) : (
							<Group
								style={{
									minWidth: 24,
								}}
								spacing="small"
							>
								<UnstyledButton
									onClick={e => {
										e.stopPropagation();
										handleOpenTrackContextMenu(e);
									}}
								>
									<LoadingLayer loading="inherit">
										<MoreVertIcon
											color={
												isNowPlaying
													? 'on-primary-container-dynamic'
													: isHover
													? 'on-primary-container'
													: 'on-surface-variant'
											}
										/>
									</LoadingLayer>
								</UnstyledButton>
							</Group>
						)}
					</Group>
				</Paper>
			)}
		</StateLayer>
	);
};

export default TrackSecondary;
