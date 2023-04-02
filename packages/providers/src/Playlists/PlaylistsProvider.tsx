import { Fragment, PropsWithChildren, useContext, useEffect } from 'react';

import { trackService } from '@yemusic/services/v1';

import createSingletonAppContext from '../createSingletonAppContext';
import { onAddTracks, onSetTracks, TracksContext } from '../Tracks';

import { localPlaylistsAdapter, onSetPlaylists, playlistsAdapter } from './actions';
import { IPlaylistEntity } from './schemas';
import { generateId } from './utils';

export const defaultPlaylistSlugs = ['liked-tracks', 'recently-played', 'recently-searched'];

export const defaultPlaylists: IPlaylistEntity[] = [
	{
		_id: generateId(),
		slug: defaultPlaylistSlugs[0],
		name: 'Liked Tracks',
		isDefault: true,
		isPrivate: true,
		tracks: [],
	},
	{
		_id: generateId(),
		slug: defaultPlaylistSlugs[1],
		name: 'Recently Played',
		isDefault: true,
		isPrivate: true,
		tracks: [],
	},
	{
		_id: generateId(),
		slug: defaultPlaylistSlugs[2],
		name: 'Recently Searched',
		isDefault: true,
		isPrivate: true,
		tracks: [],
	},
];

export const initialPlaylistsState: IPlaylistEntity[] = [];
export const PlaylistsContext = createSingletonAppContext<IPlaylistEntity[]>(initialPlaylistsState);

export const PlaylistsProvider = PlaylistsContext.withProvider<PropsWithChildren>(({ children }) => {
	const tracks = useContext(TracksContext.Context);
	const playlists = useContext(PlaylistsContext.Context);

	const likedTracks = playlists.find(playlist => playlist.slug === 'liked-tracks');

	useEffect(() => {
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
			playlists = defaultPlaylists;
			localStorage.setItem('playlists', JSON.stringify(defaultPlaylists));
		}

		const trackIds = playlists
			.reduce<string[]>((acc, playlist) => {
				return [...acc, ...playlist.tracks.map(track => track.trackId)];
			}, [])
			.reduce<string[]>((acc, trackId) => {
				return acc.includes(trackId) ? acc : [...acc, trackId];
			}, []);

		trackService
			.getTracksByIds({
				ids: trackIds,
			})
			.then(response => {
				onAddTracks({
					newTracks: response.items.map(track => ({
						id: track.id,
						title: track.title,
						author: track.author,
						thumbnail: track.thumbnail,
						duration: track.duration,
						source: [],
						audio: [],
						isLiked: false,
						isLoadingAudio: false,
						isNowPlaying: false,
					})),
				});
			});

		onSetPlaylists(playlists);
	}, []);

	useEffect(() => {
		const localPlaylist = playlistsAdapter(playlists);
		localStorage.setItem('playlists', JSON.stringify(localPlaylist));
	}, [playlists]);

	useEffect(() => {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tracks.length, likedTracks?.tracks.length]);

	return <Fragment>{children}</Fragment>;
});

export default PlaylistsProvider;
