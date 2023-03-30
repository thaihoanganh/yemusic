import { z } from 'zod';

export type ISearchEntity = z.infer<typeof searchSchema>;

export const searchSchema = z.object({
	isSearching: z.boolean(),
	searchTerms: z.string(),
	searchResultsIds: z.array(z.string()),
});
