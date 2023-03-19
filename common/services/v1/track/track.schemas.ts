import { z } from 'zod';

export type GetTracksCategoriesResponse = z.infer<typeof getTracksCategoriesResponseSchema>;
export type GetTrackInfoResponse = z.infer<typeof getTrackInfoResponseSchema>;

export const getTracksCategoriesResponseSchema = z.object({
	success: z.boolean(),
	data: z.object({
		trending: z.object({
			items: z.array(
				z.object({
					id: z.string(),
					title: z.string(),
					author: z.string(),
					thumbnail: z.string(),
					duration: z.number(),
				})
			),
		}),
	}),
	error: z.any(),
});

export const getTrackInfoResponseSchema = z.object({
	success: z.boolean(),
	data: z.object({
		info: z.object({
			audioUrl: z.string(),
		}),
		relatedTracks: z.object({
			items: z.array(
				z.object({
					id: z.string(),
					title: z.string(),
					author: z.string(),
					thumbnail: z.string(),
					duration: z.number(),
				})
			),
		}),
	}),
	error: z.any(),
});
