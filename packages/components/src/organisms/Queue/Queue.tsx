import { useContext, useMemo } from 'react';

import { PlaylistsContext, QueueContext, TracksContext } from '@yemusic/providers';

import { Group, Stack } from '../../atoms/Frame';
import { Typography } from '../../atoms/Typography';
import { TrackSecondary, useTrack, useTrackContextMenu } from '../Track';

export const Queue = () => {
	const tracks = useContext(TracksContext.Context);
	const { playlists } = useContext(PlaylistsContext.Context);
	const { queueTrackIds, currentTrackId, playlistSlug, isMixed } = useContext(QueueContext.Context);
	const { onOpenTrackContextMenu } = useTrackContextMenu();
	const { handleToggleLikeTrack, handleTogglePlaying } = useTrack();

	const playlist = playlists.find(playlist => playlist.slug === playlistSlug);

	const currentTrackPlaying = useMemo(() => {
		return tracks.find(track => track.id === currentTrackId);
	}, [tracks, currentTrackId]);

	const tracksQueue = useMemo(() => {
		return tracks
			.filter(track => queueTrackIds.includes(track.id) && track.id !== currentTrackId)
			.sort((a, b) => queueTrackIds.indexOf(a.id) - queueTrackIds.indexOf(b.id));
	}, [tracks, queueTrackIds, currentTrackId]);

	return (
		<Stack spacing="medium">
			<Typography variant="title" color="on-surface-variant">
				Đang phát
			</Typography>

			{currentTrackPlaying && (
				<TrackSecondary
					key={currentTrackPlaying.id}
					author={currentTrackPlaying.author}
					duration={currentTrackPlaying.duration}
					id={currentTrackPlaying.id}
					isLiked={currentTrackPlaying.isLiked}
					isNowPlaying={currentTrackPlaying.id === currentTrackId}
					isVisibleMoreOnlyOnHover={currentTrackPlaying.id !== currentTrackId}
					thumbnail={currentTrackPlaying.thumbnail}
					title={currentTrackPlaying.title}
					onOpenTrackContextMenu={({ position }) => {
						onOpenTrackContextMenu({
							desktopPosition: position,
							trackInfo: {
								author: currentTrackPlaying.author,
								id: currentTrackPlaying.id,
								isInQueue: queueTrackIds.includes(currentTrackPlaying.id),
								isLiked: currentTrackPlaying.isLiked,
								isNowPlaying: currentTrackPlaying.id === currentTrackId,
								thumbnail: currentTrackPlaying.thumbnail,
								title: currentTrackPlaying.title,
							},
						});
					}}
					onToggleLikeTrack={() =>
						handleToggleLikeTrack({
							trackId: currentTrackPlaying.id,
							isLike: !currentTrackPlaying.isLiked,
						})
					}
					onTogglePlaying={() =>
						handleTogglePlaying({
							trackId: currentTrackPlaying.id,
						})
					}
				/>
			)}

			{tracksQueue.length > 0 && (
				<Group alignItems="center" justifyContent="space-between">
					<Stack>
						<Typography
							style={{
								fontWeight: 600,
							}}
							variant="title"
							color="on-surface-variant"
						>
							Tiếp theo
						</Typography>

						{playlist && (
							<Typography variant="body" color="on-surface-variant">
								{isMixed ? `Danh sách kết hợp ${playlist.name}` : playlist.name}
							</Typography>
						)}
					</Stack>
				</Group>
			)}

			<Stack spacing="medium">
				{tracksQueue.map(track => (
					<TrackSecondary
						key={track.id}
						author={track.author}
						duration={track.duration}
						id={track.id}
						isLiked={track.isLiked}
						isNowPlaying={track.id === currentTrackId}
						isVisibleMoreOnlyOnHover={track.id !== currentTrackId}
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
			</Stack>
		</Stack>
	);
};

export default Queue;
