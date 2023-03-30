import z from 'zod';

export type ITrackEntity = z.infer<typeof TrackEntity>;

export const TrackEntity = z.object({
	id: z.string(),
	title: z.string(),
	author: z.string(),
	thumbnail: z.string(),
	duration: z.number(),
	source: z.array(z.string()),
	audio: z.array(
		z.object({
			itag: z.number(),
			url: z.string(),
		})
	),
	isLiked: z.boolean(),
});
