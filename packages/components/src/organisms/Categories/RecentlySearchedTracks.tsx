import { useContext, useMemo } from 'react';

import { limitInitialPlaylistTracks, PlaylistsContext, QueueContext, TracksContext } from '@yemusic/providers';

import { UnstyledButton } from '../../atoms/Button';
import { Carousel } from '../../atoms/Carousel';
import { Group, Stack } from '../../atoms/Frame';
import { LoadingLayer, LoadingLayerProvider } from '../../atoms/LoadingLayer';
import { Typography } from '../../atoms/Typography';
import { useTheme } from '../../Theme';
import { TrackPrimary, useTrack, useTrackContextMenu } from '../Track';

const recentlyPlaylistSlug = 'recently-searched';

export const RecentlySearchedTracks = () => {
	const { playlists } = useContext(PlaylistsContext.Context);
	const { queueTrackIds, currentTrackId } = useContext(QueueContext.Context);
	const tracks = useContext(TracksContext.Context);

	const { device } = useTheme();
	const { onOpenTrackContextMenu } = useTrackContextMenu();
	const { handleToggleLikeTrack, handleTogglePlaying } = useTrack();

	const recentlySearched = useMemo(() => {
		const recentlySearchedTracks = playlists.find(playlist => playlist.slug === recentlyPlaylistSlug)?.tracks || [];
		const recentlySearchedIds = recentlySearchedTracks.map(track => track.trackId).reverse();

		return tracks
			.filter(track => recentlySearchedIds.includes(track.id))
			.sort((a, b) => {
				return recentlySearchedIds.indexOf(a.id) - recentlySearchedIds.indexOf(b.id);
			});
	}, [tracks, playlists]);

	return (
		<LoadingLayerProvider>
			<Stack spacing="small">
				<Group alignItems="center" justifyContent="space-between">
					<LoadingLayer loading="inherit">
						<Typography style={{ fontWeight: 500 }} variant="title" size="large">
							Đã nghe gần đây
						</Typography>
					</LoadingLayer>

					{recentlySearched.length >= limitInitialPlaylistTracks && (
						<LoadingLayer loading="inherit">
							<UnstyledButton>
								<Typography variant="label" color="on-surface-variant">
									Xem thêm
								</Typography>
							</UnstyledButton>
						</LoadingLayer>
					)}
				</Group>

				<Stack spacing="small">
					<Carousel key={String(Boolean(currentTrackId))} isScrollable={device === 'mobile'}>
						{recentlySearched.map(track => (
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

export default RecentlySearchedTracks;
