import { BaseService } from '../base.service';

import { getTracksCategoriesResponseSchema, GetTrackInfoResponse, GetTracksCategoriesResponse } from './track.schemas';

export class TrackService extends BaseService {
	getTracksCategories = async () => {
		try {
			const response = await this.httpClient.get<GetTracksCategoriesResponse>('tracks');
			getTracksCategoriesResponseSchema.parse(response.data);

			return response.data.data;
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
			const response = await this.httpClient.get<GetTrackInfoResponse>(`tracks/${trackId}`);
			return response.data.data;
		} catch (error) {
			return {
				info: {
					audioUrl: '',
				},
				relatedTracks: {
					items: [],
				},
			};
		}
	};
}

export const trackService = new TrackService();
