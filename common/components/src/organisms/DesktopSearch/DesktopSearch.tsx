import { useState } from 'react';

import { useRouter } from 'next/router';

import { SearchIcon } from '../../atoms/Icons';
import { typographyVariants } from '../../atoms/Typography/Typography.css';

import { desktopSearchStyles } from './DesktopSearch.css';

export const DesktopSearch = () => {
	const router = useRouter();
	const [isFocused, setIsFocused] = useState(false);

	const handleFocusSearchInput = () => {
		setIsFocused(true);
		router.push('/search');
	};

	const handleBlurSearchInput = () => {
		setIsFocused(false);
	};

	return (
		<label
			className={[desktopSearchStyles.search, isFocused && desktopSearchStyles.searchFocused].filter(Boolean).join(' ')}
		>
			<SearchIcon />
			<input
				className={[desktopSearchStyles.searchInput, typographyVariants['body']['large']].join(' ')}
				type="text"
				placeholder="Tìm kiếm"
				onFocus={handleFocusSearchInput}
				onBlur={handleBlurSearchInput}
			/>
		</label>
	);
};

export default DesktopSearch;
