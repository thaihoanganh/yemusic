import { SearchContext } from './SearchProvider';

export function onChangeSearchTerms({ searchTerms }: { searchTerms: string }) {
	const { updateState } = SearchContext;

	updateState(prevState => ({
		...prevState,
		searchTerms,
	}));
}

export function onSetIsSearching({ isSearching }: { isSearching: boolean }) {
	const { updateState } = SearchContext;

	updateState(prevState => ({
		...prevState,
		isSearching,
	}));
}

export function onSetSearchResultsIds({ searchResultsIds }: { searchResultsIds: string[] }) {
	const { updateState } = SearchContext;

	updateState(prevState => ({
		...prevState,
		searchResultsIds,
	}));
}
