import { BaseService } from './base.service';

export class TrackService extends BaseService {
	getTracKInfo = async ({ trackId }: { trackId: string }) => {
		const response = await this.httpClient.get(`track/${trackId}`);
		return response.data;
	};
}

export const trackService = new TrackService();
