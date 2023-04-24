/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Fragment, PropsWithChildren, useContext, useEffect } from 'react';

import { useAsync } from '@yemusic/hooks';
import { tracksService } from '@yemusic/services/v1';

import createSingletonAppContext from '../createSingletonAppContext';
import { onAddTracks, onSetTracks, TracksContext } from '../Tracks';

import { localPlaylistsAdapter, onSetPlaylists, playlistsAdapter } from './actions';
import { generateId } from './utils';

export interface IPlaylistEntity {
	_id: string;
	slug: string;
	name: string;
	isDefault: boolean;
	isLoadMore: boolean;
	isPrivate: boolean;
	tracks: {
		_id: string;
		trackId: string;
		addedAt: number;
	}[];
}
export interface IPlaylistsContextValue {
	isFetchingInitialPlaylists: boolean;
	playlists: IPlaylistEntity[];
}

export const defaultPlaylistSlugs = ['liked-tracks', 'recently-played', 'recently-searched'];

export const defaultPlaylists: IPlaylistEntity[] = [
	{
		_id: generateId(),
		slug: defaultPlaylistSlugs[0],
		name: 'Liked Tracks',
		isDefault: true,
		isLoadMore: false,
		isPrivate: true,
		tracks: [],
	},
	{
		_id: generateId(),
		slug: defaultPlaylistSlugs[1],
		name: 'Recently Played',
		isDefault: true,
		isLoadMore: false,
		isPrivate: true,
		tracks: [],
	},
	{
		_id: generateId(),
		slug: defaultPlaylistSlugs[2],
		name: 'Recently Searched',
		isDefault: true,
		isLoadMore: false,
		isPrivate: true,
		tracks: [],
	},
];

export const initialPlaylistsState: IPlaylistsContextValue = {
	isFetchingInitialPlaylists: true,
	playlists: [],
};

export const limitInitialPlaylistTracks = 10;

export const PlaylistsContext = createSingletonAppContext<IPlaylistsContextValue>(initialPlaylistsState);

export const PlaylistsProvider = PlaylistsContext.withProvider<PropsWithChildren>(({ children }) => {
	const { execute: onGetInitialPlaylists } = useAsync({
		delay: 750,
		handler: ({ trackIds }) => {
			return tracksService.getTracks({
				ids: trackIds,
			});
		},
		onListener: isPending => {
			PlaylistsContext.updateState(state => ({
				...state,
				isFetchingInitialPlaylists: isPending,
			}));
		},
		onSuccess({ items }) {
			onAddTracks({
				newTracks: items.map(track => ({
					id: track.id,
					title: track.title,
					author: track.author,
					thumbnail: track.thumbnail,
					duration: track.duration,
					source: [],
					isLiked: false,
					isLoadingAudio: false,
					isNowPlaying: false,
					captions: [],
					audioFormats: [],
				})),
			});
		},
	});

	const tracks = useContext(TracksContext.Context);
	const { playlists } = useContext(PlaylistsContext.Context);

	const likedTracks = playlists.find(playlist => playlist.slug === 'liked-tracks');

	useEffect(function getInitialPlaylistOnStartApp() {
		let playlists: IPlaylistEntity[] = [];

		try {
			const localPlaylists = localStorage.getItem('playlists');

			if (!localPlaylists) {
				throw new Error('No playlists found in localStorage');
			}

			playlists = localPlaylistsAdapter(JSON.parse(localPlaylists));

			const checkDefaultPlaylists = defaultPlaylists.every(defaultPlaylist => {
				return playlists.some(playlist => playlist.slug === defaultPlaylist.slug);
			});

			if (!checkDefaultPlaylists) {
				throw new Error('Default playlists not found in localStorage');
			}
		} catch (error) {
			console.log(error);
			playlists = defaultPlaylists;
			localStorage.setItem('playlists', JSON.stringify(defaultPlaylists));
		}

		const likedTracks = playlists.find(playlist => playlist.slug === 'liked-tracks')!;
		const recentlyPlayed = playlists.find(playlist => playlist.slug === 'recently-played')!;
		const recentlySearched = playlists.find(playlist => playlist.slug === 'recently-searched')!;

		likedTracks.isLoadMore = true;
		recentlyPlayed.isLoadMore = recentlyPlayed.tracks.length <= limitInitialPlaylistTracks;
		recentlySearched.isLoadMore = recentlySearched.tracks.length <= limitInitialPlaylistTracks;

		const initialTrackIds = [
			...likedTracks.tracks.map(track => track.trackId),
			...recentlyPlayed.tracks.map(track => track.trackId).slice(-limitInitialPlaylistTracks),
			...recentlySearched.tracks.map(track => track.trackId).slice(-limitInitialPlaylistTracks),
		].reduce<string[]>((acc, trackId) => {
			return acc.includes(trackId) ? acc : [...acc, trackId];
		}, []);

		onGetInitialPlaylists({
			trackIds: initialTrackIds,
		}).finally(() => {
			onSetPlaylists(playlists);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(
		function rewriteLocalStorageOnUpdatedPlaylists() {
			const localPlaylist = playlistsAdapter(playlists);
			localStorage.setItem('playlists', JSON.stringify(localPlaylist));
		},
		[playlists]
	);

	useEffect(
		function checkAndUpdateTracksWithLikedTracks() {
			if (likedTracks) {
				const cloneTracks = [...tracks];
				const likedTrackIds = likedTracks.tracks.map(track => track.trackId);

				const newTracks = cloneTracks.map(track => ({
					...track,
					isLiked: likedTrackIds.includes(track.id),
				}));

				onSetTracks({
					tracks: newTracks,
				});
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[tracks.length, likedTracks?.tracks.length]
	);

	return <Fragment>{children}</Fragment>;
});

export default PlaylistsProvider;
