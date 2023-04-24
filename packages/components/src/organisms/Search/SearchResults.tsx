import { useCallback, useContext, useMemo } from 'react';

import {
	PlaylistsContext,
	QueueContext,
	SearchContext,
	TracksContext,
	generateId,
	onAddTrackToPlaylist,
	onAddTracksToQueue,
	onEditPlaylist,
	onRemoveTrackFromPlaylist,
	onSetCurrentTrack,
	onTogglePlaying,
} from '@yemusic/providers';

import { UnstyledButton } from '../../atoms/Button';
import { Group, Stack } from '../../atoms/Frame';
import { LoadingLayer, LoadingLayerProvider } from '../../atoms/LoadingLayer';
import Typography from '../../atoms/Typography/Typography';
import { TrackSecondary } from '../Track';
import { useTrackContextMenu } from '../Track/hooks';

export const SearchResults = () => {
	const tracks = useContext(TracksContext.Context);
	const { isFetchingInitialPlaylists, playlists } = useContext(PlaylistsContext.Context);
	const { queueTrackIds, currentTrackId } = useContext(QueueContext.Context);
	const { isSearching, searchTerms, searchResultsIds } = useContext(SearchContext.Context);
	const { onOpenTrackContextMenu } = useTrackContextMenu();

	const searchResults = useMemo(() => {
		return tracks
			.filter(track => searchResultsIds.includes(track.id))
			.sort((a, b) => {
				return searchResultsIds.indexOf(a.id) - searchResultsIds.indexOf(b.id);
			});
	}, [searchResultsIds, tracks]);

	const recentlySearchedTracks = useMemo(() => {
		const recentlySearched = playlists.find(playlist => playlist.slug === 'recently-searched');

		if (recentlySearched) {
			const playlistTrackIds = recentlySearched.tracks.map(track => track.trackId).reverse() || [];

			return tracks
				.filter(track => playlistTrackIds.includes(track.id))
				.sort((a, b) => {
					return playlistTrackIds.indexOf(a.id) - playlistTrackIds.indexOf(b.id);
				});
		} else {
			return [];
		}
	}, [playlists, tracks]);

	const handleTogglePlaying = useCallback((trackId: string) => {
		onTogglePlaying({
			isPlaying: false,
		});
		onAddTracksToQueue({
			trackIds: [trackId],
		});
		onSetCurrentTrack({
			trackId,
		});
		onAddTrackToPlaylist({
			slug: 'recently-searched',
			track: {
				_id: generateId(),
				trackId,
				addedAt: Date.now(),
			},
		});
		onAddTrackToPlaylist({
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
			onAddTrackToPlaylist({
				slug: 'liked-tracks',
				track: {
					_id: generateId(),
					trackId,
					addedAt: Date.now(),
				},
			});
		} else {
			onRemoveTrackFromPlaylist({
				slug: 'liked-tracks',
				trackId,
			});
		}
	};

	if (searchTerms && (isSearching || searchResults.length > 0)) {
		return (
			<LoadingLayerProvider isLoading={isSearching}>
				<Stack spacing="medium">
					<Group alignItems="center" justifyContent="space-between">
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

					<Stack spacing="medium">
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
											author="author-placeholder"
											duration={0}
											id="id-placeholder"
											isLiked={false}
											thumbnail=""
											title="title-placeholder"
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
													ref: result.trackingId,
												},
											});
										}}
										onToggleLikeTrack={() => handleToggleLikeTrack(result.id, !result.isLiked)}
										onTogglePlaying={() => handleTogglePlaying(result.id)}
									/>
							  ))}
					</Stack>
				</Stack>
			</LoadingLayerProvider>
		);
	}

	if (isFetchingInitialPlaylists || recentlySearchedTracks.length > 0) {
		const handleClearRecentlySearchedTracks = () => {
			onEditPlaylist({
				slug: 'recently-searched',
				updatePlaylistData: {
					tracks: [],
				},
			});
		};

		return (
			<LoadingLayerProvider isLoading={isFetchingInitialPlaylists}>
				<Stack spacing="medium">
					<Group alignItems="center" justifyContent="space-between">
						<LoadingLayer loading="inherit">
							<Typography
								style={{
									fontWeight: 600,
								}}
								variant="title"
								size="large"
							>
								Tìm kiếm gần đây
							</Typography>
						</LoadingLayer>

						<LoadingLayer loading="inherit">
							<UnstyledButton onClick={handleClearRecentlySearchedTracks}>
								<Typography variant="label" size="medium" color="on-surface-variant">
									Xoá
								</Typography>
							</UnstyledButton>
						</LoadingLayer>
					</Group>

					<Stack spacing="medium">
						{isFetchingInitialPlaylists
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
							: recentlySearchedTracks.map(result => (
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
										onToggleLikeTrack={() => handleToggleLikeTrack(result.id, !result.isLiked)}
										onTogglePlaying={() => handleTogglePlaying(result.id)}
									/>
							  ))}
					</Stack>
				</Stack>
			</LoadingLayerProvider>
		);
	}

	return (
		<Group
			alignItems="center"
			style={{
				height: '100%',
			}}
		></Group>
	);
};

export default SearchResults;
