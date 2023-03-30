import { z } from 'zod';

export type ICategoriesEntity = z.infer<typeof CategoriesSchema>;

export const CategoriesSchema = z.object({
	isFetchingCategories: z.boolean(),
	trending: z.array(z.string()),
});
