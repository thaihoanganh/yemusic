import classNames from 'classnames';

import { SearchIcon } from '../../atoms/Icons';
import { typographyStyles } from '../../atoms/Typography/Typography.css';

import { useSearch } from './hooks';
import { desktopSearchStyles } from './Search.css';

export const DesktopSearch = () => {
	const { isFocused, searchTerms, handleToggleFocusSearchInput, handleChnageSearchTerms } = useSearch();

	return (
		<label className={classNames(desktopSearchStyles.search, isFocused && desktopSearchStyles.searchFocused)}>
			<SearchIcon />
			<input
				className={classNames(desktopSearchStyles.searchInput, typographyStyles['body']['large'])}
				type="text"
				placeholder="Tìm kiếm"
				value={searchTerms}
				onFocus={() => handleToggleFocusSearchInput(true)}
				onBlur={() => handleToggleFocusSearchInput(false)}
				onChange={e => handleChnageSearchTerms(e.target.value)}
			/>
		</label>
	);
};

export default DesktopSearch;
