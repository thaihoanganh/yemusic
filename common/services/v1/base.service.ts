import { Http } from '../infras/http.service';

export class BaseService {
	protected httpClient: Http;

	constructor() {
		const httpClient = new Http();

		httpClient.setCustomConfigs({
			baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
		});

		this.httpClient = httpClient;
	}
}
