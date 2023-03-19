import classNames from 'classnames';

import { SearchIcon } from '../../atoms/Icons';
import { typographyVariants } from '../../atoms/Typography/Typography.css';

import { useSearch } from './hooks';
import { desktopSearchBoxStyles } from './Search.css';

export const DesktopSearchBox = () => {
	const { isFocused, handleToggleFocusSearchInput, handleChnageSearchTerms } = useSearch();

	return (
		<label className={classNames(desktopSearchBoxStyles.search, isFocused && desktopSearchBoxStyles.searchFocused)}>
			<SearchIcon />
			<input
				className={classNames(desktopSearchBoxStyles.searchInput, typographyVariants['body']['large'])}
				type="text"
				placeholder="Tìm kiếm"
				onFocus={() => handleToggleFocusSearchInput(true)}
				onBlur={() => handleToggleFocusSearchInput(false)}
				onChange={e => handleChnageSearchTerms(e.target.value)}
			/>
		</label>
	);
};

export default DesktopSearchBox;
