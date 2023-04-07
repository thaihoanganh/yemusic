import { useCallback, useContext, useMemo } from 'react';

import {
	CategoriesContext,
	generateId,
	onAddTrackIdToQueueIds,
	onAddTrackToPlaylistWithSlug,
	onRemoveTrackFromPlaylistWithSlug,
	onSetCurrentTrackId,
	onTogglePlaying,
	PlaylistsContext,
	QueueContext,
	TracksContext,
} from '@yemusic/providers';
import Link from 'next/link';

import { UnstyledButton } from '../../atoms/Button';
import Carousel from '../../atoms/Carousel/Carousel';
import { Group, Stack } from '../../atoms/Frame';
import { LoadingLayer, LoadingLayerProvider } from '../../atoms/LoadingLayer';
import Typography from '../../atoms/Typography/Typography';
import { useTheme } from '../../Theme';
import { TrackPrimary, TrackSecondary } from '../Track';
import { useTrackContextMenu } from '../Track/hooks';

export const Categories = () => {
	const tracks = useContext(TracksContext.Context);
	const { isFetchingCategories, trending } = useContext(CategoriesContext.Context);
	const { queueTrackIds, currentTrackId } = useContext(QueueContext.Context);
	const playlists = useContext(PlaylistsContext.Context);
	const { onOpenTrackContextMenu } = useTrackContextMenu();
	const { device } = useTheme();

	const trendingTracks = useMemo(() => {
		return tracks
			.filter(track => trending.includes(track.id))
			.sort((a, b) => {
				return trending.indexOf(a.id) - trending.indexOf(b.id);
			});
	}, [tracks, trending]);

	const recentlyPlayedTracks = useMemo(() => {
		const recentlyPlayed = playlists.find(playlist => playlist.slug === 'recently-played');

		if (recentlyPlayed) {
			const recentlyPlayedIds = recentlyPlayed.tracks.map(track => track.trackId).reverse();
			return tracks
				.filter(track => recentlyPlayedIds.includes(track.id))
				.sort((a, b) => {
					return recentlyPlayedIds.indexOf(a.id) - recentlyPlayedIds.indexOf(b.id);
				});
		} else {
			return [];
		}
	}, [tracks, playlists]);

	const handleTogglePlaying = useCallback((trackId: string) => {
		onTogglePlaying({
			isPlaying: false,
		});
		onAddTrackIdToQueueIds({
			trackId,
		});
		onSetCurrentTrackId({
			trackId,
		});
		onAddTrackToPlaylistWithSlug({
			slug: 'recently-played',
			track: {
				_id: generateId(),
				trackId,
				addedAt: Date.now(),
			},
		});
	}, []);

	const handleToggleLikeTrack = (trackId: string, isLike: boolean) => {
		if (isLike) {
			onAddTrackToPlaylistWithSlug({
				slug: 'liked-tracks',
				track: {
					_id: generateId(),
					trackId,
					addedAt: Date.now(),
				},
			});
		} else {
			onRemoveTrackFromPlaylistWithSlug({
				slug: 'liked-tracks',
				trackId,
			});
		}
	};

	return (
		<LoadingLayerProvider isLoading={isFetchingCategories}>
			<Stack spacing="large">
				{recentlyPlayedTracks.length ? (
					<Stack spacing="medium">
						<Group alignItems="center" justifyContent="space-between">
							<LoadingLayer loading="inherit">
								<Typography
									style={{
										fontWeight: 600,
									}}
									variant="title"
									size="large"
									color="on-surface"
								>
									Đã nghe gần đây
								</Typography>
							</LoadingLayer>

							<Link
								style={{
									textDecoration: 'none',
								}}
								href="/playlists/recently-played"
							>
								<UnstyledButton>
									<LoadingLayer loading="inherit">
										<Group spacing="small" alignItems="center">
											<Typography variant="body" color="on-surface-variant">
												Xem tất cả
											</Typography>
										</Group>
									</LoadingLayer>
								</UnstyledButton>
							</Link>
						</Group>

						{isFetchingCategories ? (
							<Group spacing="small">
								{Array.from({
									length: 20,
								}).map((_, index) => (
									<TrackSecondary
										key={index}
										author="author"
										duration={0}
										id="id"
										isLiked={false}
										isVisibleDuration
										thumbnail=""
										title="title"
									/>
								))}
							</Group>
						) : (
							<Carousel key={String(Boolean(currentTrackId))} isScrollable={device === 'mobile'}>
								{recentlyPlayedTracks.map(track => (
									<TrackPrimary
										key={track.id}
										author={track.author}
										duration={track.duration}
										id={track.id}
										isLiked={track.isLiked}
										isNowPlaying={track.id === currentTrackId}
										isVisibleDuration
										thumbnail={track.thumbnail}
										title={track.title}
										onOpenTrackContextMenu={({ position }) => {
											onOpenTrackContextMenu({
												desktopPosition: position,
												trackInfo: {
													author: track.author,
													id: track.id,
													isInQueue: queueTrackIds.includes(track.id),
													isLiked: track.isLiked,
													isNowPlaying: track.id === currentTrackId,
													thumbnail: track.thumbnail,
													title: track.title,
												},
											});
										}}
										onToggleLikeTrack={() => handleToggleLikeTrack(track.id, !track.isLiked)}
										onTogglePlaying={() => handleTogglePlaying(track.id)}
									/>
								))}
							</Carousel>
						)}
					</Stack>
				) : null}

				<Stack spacing="medium">
					<Group justifyContent="space-between">
						<LoadingLayer loading="inherit">
							<Typography
								style={{
									fontWeight: 600,
								}}
								variant="title"
								size="large"
								color="on-surface"
							>
								Trending
							</Typography>
						</LoadingLayer>
					</Group>

					<Stack spacing="medium">
						{isFetchingCategories
							? Array.from({
									length: 20,
							  }).map((_, index) => (
									<div key={index}>
										<TrackSecondary
											key={index}
											author="author"
											duration={0}
											id="id"
											isLiked={false}
											isVisibleDuration
											thumbnail=""
											title="title"
										/>
									</div>
							  ))
							: trendingTracks.map(track => (
									<TrackSecondary
										key={track.id}
										author={track.author}
										duration={track.duration}
										id={track.id}
										isLiked={track.isLiked}
										isNowPlaying={track.id === currentTrackId}
										isVisibleDuration
										thumbnail={track.thumbnail}
										title={track.title}
										onOpenTrackContextMenu={({ position }) => {
											onOpenTrackContextMenu({
												desktopPosition: position,
												trackInfo: {
													author: track.author,
													id: track.id,
													isInQueue: queueTrackIds.includes(track.id),
													isLiked: track.isLiked,
													isNowPlaying: track.id === currentTrackId,
													thumbnail: track.thumbnail,
													title: track.title,
												},
											});
										}}
										onToggleLikeTrack={() => handleToggleLikeTrack(track.id, !track.isLiked)}
										onTogglePlaying={() => handleTogglePlaying(track.id)}
									/>
							  ))}
					</Stack>
				</Stack>
			</Stack>
		</LoadingLayerProvider>
	);
};

export default Categories;
