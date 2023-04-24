import { useRef } from 'react';

import useOnClickOutside from '@yemusic/hooks/src/use-on-click-outside';
import classNames from 'classnames';

import { UnstyledButton } from '../../atoms/Button';
import { Group } from '../../atoms/Frame';
import { ArrowBackIcon, CloseIcon, SearchIcon } from '../../atoms/Icons';
import { typographySizeStyles } from '../../atoms/Typography/Typography.css';

import { useSearch } from './hooks';
import { mobileSearch } from './Search.css';

export const MobileSearch = () => {
	const searchInputRef = useRef<HTMLInputElement>(null);
	const searchRef = useRef<HTMLLabelElement>(null);
	const { isFocused, searchTerms, handleToggleFocusSearchInput, handleChangeSearchTerms } = useSearch();

	useOnClickOutside(searchRef, () => {
		handleToggleFocusSearchInput(false);
	});

	const handleClear = () => {
		handleChangeSearchTerms('');
	};

	const handleFocus = () => {
		if (searchInputRef.current) {
			handleToggleFocusSearchInput(true);
			searchInputRef.current.focus();
		}
	};

	return (
		<Group spacing="small" alignItems="center" fillContainer>
			{isFocused ? (
				<UnstyledButton onClick={() => handleToggleFocusSearchInput(false)}>
					<ArrowBackIcon />
				</UnstyledButton>
			) : (
				<UnstyledButton onClick={handleFocus}>
					<SearchIcon />
				</UnstyledButton>
			)}
			<label id="mobile-search" className={classNames(mobileSearch.root)} ref={searchRef}>
				<input
					ref={searchInputRef}
					className={classNames(mobileSearch.searchInput, typographySizeStyles['body']['large'])}
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
		</Group>
	);
};

export default MobileSearch;
