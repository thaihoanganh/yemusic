import { Fragment, useEffect, useRef, useState } from 'react';

import {
	generateId,
	onAddTracksToQueue,
	onAddTrackToPlaylist,
	onRemoveTrackFromPlaylist,
	onRemoveTrackFromQueue,
} from '@yemusic/providers';
import { playlistsService } from '@yemusic/services/v1';
import Image from 'next/image';

import { UnstyledButton } from '../../atoms/Button';
import { Divider } from '../../atoms/Divider';
import Frame, { Group, Stack } from '../../atoms/Frame';
import { DownloadIcon, FavoriteFillIcon, FavoriteIcon, PlaylistPlayIcon, PlaylistRemoveIcon } from '../../atoms/Icons';
import { LoadingLayer } from '../../atoms/LoadingLayer';
import { Paper } from '../../atoms/Paper';
import { StateLayer } from '../../atoms/StateLayer';
import Typography from '../../atoms/Typography/Typography';

import { useDownloadTrack, useTrackContextMenu } from './hooks';
import { trackContextMenuStyles } from './Track.css';

export interface TrackContextMenuProps {
	isMobile: boolean;
}

const trackContextMenuWidth = 280;

export const TrackContextMenu = ({ isMobile }: TrackContextMenuProps) => {
	const { desktopPosition, isOpen, trackInfo, onCloseTrackContextMenu } = useTrackContextMenu();
	const { onOpenModalDownloadTrack } = useDownloadTrack();

	const trackContextMenuRef = useRef<HTMLDivElement>(null);
	const [trackContextMenuHeight, setTrackContextMenuHeight] = useState<number>(0);
	const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(false);

	useEffect(() => {
		if (isOpen && trackContextMenuRef.current) {
			setTrackContextMenuHeight(trackContextMenuRef.current.offsetHeight);
		}
	}, [isOpen]);

	const handleCloseContextMenu = () => {
		onCloseTrackContextMenu();
		setIsLoadingThumbnail(true);
	};

	const handleAddToPlaylist = () => {
		if (trackInfo) {
			onAddTracksToQueue({
				trackIds: [trackInfo.id],
			});
			handleCloseContextMenu();
		}
	};

	const handleRemoveFromPlaylist = () => {
		if (trackInfo) {
			onRemoveTrackFromQueue({
				trackId: trackInfo.id,
			});
			handleCloseContextMenu();
		}
	};

	if (isOpen) {
		let trackContextMenuStyle: React.CSSProperties = {};

		if (isMobile) {
			trackContextMenuStyle = {
				bottom: 0,
				left: 0,
				right: 0,
				borderTopRightRadius: 16,
				borderTopLeftRadius: 16,
				borderBottomLeftRadius: 0,
				borderBottomRightRadius: 0,
			};
		} else {
			if (desktopPosition && globalThis.window) {
				trackContextMenuStyle = {
					top:
						desktopPosition.y + trackContextMenuHeight > window.innerHeight
							? desktopPosition.y - trackContextMenuHeight - 16
							: desktopPosition.y - 16,
					left: desktopPosition.x - trackContextMenuWidth - 16,
					width: trackContextMenuWidth,
					borderRadius: 8,
				};
			}
		}

		const handleToggleLikeTrack = (trackId: string, isLike: boolean, ref?: string) => {
			if (isLike) {
				onAddTrackToPlaylist({
					slug: 'liked-tracks',
					track: {
						_id: generateId(),
						trackId,
						addedAt: Date.now(),
					},
				});

				if (trackInfo.ref) {
					playlistsService.addTrackToPlaylist({
						playlistSlug: 'liked-tracks',
						trackId: trackId,
						ref: ref,
					});
				}
			} else {
				onRemoveTrackFromPlaylist({
					slug: 'liked-tracks',
					trackId,
				});
			}
			handleCloseContextMenu();
		};

		const handleDownloadTrack = () => {
			if (trackInfo) {
				onOpenModalDownloadTrack({
					trackId: trackInfo.id,
				});
				handleCloseContextMenu();
			}
		};

		return (
			<div className={trackContextMenuStyles.modal}>
				<div className={trackContextMenuStyles.modalMask} onClick={handleCloseContextMenu}>
					<Paper
						style={{
							width: '100%',
							height: '100%',
						}}
						color={isMobile ? 'surface' : undefined}
						backgroundOpacity={isMobile ? 0.36 : 0}
					/>
				</div>
				<div ref={trackContextMenuRef} style={trackContextMenuStyle} className={trackContextMenuStyles.modalContent}>
					<Paper color="surface">
						<Paper color="primary" surfaceLevel={3}>
							<Stack>
								<Fragment>
									<Stack spacing="small" alignItems="center" horizontalPadding="small" verticalPadding="medium">
										<LoadingLayer loading={isLoadingThumbnail}>
											<Image
												style={{
													borderRadius: 8,
												}}
												src={trackInfo.thumbnail}
												alt={trackInfo.title}
												width={160}
												height={90}
												onLoad={() => setIsLoadingThumbnail(false)}
											/>
										</LoadingLayer>
										<Stack spacing="xsmall" alignItems="center">
											<Typography textAlign="center" variant="body">
												{trackInfo.title}
											</Typography>
											<Typography textAlign="center" variant="body" color="on-surface-variant">
												{trackInfo.author}
											</Typography>
										</Stack>
									</Stack>

									<Frame horizontalPadding="small">
										<Divider />
									</Frame>
								</Fragment>

								<Stack verticalPadding="medium">
									{trackInfo.isInQueue ? (
										<UnstyledButton onClick={handleRemoveFromPlaylist} disabled={trackInfo.isNowPlaying}>
											<StateLayer color="primary" state={isMobile || trackInfo.isNowPlaying ? [] : ['hover']}>
												<Group
													style={{
														width: trackContextMenuWidth,
													}}
													spacing="small"
													alignItems="center"
													horizontalPadding="small"
													verticalPadding={isMobile ? 'small' : 'xsmall'}
												>
													<PlaylistRemoveIcon />
													<Typography variant="body">Xoá khỏi danh sách phát</Typography>
												</Group>
											</StateLayer>
										</UnstyledButton>
									) : (
										<UnstyledButton onClick={handleAddToPlaylist}>
											<StateLayer color="primary" state={isMobile ? [] : ['hover']}>
												<Group
													style={{
														width: trackContextMenuWidth,
													}}
													spacing="small"
													alignItems="center"
													horizontalPadding="small"
													verticalPadding={isMobile ? 'small' : 'xsmall'}
												>
													<PlaylistPlayIcon />
													<Typography variant="body">Thêm vào danh sách phát</Typography>
												</Group>
											</StateLayer>
										</UnstyledButton>
									)}
									<UnstyledButton
										onClick={() => handleToggleLikeTrack(trackInfo.id, !trackInfo.isLiked, trackInfo.ref)}
									>
										<StateLayer color="primary" state={isMobile ? [] : ['hover']}>
											<Group
												style={{
													width: trackContextMenuWidth,
												}}
												spacing="small"
												alignItems="center"
												horizontalPadding="small"
												verticalPadding={isMobile ? 'small' : 'xsmall'}
											>
												{trackInfo.isLiked ? <FavoriteFillIcon /> : <FavoriteIcon />}
												<Typography variant="body">
													{trackInfo.isLiked ? 'Xoá khỏi danh sách yêu thích' : 'Thêm vào danh sách yêu thích'}
												</Typography>
											</Group>
										</StateLayer>
									</UnstyledButton>
									<UnstyledButton onClick={handleDownloadTrack}>
										<StateLayer color="primary" state={isMobile ? [] : ['hover']}>
											<Group
												style={{
													width: trackContextMenuWidth,
												}}
												spacing="small"
												alignItems="center"
												horizontalPadding="small"
												verticalPadding={isMobile ? 'small' : 'xsmall'}
											>
												<DownloadIcon />
												<Typography variant="body">Tải xuống</Typography>
											</Group>
										</StateLayer>
									</UnstyledButton>
								</Stack>
							</Stack>
						</Paper>
					</Paper>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default TrackContextMenu;
