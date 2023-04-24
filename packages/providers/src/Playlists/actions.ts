import { z } from 'zod';

import { IPlaylistEntity, PlaylistsContext, defaultPlaylistSlugs } from './PlaylistsProvider';
import { generateId, generateSlug } from './utils';

export const playlistSchema = z.object({
	_id: z.string(),
	slug: z.string(),
	name: z.string(),
	isDefault: z.boolean(),
	isPrivate: z.boolean(),
	tracks: z.array(
		z.object({
			_id: z.string(),
			trackId: z.string(),
			addedAt: z.number(),
		})
	),
});

const localPlaylistSchema = z.object({
	name: z.string(),
	isDefault: z.boolean(),
	tracks: z.array(
		z.object({
			trackId: z.string(),
			addedAt: z.number(),
		})
	),
});

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
				isLoadMore: false,
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

export function playlistsAdapter(playlistsData: unknown): z.infer<typeof localPlaylistSchema>[] {
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
	const { updateStateWithImmer } = PlaylistsContext;

	updateStateWithImmer(prevState => {
		prevState.playlists = playlists;
	});
}

export function onAddPlaylist({ playlist }: { playlist: IPlaylistEntity }): void {
	const { updateStateWithImmer } = PlaylistsContext;

	updateStateWithImmer(state => {
		state.playlists.push(playlist);
	});
}

export function onEditPlaylist({
	slug,
	updatePlaylistData,
}: {
	slug: string;
	updatePlaylistData: Partial<Pick<IPlaylistEntity, 'name' | 'isDefault' | 'tracks'>>;
}): void {
	const { updateStateWithImmer } = PlaylistsContext;

	updateStateWithImmer(state => {
		const playlistIndex = state.playlists.findIndex(playlist => playlist.slug === slug);

		if (playlistIndex !== -1) {
			state.playlists[playlistIndex] = {
				...state.playlists[playlistIndex],
				...updatePlaylistData,
			};
		}
	});
}

export function onRemovePlaylist({ playlistId }: { playlistId: string }): void {
	const { updateStateWithImmer } = PlaylistsContext;

	updateStateWithImmer(state => {
		const playlistIndex = state.playlists.findIndex(playlist => playlist._id === playlistId);

		if (playlistIndex !== -1) {
			state.playlists.splice(playlistIndex, 1);
		}
	});
}

export function onAddTrackToPlaylist({
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
	const { updateStateWithImmer } = PlaylistsContext;

	updateStateWithImmer(prevState => {
		const playlist = prevState.playlists.find(playlist => playlist.slug === slug);

		if (playlist) {
			const trackIndex = playlist.tracks.findIndex(playlistTrack => playlistTrack.trackId === track.trackId);

			if (trackIndex !== -1) {
				playlist.tracks.splice(trackIndex, 1);
			}

			playlist.tracks.push(track);
		}
	});
}

export function onRemoveTrackFromPlaylist({ slug, trackId }: { slug: string; trackId: string }): void {
	const { updateStateWithImmer } = PlaylistsContext;

	updateStateWithImmer(prevState => {
		const playlist = prevState.playlists.find(playlist => playlist.slug === slug);

		if (playlist) {
			const trackIndex = playlist.tracks.findIndex(playlistTrack => playlistTrack.trackId === trackId);

			if (trackIndex !== -1) {
				playlist.tracks.splice(trackIndex, 1);
			}
		}
	});
}
