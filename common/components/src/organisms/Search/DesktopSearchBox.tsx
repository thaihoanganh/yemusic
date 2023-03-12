/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';

import { useSearch } from '@yemusic/hooks';
import { searchService } from '@yemusic/services/v1';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import { SearchIcon } from '../../atoms/Icons';
import { typographyVariants } from '../../atoms/Typography/Typography.css';

import { desktopSearchBoxStyles } from './Search.css';

export const DesktopSearchBox = () => {
	const router = useRouter();
	const debounceRef = useRef<null | NodeJS.Timeout>(null);
	const [isFocused, setIsFocused] = useState(false);

	const { isSearching, setIsSearching, setSearchResults } = useSearch();

	const handleFocusSearchInput = () => {
		setIsFocused(true);

		if (!router.pathname.startsWith('/search')) {
			router.push('/search');
		}
	};

	const handleBlurSearchInput = () => {
		setIsFocused(false);
	};

	const handleSearchTermChange = (e: any) => {
		const searchValue = e.target.value;

		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
			if (isSearching) {
				setIsSearching(false);
			}
		}

		debounceRef.current = setTimeout(() => {
			if (searchValue.trim() !== '') {
				setIsSearching(true);

				searchService
					.getSearchResults({ query: searchValue })
					.then((res: any) => {
						const searchResults = res.data.items.map((result: any) => ({
							id: result.id,
							author: result.channel.name,
							title: result.title,
							thumbnail: result.thumbnail,
							duration: result.duration,
							isPlaying: false,
						}));
						setSearchResults(searchResults);
						setIsSearching(true);
					})
					.finally(() => {
						setIsSearching(false);
					});
			}
		}, 750);
	};

	return (
		<label className={classNames(desktopSearchBoxStyles.search, isFocused && desktopSearchBoxStyles.searchFocused)}>
			<SearchIcon />
			<input
				className={classNames(desktopSearchBoxStyles.searchInput, typographyVariants['body']['large'])}
				type="text"
				placeholder="Tìm kiếm"
				onFocus={handleFocusSearchInput}
				onBlur={handleBlurSearchInput}
				onChange={handleSearchTermChange}
			/>
		</label>
	);
};

export default DesktopSearchBox;
