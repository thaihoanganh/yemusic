import React, { useContext, useMemo } from 'react';

import { PlayerControlsContext, QueueContext, TracksContext } from '@yemusic/providers';

import { Group, Stack } from '../../atoms/Frame';
import Typography from '../../atoms/Typography/Typography';
import { Track } from '../Track';

export const DesktopAside = () => {
	const tracks = useContext(TracksContext.Context);
	const { queueTrackIds, currentTrackId } = useContext(QueueContext.Context);
	const { isPlaying } = useContext(PlayerControlsContext.Context);

	const tracksQueue = useMemo(() => {
		return tracks
			.filter(track => queueTrackIds.includes(track.id))
			.sort((a, b) => {
				const aIndex = queueTrackIds.indexOf(a.id);
				const bIndex = queueTrackIds.indexOf(b.id);

				return aIndex - bIndex;
			});
	}, [tracks, queueTrackIds]);

	const trackCurrent = useMemo(() => {
		return tracks.find(track => track.id === currentTrackId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTrackId]);

	return (
		<Stack spacing="medium">
			<Group
				style={{
					height: 72,
				}}
				alignItems="center"
				horizontalPadding="small"
			>
				<Typography variant="title" size="large">
					Danh sách phát
				</Typography>
			</Group>

			<Stack spacing="small" horizontalPadding="small">
				<Typography variant="title">Đang phát</Typography>

				<Stack>
					{trackCurrent && (
						<Track
							key={trackCurrent.id}
							title={trackCurrent.title}
							author={trackCurrent.author}
							thumbnail={trackCurrent.thumbnail}
							trackId={trackCurrent.id}
							isPlaying={isPlaying}
							nowPlaying
						/>
					)}
				</Stack>
			</Stack>

			<Stack spacing="small" horizontalPadding="small">
				<Typography variant="title">Tiếp theo</Typography>

				<Stack>
					{tracksQueue.map(track => (
						<Track
							key={track.id}
							title={track.title}
							author={track.author}
							thumbnail={track.thumbnail}
							trackId={track.id}
							isPlaying={track.id === currentTrackId && isPlaying}
						/>
					))}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default DesktopAside;
