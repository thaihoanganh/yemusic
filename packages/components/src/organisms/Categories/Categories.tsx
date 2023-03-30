import { useCallback, useContext, useMemo } from 'react';

import {
	CategoriesContext,
	onAddTrackIdToQueueIds,
	onSetCurrentTrackId,
	onToggleLikeTrack,
	onTogglePlaying,
	QueueContext,
	TracksContext,
} from '@yemusic/providers';

import { Group, Stack } from '../../atoms/Frame';
import { LoadingLayer, LoadingLayerProvider } from '../../atoms/LoadingLayer';
import Typography from '../../atoms/Typography/Typography';
import { TrackSecondary } from '../Track';
import { useTrackContextMenu } from '../Track/hooks';

export const Categories = () => {
	const tracks = useContext(TracksContext.Context);
	const { isFetchingCategories, trending } = useContext(CategoriesContext.Context);
	const { queueTrackIds, currentTrackId } = useContext(QueueContext.Context);
	const { onOpenTrackContextMenu } = useTrackContextMenu();

	const trendingTracks = useMemo(() => {
		return tracks
			.filter(track => trending.includes(track.id))
			.sort((a, b) => {
				return trending.indexOf(a.id) - trending.indexOf(b.id);
			});
	}, [trending, tracks]);

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
		<LoadingLayerProvider isLoading={isFetchingCategories}>
			<Stack spacing="large">
				<Stack spacing="small">
					<Group>
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
										onToggleLikeTrack={() => {
											onToggleLikeTrack({
												trackId: track.id,
												isLiked: !track.isLiked,
											});
										}}
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
