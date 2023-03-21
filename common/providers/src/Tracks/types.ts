import z from 'zod';

export const TrackEntity = z.object({
	id: z.string(),
	title: z.string(),
	author: z.string(),
	thumbnail: z.string(),
	duration: z.number(),
	source: z.array(z.string()),
	audioUrl: z.string(),
	isLiked: z.boolean(),
});

export type ITrackEntity = z.infer<typeof TrackEntity>;
