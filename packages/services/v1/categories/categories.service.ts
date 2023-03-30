import { BaseService } from '../base.service';

import { getCategoriesResponseSchema } from './categories.schemas';

export class CategoriesService extends BaseService {
	getTracksCategories = async () => {
		try {
			const response = await this.httpClient.get('categories');
			const { data } = getCategoriesResponseSchema.parse(response.data);

			return data;
		} catch (error) {
			return {
				trending: {
					items: [],
				},
			};
		}
	};
}

export const categoriesService = new CategoriesService();
