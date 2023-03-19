import { z } from 'zod';

export type SearchResultsResponse = z.infer<typeof searchResultsResponseSchema>;

export const searchResultsResponseSchema = z.object({
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
