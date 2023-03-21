import { useCallback, useContext, useRef, useState } from 'react';

import {
	onAddTracks,
	onChangeSearchTerms,
	onSetIsSearching,
	onSetSearchResultsIds,
	SearchContext,
} from '@yemusic/providers';
import { searchService } from '@yemusic/services/v1';
import { useRouter } from 'next/router';

const searchDelay = 850;

export function useSearch() {
	const router = useRouter();
	const debounceRef = useRef<null | NodeJS.Timeout>(null);
	const [isFocused, setIsFocused] = useState(false);

	const { isSearching } = useContext(SearchContext.Context);

	const handleToggleFocusSearchInput = useCallback((isFocus: boolean) => {
		if (isFocus) {
			setIsFocused(true);

			if (!router.pathname.startsWith('/search')) {
				router.push('/search');
			}
		} else {
			setIsFocused(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChnageSearchTerms = useCallback((searchTerms: string) => {
		onChangeSearchTerms({
			searchTerms,
		});

		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
			if (isSearching) {
				onSetIsSearching({
					isSearching: false,
				});
			}
		}

		debounceRef.current = setTimeout(() => {
			if (searchTerms.trim() !== '') {
				onSetIsSearching({
					isSearching: true,
				});

				searchService
					.getResultsSearch({
						query: searchTerms,
					})
					.then(res => {
						onAddTracks({
							newTracks: res.items.map(result => ({
								id: result.id,
								title: result.title,
								author: result.author,
								thumbnail: result.thumbnail,
								duration: result.duration,
								source: [],
								audioUrl: '',
								isLiked: false,
								isLoadingAudio: false,
								isNowPlaying: false,
							})),
						});
						onSetSearchResultsIds({
							searchResultsIds: res.items.map(result => result.id),
						});
					})
					.finally(() => {
						onSetIsSearching({
							isSearching: false,
						});
					});
			}
		}, searchDelay);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		isFocused,
		isSearching,
		handleToggleFocusSearchInput,
		handleChnageSearchTerms,
	};
}
