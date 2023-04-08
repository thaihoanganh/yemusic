import { useCallback, useContext, useMemo, useState } from 'react';

import {
	Frame,
	Group,
	LoadingLayer,
	LoadingLayerProvider,
	Stack,
	TrackSecondary,
	Typography,
	useTheme,
	useTrackContextMenu,
} from '@yemusic/components';
import {
	PlaylistsContext,
	QueueContext,
	TracksContext,
	generateId,
	onAddTrackIdToQueueIds,
	onAddTrackToPlaylistWithSlug,
	onRemoveTrackFromPlaylistWithSlug,
	onSetCurrentTrackId,
	onTogglePlaying,
} from '@yemusic/providers';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { NextPageWithLayoutComponents } from '../_app';

const PlaylistPage: NextPageWithLayoutComponents = () => {
	const { query } = useRouter();

	const [isFetchingLikedTracks] = useState(false);

	const tracks = useContext(TracksContext.Context);
	const { queueTrackIds, currentTrackId } = useContext(QueueContext.Context);
	const playlists = useContext(PlaylistsContext.Context);
	const { onOpenTrackContextMenu } = useTrackContextMenu();
	const { device } = useTheme();

	const playlist = playlists.find(playlist => playlist.slug === query.playlistSlug);

	const likedTracksDetails = useMemo(() => {
		const playlistTrackIds = playlist?.tracks.map(track => track.trackId) || [];

		return tracks
			.filter(track => playlistTrackIds.includes(track.id))
			.sort((a, b) => {
				return playlistTrackIds.indexOf(a.id) - playlistTrackIds.indexOf(b.id);
			})
			.reverse();
	}, [playlist, tracks]);

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
	}, []);

	const handleToggleLikeTrack = (trackId: string, isLiked: boolean) => {
		if (isLiked) {
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
		<Frame horizontalPadding={device === 'desktop' ? 'large' : 'small'} verticalPadding="small">
			<LoadingLayerProvider isLoading={isFetchingLikedTracks}>
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
								{playlist?.name}
							</Typography>
						</LoadingLayer>
					</Group>

					<Stack spacing="medium">
						{isFetchingLikedTracks
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
							: likedTracksDetails.map(track => (
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
			</LoadingLayerProvider>
		</Frame>
	);
};

PlaylistPage.getLayoutComponents = () => ({});

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

	return {
		props: {
			userAgent,
		},
	};
};

export default PlaylistPage;
