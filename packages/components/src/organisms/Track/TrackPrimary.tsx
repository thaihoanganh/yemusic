/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';

import {
	ITrackEntity,
	onAddTrackIdToQueueIds,
	onSetCurrentTrackId,
	onToggleLikeTrack,
	onTogglePlaying,
} from '@yemusic/providers';
import Image from 'next/image';

import { UnstyledButton } from '../../atoms/Button';
import Frame, { Group, Stack } from '../../atoms/Frame';
import { FavoriteFillIcon, FavoriteIcon, MoreHorizIcon, PlayCircleFillIcon } from '../../atoms/Icons';
import { LoadingLayer } from '../../atoms/LoadingLayer';
import { Paper } from '../../atoms/Paper';
import { StateLayer } from '../../atoms/StateLayer';
import Typography from '../../atoms/Typography/Typography';
import { useTheme } from '../../Theme';

export type TrackPrimaryProps = Pick<ITrackEntity, 'author' | 'duration' | 'id' | 'isLiked' | 'thumbnail' | 'title'>;

const imageSize = {
	desktop: {
		width: 192,
		height: 108,
	},
};

export const TrackPrimary = ({ author, id, isLiked, thumbnail, title }: TrackPrimaryProps) => {
	const { device } = useTheme();

	const isDesktop = device === 'desktop';

	const handleClickTrack = useCallback(() => {
		onTogglePlaying({
			isPlaying: false,
		});
		onAddTrackIdToQueueIds({
			trackId: id,
		});
		onSetCurrentTrackId({
			trackId: id,
		});
	}, [id]);

	const handleClickFavorite = () => {
		onToggleLikeTrack({
			trackId: id,
			isLiked: !isLiked,
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
					color={isDesktop ? (isHover ? 'primary-container' : 'secondary-container') : undefined}
					surfaceLevel={3}
				>
					<Frame horizontalPadding={isDesktop ? 'small' : undefined} verticalPadding={isDesktop ? 'small' : undefined}>
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
													<UnstyledButton onClick={handleClickFavorite}>
														{isLiked ? <FavoriteFillIcon /> : <FavoriteIcon />}
													</UnstyledButton>
													<UnstyledButton onClick={handleClickTrack}>
														<PlayCircleFillIcon size="xlarge" color="primary" />
													</UnstyledButton>
													<UnstyledButton>
														<MoreHorizIcon />
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
											color={isHover ? 'on-primary-container' : 'on-surface'}
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
											color={isHover ? 'on-primary-container' : 'on-surface-variant'}
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
