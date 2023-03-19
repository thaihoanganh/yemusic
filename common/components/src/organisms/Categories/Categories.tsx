import { useCallback, useContext, useMemo } from 'react';

import {
	CategoriesContext,
	onAddTrackIdToQueueIds,
	onSetCurrentTrackId,
	onTogglePlaying,
	PlayerControlsContext,
	QueueContext,
	TracksContext,
} from '@yemusic/providers';

import { Group, Stack } from '../../atoms/Frame';
import { LoadingLayer, LoadingLayerProvider } from '../../atoms/LoadingLayer';
import Typography from '../../atoms/Typography/Typography';
import { Track } from '../Track';

export const Categories = () => {
	const tracks = useContext(TracksContext.initial);
	const { isFetchingCategories, trending } = useContext(CategoriesContext.initial);
	const { currentTrackId } = useContext(QueueContext.initial);
	const { isPlaying } = useContext(PlayerControlsContext.initial);

	const trendingTracks = useMemo(() => {
		return tracks
			.filter(track => trending.includes(track.id))
			.sort((a, b) => {
				return trending.indexOf(a.id) - trending.indexOf(b.id);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trending]);

	const handleClickTrack = useCallback(({ trackId }: { trackId: string }) => {
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
		<LoadingLayerProvider isLoading={isFetchingCategories}>
			<Stack spacing="large" verticalPadding="medium" horizontalPadding="large">
				<Stack spacing="small">
					<Group>
						<LoadingLayer loading="inherit">
							<Typography variant="title">Trending</Typography>
						</LoadingLayer>
					</Group>

					<Stack>
						{isFetchingCategories
							? Array.from({
									length: 20,
							  }).map((_, index) => (
									<div
										key={index}
										style={{
											pointerEvents: 'none',
										}}
									>
										<Track trackId="" title="loading" author="loading" nowPlaying={false} isPlaying={false} />
									</div>
							  ))
							: trendingTracks.map(track => (
									<Track
										key={track.id}
										author={track.author}
										duration={String(track.duration)}
										nowPlaying={track.id === currentTrackId}
										isPlaying={track.id === currentTrackId && isPlaying}
										trackId={track.id}
										title={track.title}
										thumbnail={track.thumbnail}
										onTogglePlaying={() =>
											handleClickTrack({
												trackId: track.id,
											})
										}
									/>
							  ))}
					</Stack>
				</Stack>
			</Stack>
		</LoadingLayerProvider>
	);
};

export default Categories;
