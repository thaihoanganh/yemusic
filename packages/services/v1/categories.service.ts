import { z } from 'zod';

import { BaseService } from './base.service';

export class CategoriesService extends BaseService {
	getTrendingTracks = async () => {
		try {
			const response = await this.httpClient.get(`categories/trending`);
			return this.transformGetTrendingTracksResponse(response.data);
		} catch (error) {
			return {
				items: [],
			};
		}
	};

	private transformGetTrendingTracksResponse = (response: any) => {
		const getTrendingTracksResponseSchema = this.baseApiSchema
			.extend({
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
			})
			.transform(response => response.data);

		return getTrendingTracksResponseSchema.parse(response);
	};
}
