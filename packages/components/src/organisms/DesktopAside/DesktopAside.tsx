import { useCallback, useContext, useMemo } from 'react';

import {
	onAddTrackIdToQueueIds,
	onSetCurrentTrackId,
	onToggleLikeTrack,
	onTogglePlaying,
	QueueContext,
	TracksContext,
} from '@yemusic/providers';

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

	const trackCurrent = useMemo(() => {
		return tracks.find(track => track.id === currentTrackId);
	}, [tracks, currentTrackId]);

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

	return (
		<Stack
			style={{
				height: '100%',
			}}
			spacing="medium"
		>
			<Group
				style={{
					height: 72,
				}}
				alignItems="center"
				horizontalPadding="small"
			>
				<Typography
					style={{
						fontWeight: 600,
					}}
					variant="title"
					size="large"
				>
					Danh sách phát
				</Typography>
			</Group>

			<Stack spacing="small" horizontalPadding="small">
				<Typography variant="title">Đang phát</Typography>

				<Stack>
					{trackCurrent && (
						<TrackSecondary
							key={trackCurrent.id}
							author={trackCurrent.author}
							duration={trackCurrent.duration}
							id={trackCurrent.id}
							isLiked={trackCurrent.isLiked}
							isNowPlaying
							thumbnail={trackCurrent.thumbnail}
							title={trackCurrent.title}
							onOpenTrackContextMenu={({ position }) => {
								onOpenTrackContextMenu({
									desktopPosition: position,
									trackInfo: {
										author: trackCurrent.author,
										id: trackCurrent.id,
										isInQueue: queueTrackIds.includes(trackCurrent.id),
										isLiked: trackCurrent.isLiked,
										isNowPlaying: trackCurrent.id === currentTrackId,
										thumbnail: trackCurrent.thumbnail,
										title: trackCurrent.title,
									},
								});
							}}
							onToggleLikeTrack={() => {
								onToggleLikeTrack({
									trackId: trackCurrent.id,
									isLiked: !trackCurrent.isLiked,
								});
							}}
							onTogglePlaying={() => handleTogglePlaying(trackCurrent.id)}
						/>
					)}
				</Stack>
			</Stack>

			<Stack spacing="small" horizontalPadding="small">
				<Typography variant="title">Tiếp theo</Typography>

				<Stack spacing="medium">
					{tracksQueue.map(track => (
						<TrackSecondary
							key={track.id}
							author={track.author}
							duration={track.duration}
							id={track.id}
							isLiked={track.isLiked}
							isVisibleMoreOnlyOnHover
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
							onTogglePlaying={() => handleTogglePlaying(track.id)}
							onToggleLikeTrack={() => {
								onToggleLikeTrack({
									trackId: track.id,
									isLiked: !track.isLiked,
								});
							}}
						/>
					))}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default DesktopAside;
