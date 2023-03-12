import { BaseService } from './base.service';

export class SearchService extends BaseService {
	getSearchResults = async ({ query }: { query: string }) => {
		const response = await this.httpClient.get(`search?q=${query}`);
		return response.data;
	};
}

export const searchService = new SearchService();
