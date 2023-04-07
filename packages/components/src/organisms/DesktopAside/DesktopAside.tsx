import { useCallback, useContext, useMemo } from 'react';

import {
	generateId,
	onAddTrackIdToQueueIds,
	onAddTrackToPlaylistWithSlug,
	onRemoveTrackFromPlaylistWithSlug,
	onSetCurrentTrackId,
	onTogglePlaying,
	QueueContext,
	TracksContext,
} from '@yemusic/providers';

import { UnstyledButton } from '../../atoms/Button';
import { Group, Stack } from '../../atoms/Frame';
import Typography from '../../atoms/Typography/Typography';
import { TrackSecondary } from '../Track';
import { useTrackContextMenu } from '../Track/hooks';

export const DesktopAside = () => {
	const tracks = useContext(TracksContext.Context);
	const { queueTrackIds, currentTrackId } = useContext(QueueContext.Context);
	const { onOpenTrackContextMenu } = useTrackContextMenu();

	const tracksQueue = useMemo(() => {
		return tracks
			.filter(track => queueTrackIds.includes(track.id))
			.sort((a, b) => queueTrackIds.indexOf(a.id) - queueTrackIds.indexOf(b.id));
	}, [tracks, queueTrackIds]);

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
		<Stack
			style={{
				height: '100%',
			}}
			spacing="xsmall"
			horizontalPadding="medium"
		>
			<Group
				style={{
					height: 72,
				}}
				alignItems="center"
				justifyContent="space-between"
			>
				<Stack>
					<Typography
						style={{
							fontWeight: 600,
						}}
						variant="title"
						size="large"
					>
						Danh sách phát
					</Typography>

					<Typography variant="body"></Typography>
				</Stack>

				<UnstyledButton>{/* <MoreHorizIcon /> */}</UnstyledButton>
			</Group>

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
						onToggleLikeTrack={() => handleToggleLikeTrack(track.id, !track.isLiked)}
						onTogglePlaying={() => handleTogglePlaying(track.id)}
					/>
				))}
			</Stack>
		</Stack>
	);
};

export default DesktopAside;
