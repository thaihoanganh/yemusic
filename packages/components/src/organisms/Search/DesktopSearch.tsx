import { useRef } from 'react';

import { useOnClickOutside } from '@yemusic/hooks';
import classNames from 'classnames';

import { UnstyledButton } from '../../atoms/Button';
import { CloseIcon, SearchIcon } from '../../atoms/Icons';
import { typographyStyles } from '../../atoms/Typography/Typography.css';

import { useSearch } from './hooks';
import { desktopSearchStyles } from './Search.css';

export const DesktopSearch = () => {
	const searchRef = useRef<HTMLLabelElement>(null);
	const { isFocused, searchTerms, handleToggleFocusSearchInput, handleChangeSearchTerms } = useSearch();

	useOnClickOutside(searchRef, () => {
		handleToggleFocusSearchInput(false);
	});

	const handleClear = () => {
		handleChangeSearchTerms('');
	};

	return (
		<label
			className={classNames(desktopSearchStyles.search, isFocused && desktopSearchStyles.searchFocused)}
			ref={searchRef}
		>
			<SearchIcon />
			<input
				className={classNames(desktopSearchStyles.searchInput, typographyStyles['body']['large'])}
				type="text"
				placeholder="Tìm kiếm"
				value={searchTerms}
				onFocus={() => handleToggleFocusSearchInput(true)}
				onChange={e => handleChangeSearchTerms(e.target.value)}
			/>
			{isFocused && searchTerms && (
				<UnstyledButton onClick={handleClear}>
					<CloseIcon />
				</UnstyledButton>
			)}
		</label>
	);
};

export default DesktopSearch;
