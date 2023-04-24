import { useContext, useEffect, useMemo } from 'react';

import {
	FilledButton,
	Group,
	LoadingLayer,
	LoadingLayerProvider,
	PlayCircleFillIcon,
	Stack,
	TrackSecondary,
	Typography,
	useTrack,
	useTrackContextMenu,
} from '@yemusic/components';
import { useAsync } from '@yemusic/hooks';
import {
	PlaylistsContext,
	QueueContext,
	TracksContext,
	onAddTracks,
	onAddTracksToQueue,
	onSkipToNextTrack,
} from '@yemusic/providers';
import { tracksService } from '@yemusic/services/v1';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { NextPageWithLayoutComponents } from '../_app';

const PlaylistPage: NextPageWithLayoutComponents = () => {
	const { query } = useRouter();

	const { isPending: isFetchingOtherTracksPlaylist, execute: onGetOtherTracksPlaylist } = useAsync({
		delay: 2000,
		handler: async ({ trackIds }) => {
			return tracksService.getTracks({ ids: trackIds });
		},
		onSuccess: ({ items }) => {
			onAddTracks({
				newTracks: items.map(track => ({
					id: track.id,
					title: track.title,
					author: track.author,
					thumbnail: track.thumbnail,
					duration: track.duration,
					source: [],
					isLiked: false,
					isLoadingAudio: false,
					isNowPlaying: false,
					captions: [],
					audioFormats: [],
				})),
			});
		},
	});

	const tracks = useContext(TracksContext.Context);
	const { queueTrackIds, currentTrackId, playlistSlug } = useContext(QueueContext.Context);
	const { isFetchingInitialPlaylists, playlists } = useContext(PlaylistsContext.Context);
	const { onOpenTrackContextMenu } = useTrackContextMenu();
	const { handleToggleLikeTrack, handleTogglePlaying } = useTrack();

	const playlist = playlists.find(playlist => playlist.slug === query.playlistSlug);

	useEffect(() => {
		if (playlist && !playlist.isLoadMore) {
			const otherTrackIds = playlist.tracks.map(track => track.trackId);
			onGetOtherTracksPlaylist({
				trackIds: otherTrackIds,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playlist]);

	const playlistTracks = useMemo(() => {
		const playlistTrackIds = playlist?.tracks.map(track => track.trackId) || [];

		return tracks
			.filter(track => playlistTrackIds.includes(track.id))
			.sort((a, b) => {
				return playlistTrackIds.indexOf(a.id) - playlistTrackIds.indexOf(b.id);
			});
	}, [playlist, tracks]);

	const handlePlayPlaylist = () => {
		if (playlist && playlist.tracks.length > 0) {
			onAddTracksToQueue({
				trackIds: playlist.tracks.map(track => track.trackId),
				playlistSlug: playlist.slug,
			});
			setTimeout(() => {
				onSkipToNextTrack({
					isShuffling: false,
				});
			}, 0);
		}
	};

	return (
		<LoadingLayerProvider isLoading={isFetchingInitialPlaylists}>
			<Stack spacing="medium">
				<Group alignItems="center" justifyContent="space-between">
					<Stack
						style={{
							gap: 4,
						}}
					>
						<LoadingLayer loading="inherit">
							<Typography
								style={{
									fontWeight: 600,
								}}
								variant="title"
								size="large"
								color="on-surface-variant"
							>
								{playlist?.name}
							</Typography>
						</LoadingLayer>
						<LoadingLayer loading="inherit">
							<Typography variant="body" color="on-surface">
								{playlist?.tracks.length} tracks
							</Typography>
						</LoadingLayer>
					</Stack>

					<Group spacing="small">
						<FilledButton
							rounded="large"
							color="primary-container"
							icon={<PlayCircleFillIcon />}
							disabled={playlistSlug === playlist?.slug}
							onClick={handlePlayPlaylist}
						>
							Phát tất cả
						</FilledButton>
					</Group>
				</Group>

				{!isFetchingInitialPlaylists && playlist && playlist.tracks.length === 0 && (
					<Group justifyContent="center" verticalPadding="xlarge">
						<Typography variant="title" size="large" textAlign="center">
							Chưa có bài hát nào trong danh sách này.
						</Typography>
					</Group>
				)}

				<Stack spacing="medium">
					{isFetchingInitialPlaylists
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
						: playlistTracks.map(track => (
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

					{!playlist?.isLoadMore && isFetchingOtherTracksPlaylist && (
						<LoadingLayerProvider isLoading={true}>
							<Stack spacing="medium">
								{Array.from({
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
								))}
							</Stack>
						</LoadingLayerProvider>
					)}
				</Stack>
			</Stack>
		</LoadingLayerProvider>
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
