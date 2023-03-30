import { z } from 'zod';

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

export const getSearchTracksResponseSchema = z.object({
	success: z.boolean(),
	data: z.object({
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
	error: z.any(),
});

export const getTrackInfoResponseSchema = z.object({
	success: z.boolean(),
	data: z.object({
		audio: z.array(
			z.object({
				itag: z.number(),
				url: z.string(),
			})
		),
	}),
	error: z.any(),
});
