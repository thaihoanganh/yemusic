import { ITrackEntity } from '@yemusic/providers';
import Image from 'next/image';

import { UnstyledButton } from '../../atoms/Button';
import Frame, { Group, Stack } from '../../atoms/Frame';
import { FavoriteFillIcon, FavoriteIcon, MoreHorizIcon, PlayCircleIcon } from '../../atoms/Icons';
import { LoadingLayer } from '../../atoms/LoadingLayer';
import { Paper } from '../../atoms/Paper';
import { StateLayer } from '../../atoms/StateLayer';
import Typography from '../../atoms/Typography/Typography';
import { useTheme } from '../../Theme';

export interface TrackPrimaryProps
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
		width: 192,
		height: 108,
	},
};

export const TrackPrimary = ({
	author,
	isLiked,
	isNowPlaying,
	thumbnail,
	title,
	onOpenTrackContextMenu,
	onToggleLikeTrack,
	onTogglePlaying,
}: TrackPrimaryProps) => {
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
						borderRadius: isDesktop ? 12 : 0,
					}}
					color={
						isDesktop
							? isNowPlaying
								? 'primary-container-dynamic'
								: isHover
								? 'primary-container'
								: 'secondary-container'
							: undefined
					}
					surfaceLevel={5}
				>
					<Frame
						horizontalPadding={isDesktop ? 'small' : undefined}
						verticalPadding={isDesktop ? 'small' : undefined}
						role={isDesktop ? undefined : 'button'}
						onClick={() => {
							if (!isDesktop && onTogglePlaying) {
								onTogglePlaying();
							}
						}}
						onContextMenu={handleOpenTrackContextMenu}
					>
						<Stack
							style={{
								width: imageSize.desktop.width,
							}}
							spacing="xsmall"
						>
							<LoadingLayer loading={false}>
								<div
									style={{
										overflow: 'hidden',
										position: 'relative',
										borderRadius: 8,
										...imageSize.desktop,
									}}
								>
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
									{isHover && (
										<div style={{ position: 'absolute' }}>
											<Paper color="surface" backgroundOpacity={0.6}>
												<Group
													style={{
														...imageSize.desktop,
													}}
													spacing="small"
													justifyContent="center"
													alignItems="center"
												>
													<UnstyledButton onClick={onToggleLikeTrack}>
														{isLiked ? (
															<FavoriteFillIcon color={isNowPlaying ? 'primary-dynamic' : 'primary'} />
														) : (
															<FavoriteIcon color={isNowPlaying ? 'primary-dynamic' : 'primary'} />
														)}
													</UnstyledButton>
													<UnstyledButton onClick={onTogglePlaying}>
														<PlayCircleIcon size="xlarge" color={isNowPlaying ? 'primary-dynamic' : 'primary'} />
													</UnstyledButton>
													<UnstyledButton onClick={handleOpenTrackContextMenu}>
														<MoreHorizIcon color={isNowPlaying ? 'primary-dynamic' : 'primary'} />
													</UnstyledButton>
												</Group>
											</Paper>
										</div>
									)}
								</div>
							</LoadingLayer>

							<Group>
								<Stack spacing="xsmall">
									<LoadingLayer loading={false}>
										<Typography
											variant="title"
											size="small"
											color={
												isDesktop
													? isNowPlaying
														? 'on-primary-container-dynamic'
														: isHover
														? 'on-primary-container'
														: 'on-surface'
													: 'on-surface'
											}
											title={title}
											truncate
										>
											{title}
										</Typography>
									</LoadingLayer>
									<LoadingLayer loading={false}>
										<Typography
											variant="body"
											size="small"
											color={
												isDesktop
													? isNowPlaying
														? 'on-primary-container-dynamic'
														: isHover
														? 'on-primary-container'
														: 'on-surface-variant'
													: 'on-surface-variant'
											}
											title={author}
											truncate
										>
											{author}
										</Typography>
									</LoadingLayer>
								</Stack>
							</Group>
						</Stack>
					</Frame>
				</Paper>
			)}
		</StateLayer>
	);
};

export default TrackPrimary;
