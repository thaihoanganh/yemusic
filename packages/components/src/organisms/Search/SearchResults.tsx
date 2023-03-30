import { useCallback, useContext, useMemo } from 'react';

import {
	onAddTrackIdToQueueIds,
	onSetCurrentTrackId,
	onToggleLikeTrack,
	onTogglePlaying,
	QueueContext,
	SearchContext,
	TracksContext,
} from '@yemusic/providers';

import { Group, Stack } from '../../atoms/Frame';
import { LoadingLayer, LoadingLayerProvider } from '../../atoms/LoadingLayer';
import Typography from '../../atoms/Typography/Typography';
import { TrackSecondary } from '../Track';
import { useTrackContextMenu } from '../Track/hooks';

export const SearchResults = () => {
	const tracks = useContext(TracksContext.Context);
	const { isSearching, searchResultsIds } = useContext(SearchContext.Context);
	const { queueTrackIds, currentTrackId } = useContext(QueueContext.Context);
	const { onOpenTrackContextMenu } = useTrackContextMenu();

	const searchResults = useMemo(() => {
		return tracks
			.filter(track => searchResultsIds.includes(track.id))
			.sort((a, b) => {
				return searchResultsIds.indexOf(a.id) - searchResultsIds.indexOf(b.id);
			});
	}, [searchResultsIds, tracks]);

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
		<LoadingLayerProvider isLoading={isSearching}>
			<Stack spacing="large">
				<Group>
					<LoadingLayer loading="inherit">
						<Typography
							style={{
								fontWeight: 600,
							}}
							variant="title"
							size="large"
						>
							{isSearching || searchResults.length > 0 ? 'kết quả tìm kiếm' : null}
						</Typography>
					</LoadingLayer>
				</Group>

				<Stack spacing="small">
					{isSearching
						? Array.from({
								length: 20,
						  }).map((_, index) => (
								<div
									key={index}
									style={{
										pointerEvents: 'none',
									}}
								>
									<TrackSecondary
										key={index}
										author="author"
										duration={0}
										id="id"
										isLiked={false}
										thumbnail=""
										title="title"
									/>
								</div>
						  ))
						: searchResults.map(result => (
								<TrackSecondary
									key={result.id}
									author={result.author}
									duration={result.duration}
									id={result.id}
									isLiked={result.isLiked}
									isNowPlaying={currentTrackId === result.id}
									isVisibleDuration
									thumbnail={result.thumbnail}
									title={result.title}
									onOpenTrackContextMenu={({ position }) => {
										onOpenTrackContextMenu({
											desktopPosition: position,
											trackInfo: {
												author: result.author,
												id: result.id,
												isInQueue: queueTrackIds.includes(result.id),
												isLiked: result.isLiked,
												isNowPlaying: currentTrackId === result.id,
												thumbnail: result.thumbnail,
												title: result.title,
											},
										});
									}}
									onTogglePlaying={() => handleTogglePlaying(result.id)}
									onToggleLikeTrack={() => {
										onToggleLikeTrack({
											trackId: result.id,
											isLiked: !result.isLiked,
										});
									}}
								/>
						  ))}
				</Stack>
			</Stack>
		</LoadingLayerProvider>
	);
};

export default SearchResults;
