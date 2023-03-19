import { Http } from '../infras/http.service';

export class BaseService {
	protected httpClient: Http;

	constructor() {
		const httpClient = new Http();

		httpClient.setCustomConfigs({
			baseUrl: 'https://api.yemusic.app/v1',
		});

		this.httpClient = httpClient;
	}
}
