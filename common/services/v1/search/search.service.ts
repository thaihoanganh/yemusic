import { BaseService } from '../base.service';

import { SearchResultsResponse, searchResultsResponseSchema } from './search.schemas';

export class SearchService extends BaseService {
	getResultsSearch = async ({ query }: { query: string }) => {
		try {
			const response = await this.httpClient.get<SearchResultsResponse>(`search?q=${query}`);
			searchResultsResponseSchema.parse(response.data);

			return response.data.data;
		} catch (error) {
			return {
				items: [],
			};
		}
	};
}

export const searchService = new SearchService();
