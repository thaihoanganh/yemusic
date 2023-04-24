import { useContext, useMemo } from 'react';

import { PlaylistsContext, QueueContext, TracksContext } from '@yemusic/providers';
import { useRouter } from 'next/router';

import { UnstyledButton } from '../../atoms/Button';
import { Carousel } from '../../atoms/Carousel';
import { Group, Stack } from '../../atoms/Frame';
import { LoadingLayer, LoadingLayerProvider } from '../../atoms/LoadingLayer';
import { Typography } from '../../atoms/Typography';
import { useTheme } from '../../Theme';
import { TrackPrimary, useTrack, useTrackContextMenu } from '../Track';

const recentlyPlaylistSlug = 'recently-played';

export const RecentlyPlayedTracks = () => {
	const router = useRouter();

	const { isFetchingInitialPlaylists, playlists } = useContext(PlaylistsContext.Context);
	const { queueTrackIds, currentTrackId } = useContext(QueueContext.Context);
	const tracks = useContext(TracksContext.Context);

	const { device } = useTheme();
	const { onOpenTrackContextMenu } = useTrackContextMenu();
	const { handleToggleLikeTrack, handleTogglePlaying } = useTrack();

	const recentlyPlayed = useMemo(() => {
		const recentlyPlayedTracks = playlists.find(playlist => playlist.slug === recentlyPlaylistSlug)?.tracks || [];
		const recentlyPlayedIds = recentlyPlayedTracks.map(track => track.trackId).reverse();

		return tracks
			.filter(track => recentlyPlayedIds.includes(track.id))
			.sort((a, b) => {
				return recentlyPlayedIds.indexOf(a.id) - recentlyPlayedIds.indexOf(b.id);
			});
	}, [tracks, playlists]);

	if (!isFetchingInitialPlaylists && recentlyPlayed.length === 0) {
		return null;
	}

	return (
		<LoadingLayerProvider isLoading={isFetchingInitialPlaylists}>
			<Stack spacing="small">
				<Group alignItems="center" justifyContent="space-between">
					<LoadingLayer loading="inherit">
						<Typography style={{ fontWeight: 500 }} variant="title" size="large" color="on-surface-variant">
							Đã nghe gần đây
						</Typography>
					</LoadingLayer>

					{recentlyPlayed.length >= 10 && (
						<LoadingLayer loading="inherit">
							<UnstyledButton onClick={() => router.push('/playlists/recently-played')}>
								<Typography variant="label" color="on-surface-variant">
									Xem thêm
								</Typography>
							</UnstyledButton>
						</LoadingLayer>
					)}
				</Group>

				<Stack spacing="small">
					<Carousel key={String(Boolean(currentTrackId))} isScrollable={device === 'mobile'}>
						{isFetchingInitialPlaylists
							? Array.from({
									length: 20,
							  }).map((_, index) => (
									<TrackPrimary
										key={index}
										author="author"
										duration={0}
										id="id"
										isLiked={false}
										isVisibleDuration
										thumbnail=""
										title="title"
									/>
							  ))
							: recentlyPlayed.map(track => (
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
										onToggleLikeTrack={() =>
											handleToggleLikeTrack({
												trackId: track.id,
												isLike: !track.isLiked,
											})
										}
										onTogglePlaying={() =>
											handleTogglePlaying({
												trackId: track.id,
											})
										}
									/>
							  ))}
					</Carousel>
				</Stack>
			</Stack>
		</LoadingLayerProvider>
	);
};

export default RecentlyPlayedTracks;
