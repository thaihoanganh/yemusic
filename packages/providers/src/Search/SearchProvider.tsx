import { Fragment, PropsWithChildren } from 'react';

import createSingletonAppContext from '../createSingletonAppContext';

import { ISearchEntity } from './entity';

export const initialSearchState: ISearchEntity = {
	isSearching: false,
	searchTerms: '',
	searchResultsIds: [],
};

export const SearchContext = createSingletonAppContext<ISearchEntity>(initialSearchState);

export const SearchProvider = SearchContext.withProvider(({ children }: PropsWithChildren) => {
	return <Fragment>{children}</Fragment>;
});

export default SearchProvider;
