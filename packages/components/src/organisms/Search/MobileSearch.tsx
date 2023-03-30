import { useRef } from 'react';

import classNames from 'classnames';

import { UnstyledButton } from '../../atoms/Button';
import { Group } from '../../atoms/Frame';
import { ArrowBackIcon, CloseIcon, SearchIcon } from '../../atoms/Icons';
import { typographyStyles } from '../../atoms/Typography/Typography.css';

import { useSearch } from './hooks';
import { mobileSearch } from './Search.css';

export const MobileSearch = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const { isFocused, searchTerms, handleToggleFocusSearchInput, handleChnageSearchTerms } = useSearch();

	const handleClear = () => {
		if (inputRef.current) {
			handleChnageSearchTerms('');
			inputRef.current.focus();
		}
	};

	const handleFocus = () => {
		if (inputRef.current) {
			handleToggleFocusSearchInput(true);
			inputRef.current.focus();
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if (isFocused && e.target.parentElement?.tagName === 'LABEL') {
			return;
		}
		handleToggleFocusSearchInput(false);
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
			<label id="mobile-search" className={classNames(mobileSearch.root)}>
				<input
					ref={inputRef}
					className={classNames(mobileSearch.searchInput, typographyStyles['body']['large'])}
					type="text"
					placeholder="Tìm kiếm"
					value={searchTerms}
					onFocus={() => handleToggleFocusSearchInput(true)}
					onBlur={handleBlur}
					onChange={e => handleChnageSearchTerms(e.target.value)}
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
