import { PropsWithChildren } from 'react';

import createSingletonAppContext from '../createAppProvider';

import { SearchEntity } from './entity';

export const initialSearchState: SearchEntity = {
	isSearching: false,
	searchTerms: '',
	searchResultsIds: [],
};

export const SearchContext = createSingletonAppContext<SearchEntity>(initialSearchState);

export const SearchProvider = ({ children }: PropsWithChildren) => {
	return <SearchContext.Provider>{children}</SearchContext.Provider>;
};

export default SearchProvider;
