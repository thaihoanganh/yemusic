import { PlaylistsContext, defaultPlaylistSlugs } from './PlaylistsProvider';
import { ILocalPlaylist, IPlaylistEntity, localPlaylistSchema, playlistSchema } from './schemas';
import { generateId, generateSlug } from './utils';

export function localPlaylistsAdapter(playlistsData: unknown): IPlaylistEntity[] {
	try {
		const localPlaylists = localPlaylistSchema.array().parse(playlistsData);

		return localPlaylists.map(playlist => {
			if (defaultPlaylistSlugs.includes(generateSlug(playlist.name)) && playlist.isDefault === false) {
				throw new Error('Default playlist can not be changed to non-default');
			}

			return {
				_id: generateId(),
				slug: generateSlug(playlist.name),
				name: playlist.name,
				isDefault: playlist.isDefault,
				isPrivate: false,
				tracks: playlist.tracks.map(track => {
					if (track.addedAt > Date.now() || track.addedAt < 0) {
						throw new Error('Invalid addedAt value');
					}

					return {
						_id: generateId(),
						trackId: track.trackId,
						addedAt: track.addedAt,
					};
				}),
			};
		});
	} catch (error) {
		return [];
	}
}

export function playlistsAdapter(playlistsData: unknown): ILocalPlaylist[] {
	try {
		const playlists = playlistSchema.array().parse(playlistsData);

		return playlists.map(playlist => {
			if (defaultPlaylistSlugs.includes(playlist.slug) && playlist.isDefault === false) {
				throw new Error('Default playlist can not be changed to non-default');
			}

			return {
				name: playlist.name,
				isDefault: playlist.isDefault,
				tracks: playlist.tracks.map(track => {
					if (track.addedAt > Date.now() || track.addedAt < 0) {
						throw new Error('Invalid addedAt value');
					}

					return {
						trackId: track.trackId,
						addedAt: track.addedAt,
					};
				}),
			};
		});
	} catch (error) {
		return [];
	}
}

export function onSetPlaylists(playlists: IPlaylistEntity[]): void {
	const { updateState } = PlaylistsContext;

	updateState(playlists);
}

export function onAddPlaylist({ playlist }: { playlist: IPlaylistEntity }): void {
	const { updateState } = PlaylistsContext;

	updateState(prevState => [...prevState, playlist]);
}

export function onEditPlaylist({
	playlistId,
	updatePlaylistData,
}: {
	playlistId: string;
	updatePlaylistData: Partial<Pick<IPlaylistEntity, 'name' | 'isDefault'>>;
}): void {
	const { updateState } = PlaylistsContext;

	updateState(prevState => {
		const cloneState = [...prevState];

		const playlist = cloneState.find(playlist => playlist._id === playlistId);

		if (playlist) {
			Object.assign(playlist, updatePlaylistData);
		}

		return cloneState;
	});
}

export function onRemovePlaylist({ playlistId }: { playlistId: string }): void {
	const { updateState } = PlaylistsContext;

	updateState(prevState => prevState.filter(playlist => playlist._id !== playlistId));
}

export function onAddTrackToPlaylist({
	playlistId,
	track,
}: {
	playlistId: string;
	track: {
		_id: string;
		trackId: string;
		addedAt: number;
	};
}): void {
	const { updateState } = PlaylistsContext;

	updateState(prevState => {
		const cloneState = [...prevState];

		const playlist = cloneState.find(playlist => playlist._id === playlistId);

		if (playlist) {
			const trackIndex = playlist.tracks.findIndex(playlistTrack => playlistTrack.trackId === track.trackId);

			if (trackIndex !== -1) {
				playlist.tracks.splice(trackIndex, 1);
			}

			playlist.tracks.push(track);
		}

		return cloneState;
	});
}

export function onRemoveTrackFromPlaylist({ playlistId, trackId }: { playlistId: string; trackId: string }): void {
	const { updateState } = PlaylistsContext;

	updateState(prevState => {
		const cloneState = [...prevState];

		const playlist = cloneState.find(playlist => playlist._id === playlistId);

		if (playlist) {
			playlist.tracks = playlist.tracks.filter(track => track.trackId !== trackId);
		}

		return cloneState;
	});
}

export function onAddTrackToPlaylistWithSlug({
	slug,
	track,
}: {
	slug: string;
	track: {
		_id: string;
		trackId: string;
		addedAt: number;
	};
}): void {
	const { updateState } = PlaylistsContext;

	updateState(prevState => {
		const cloneState = [...prevState];

		const playlist = cloneState.find(playlist => playlist.slug === slug);

		if (playlist) {
			const trackIndex = playlist.tracks.findIndex(playlistTrack => playlistTrack.trackId === track.trackId);

			if (trackIndex !== -1) {
				playlist.tracks.splice(trackIndex, 1);
			}
			playlist.tracks.push(track);
		}

		return cloneState;
	});
}

export function onRemoveTrackFromPlaylistWithSlug({ slug, trackId }: { slug: string; trackId: string }): void {
	const { updateState } = PlaylistsContext;

	updateState(prevState => {
		const cloneState = [...prevState];

		const playlist = cloneState.find(playlist => playlist.slug === slug);

		if (playlist) {
			playlist.tracks = playlist.tracks.filter(track => track.trackId !== trackId);
		}

		return cloneState;
	});
}
