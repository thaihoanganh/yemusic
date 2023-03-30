import { BaseService } from '../base.service';

import {
	getSearchTracksResponseSchema,
	getTrackInfoResponseSchema,
	getTracksCategoriesResponseSchema,
} from './track.schemas';

export class TrackService extends BaseService {
	getTracksCategories = async () => {
		try {
			const response = await this.httpClient.get('tracks');
			const { data } = getTracksCategoriesResponseSchema.parse(response.data);

			return data;
		} catch (error) {
			return {
				trending: {
					items: [],
				},
			};
		}
	};

	getTracKInfo = async ({ trackId }: { trackId: string }) => {
		try {
			const response = await this.httpClient.get(`tracks/${trackId}`);
			const { data } = getTrackInfoResponseSchema.parse(response.data);

			return data;
		} catch (error) {
			return {
				audio: [],
			};
		}
	};

	searchTracks = async ({ query }: { query: string }) => {
		try {
			const response = await this.httpClient.get(`tracks?q=${query}`);
			const { data } = getSearchTracksResponseSchema.parse(response.data);

			return data;
		} catch (error) {
			return {
				items: [],
			};
		}
	};
}

export const trackService = new TrackService();
