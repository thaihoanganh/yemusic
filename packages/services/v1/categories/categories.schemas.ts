import { z } from 'zod';

export const getCategoriesResponseSchema = z.object({
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
