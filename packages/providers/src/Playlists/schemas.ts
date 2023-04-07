import { z } from 'zod';

export type IPlaylistEntity = z.infer<typeof playlistSchema>;

export type ILocalPlaylist = z.infer<typeof localPlaylistSchema>;

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

export const localPlaylistSchema = z.object({
	name: z.string(),
	isDefault: z.boolean(),
	tracks: z.array(
		z.object({
			trackId: z.string(),
			addedAt: z.number(),
		})
	),
});
