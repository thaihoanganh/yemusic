import { useCallback, useContext, useMemo } from 'react';

import {
	onAddTrackIdToQueueIds,
	onSetCurrentTrackId,
	onTogglePlaying,
	PlayerControlsContext,
	QueueContext,
	SearchContext,
	TracksContext,
} from '@yemusic/providers';

import { Group, Stack } from '../../atoms/Frame';
import { LoadingLayer, LoadingLayerProvider } from '../../atoms/LoadingLayer';
import Typography from '../../atoms/Typography/Typography';
import { Track } from '../Track';

export const DesktopSearchResults = () => {
	const tracks = useContext(TracksContext.Context);
	const { isSearching, searchResultsIds } = useContext(SearchContext.Context);
	const { currentTrackId } = useContext(QueueContext.Context);
	const { isPlaying } = useContext(PlayerControlsContext.Context);

	const searchResults = useMemo(() => {
		return tracks.filter(track => searchResultsIds.includes(track.id));
	}, [searchResultsIds, tracks]);

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
		<LoadingLayerProvider isLoading={isSearching}>
			<Stack spacing="medium" horizontalPadding="large" verticalPadding="large">
				<Stack spacing="small">
					<Group>
						<LoadingLayer loading="inherit">
							<Typography variant="title">
								{isSearching || searchResults.length > 0 ? 'kết quả tìm kiếm' : null}
							</Typography>
						</LoadingLayer>
					</Group>

					<Stack>
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
										<Track trackId="" title="loading" author="loading" nowPlaying={false} isPlaying={false} />
									</div>
							  ))
							: searchResults.map(result => (
									<Track
										key={result.id}
										author={result.author}
										duration={String(result.duration)}
										nowPlaying={result.id === currentTrackId}
										isPlaying={result.id === currentTrackId && isPlaying}
										trackId={result.id}
										title={result.title}
										thumbnail={result.thumbnail}
										onTogglePlaying={() => handleClickTrack({ trackId: result.id })}
									/>
							  ))}
					</Stack>
				</Stack>
			</Stack>
		</LoadingLayerProvider>
	);
};

export default DesktopSearchResults;
