import { z } from 'zod';

import { BaseService } from './base.service';

export class TracksService extends BaseService {
	getTracks = async ({ ids }: { ids: string[] }) => {
		try {
			const response = await this.httpClient.get(`tracks?ids=${ids.join(',')}`);
			return this.transformGetTracksResponse(response.data);
		} catch (error) {
			return {
				items: [],
				trackingId: '',
			};
		}
	};

	getTrackDetails = async ({ trackId, ref }: { trackId: string; ref?: string }) => {
		try {
			const getTrackDetailsQuery = ref ? `?ref=${ref}` : '';
			const response = await this.httpClient.get(`tracks/${trackId}${getTrackDetailsQuery}`);
			return this.transformGetTrackDetailsResponse(response.data);
		} catch (error) {
			return {
				captions: [],
				audioFormats: [],
			};
		}
	};

	private transformGetTracksResponse = (response: any) => {
		const getTracksResponseSchema = this.baseApiSchema
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

		return getTracksResponseSchema.parse(response);
	};

	private transformGetTrackDetailsResponse = (response: any) => {
		const getTrackDetailsResponseSchema = this.baseApiSchema
			.extend({
				data: z.object({
					captions: z.array(
						z.object({
							baseUrl: z.string(),
							languageCode: z.string(),
						})
					),
					audioFormats: z.array(
						z.object({
							mimeType: z.string(),
							itag: z.number(),
							url: z.string(),
						})
					),
				}),
			})
			.transform(response => response.data);

		return getTrackDetailsResponseSchema.parse(response);
	};
}
