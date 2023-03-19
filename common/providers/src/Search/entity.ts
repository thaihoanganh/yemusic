export interface SearchEntity {
	/**
	 * The search terms used to find the results.
	 */
	isSearching: boolean;
	/**
	 * The search terms used to find the results.
	 */
	searchTerms: string;
	/**
	 * Ids of the search results.
	 */
	searchResultsIds: string[];
}
