import { z } from 'zod';

import { BaseService } from './base.service';

export class SearchService extends BaseService {
	searchTracks = async ({ query }: { query: string }) => {
		try {
			const response = await this.httpClient.get(`search?q=${query}`);
			return this.transformSearchTracksResponse(response.data);
		} catch (error) {
			return {
				items: [],
				trackingId: '',
			};
		}
	};

	private transformSearchTracksResponse = (response: any) => {
		const searchTracksResponseSchema = this.baseApiSchema
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
					trackingId: z.string(),
				}),
			})
			.transform(response => response.data);

		return searchTracksResponseSchema.parse(response);
	};
}
