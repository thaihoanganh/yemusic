/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePlayerControls, useQueue, useSearch } from '@yemusic/hooks';
import { trackService } from '@yemusic/services/v1';

import { Group, Stack } from '../../atoms/Frame';
import { LoadingLayer, LoadingLayerProvider } from '../../atoms/LoadingLayer';
import Typography from '../../atoms/Typography/Typography';
import { Track } from '../Track';

export interface DesktopSearchResultsProps {
	isLoading?: boolean;
}

export const DesktopSearchResults = ({ isLoading }: DesktopSearchResultsProps) => {
	const { isSearching, searchResults } = useSearch();
	const { nowPlayingTrackId, onAddTrack, setNowPlayingTrackId, onUpdateTrack } = useQueue();
	const { isPlaying, setAudioUrl, setDuration, setIsPlaying } = usePlayerControls();

	const handleClickTrack = ({ trackIndex }: { trackIndex: number }) => {
		const trackSelected = searchResults[trackIndex];

		setDuration({
			duration: trackSelected.duration,
		});

		onAddTrack({
			track: {
				id: trackSelected.id,
				author: trackSelected.author,
				title: trackSelected.title,
				thumbnail: trackSelected.thumbnail,
				duration: trackSelected.duration,
				audioUrl: '',
				isLiked: false,
				isLoadingAudio: true,
				isPlayed: false,
			},
		});

		setNowPlayingTrackId({ trackId: trackSelected.id });

		trackService.getTracKInfo({ trackId: trackSelected.id }).then((res: any) => {
			onUpdateTrack({
				trackId: trackSelected.id,
				updateData: {
					audioUrl: res.data.formats.url,
					isLoadingAudio: false,
				},
			});

			setAudioUrl({
				audioUrl: res.data.formats.url,
			});

			setIsPlaying({
				isPlaying: true,
			});
		});
	};

	return (
		<LoadingLayerProvider isLoading={isLoading}>
			<Stack spacing="medium" horizontalPadding="large" verticalPadding="large">
				<Stack spacing="small">
					<Group>
						<LoadingLayer loading="inherit">
							<Typography variant="title">kết quả tìm kiếm</Typography>
						</LoadingLayer>
					</Group>

					<Stack>
						{isSearching
							? Array.from({ length: 10 }).map((_, index) => (
									<Track key={index} isLoading artist="" nowPlaying={false} isPlaying={false} title="" thumbnail="" />
							  ))
							: searchResults.map((result, index) => (
									<Track
										key={result.id}
										artist={result.author}
										duration={String(result.duration)}
										nowPlaying={nowPlayingTrackId === result.id}
										isPlaying={nowPlayingTrackId === result.id && isPlaying}
										title={result.title}
										thumbnail={result.thumbnail}
										onTogglePlay={() => handleClickTrack({ trackIndex: index })}
									/>
							  ))}
					</Stack>
				</Stack>
			</Stack>
		</LoadingLayerProvider>
	);
};

export default DesktopSearchResults;
