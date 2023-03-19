import { CategoriesContext } from './CategoriesProvider';

export const onSetTrendingTrackIds = ({ trackIds }: { trackIds: string[] }) => {
	const { updateState } = CategoriesContext;

	updateState(prevState => ({
		...prevState,
		trending: trackIds,
	}));
};

export const onSetIsFetchingCategories = ({ isFetching }: { isFetching: boolean }) => {
	const { updateState } = CategoriesContext;

	updateState(prevState => ({
		...prevState,
		isFetchingCategories: isFetching,
	}));
};
