import { create } from 'zustand';

export type SearchResult = {
	id: string;
	author: string;
	title: string;
	thumbnail: string;
	duration: number;
	isPlaying: boolean;
};

export type SearchState = {
	isSearching: boolean;
	searchTerm: string;
	searchResults: SearchResult[];
};

export type SearchActions = {
	setIsSearching: (isSearching: boolean) => void;
	setSearchTerm: (searchTerm: string) => void;
	setSearchResults: (searchResults: SearchResult[]) => void;
};

const initialSearchState: SearchState = {
	isSearching: false,
	searchTerm: '',
	searchResults: [],
};

export const useSearch = create<SearchState & SearchActions>(set => ({
	...initialSearchState,
	setIsSearching: isSearching => set({ isSearching }),
	setSearchTerm: searchTerm => set({ searchTerm }),
	setSearchResults: searchResults => set({ searchResults }),
}));
