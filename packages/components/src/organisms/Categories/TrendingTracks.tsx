import { useContext, useMemo } from 'react';

import { CategoriesContext, QueueContext, TracksContext } from '@yemusic/providers';

import { Group, Stack } from '../../atoms/Frame';
import { LoadingLayer, LoadingLayerProvider } from '../../atoms/LoadingLayer';
import { Typography } from '../../atoms/Typography';
import { TrackSecondary, useTrack, useTrackContextMenu } from '../Track';

export const TrendingTracks = () => {
	const { isFetchingCategories, trending } = useContext(CategoriesContext.Context);
	const { queueTrackIds, currentTrackId } = useContext(QueueContext.Context);
	const tracks = useContext(TracksContext.Context);

	const { handleToggleLikeTrack, handleTogglePlaying } = useTrack();
	const { onOpenTrackContextMenu } = useTrackContextMenu();

	const trendingTracks = useMemo(() => {
		return tracks
			.filter(track => trending.includes(track.id))
			.sort((a, b) => {
				return trending.indexOf(a.id) - trending.indexOf(b.id);
			});
	}, [tracks, trending]);

	return (
		<LoadingLayerProvider isLoading={isFetchingCategories}>
			<Stack spacing="medium">
				<Group>
					<LoadingLayer loading="inherit">
						<Typography style={{ fontWeight: 500 }} variant="title" size="large" color="on-surface-variant">
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
		</LoadingLayerProvider>
	);
};

export default TrendingTracks;
