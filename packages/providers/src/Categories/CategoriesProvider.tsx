import { Fragment, PropsWithChildren, useContext, useEffect } from 'react';

import { useAsync } from '@yemusic/hooks';
import { categoriesService } from '@yemusic/services/v1';

import createSingletonAppContext from '../createSingletonAppContext';
import { PlaylistsContext } from '../Playlists';
import { onAddTracks } from '../Tracks';

import { onSetIsFetchingCategories, onSetTrendingTrackIds } from './actions';

export interface ICategoriesEntity {
	isFetchingCategories: boolean;
	trending: string[];
}

export const initialCategoriesState: ICategoriesEntity = {
	isFetchingCategories: true,
	trending: [],
};

export const CategoriesContext = createSingletonAppContext<ICategoriesEntity>(initialCategoriesState);

export const CategoriesProvider = CategoriesContext.withProvider(({ children }: PropsWithChildren) => {
	const { isFetchingInitialPlaylists } = useContext(PlaylistsContext.Context);

	const { execute: onGetTrendingTracks } = useAsync({
		handler: categoriesService.getTrendingTracks,
		onListener: isPending => {
			onSetIsFetchingCategories({
				isFetching: isPending,
			});
		},
		onSuccess: ({ items }) => {
			onAddTracks({
				newTracks: items.map(track => ({
					id: track.id,
					title: track.title,
					author: track.author,
					thumbnail: track.thumbnail,
					duration: track.duration,
					source: [],
					isLiked: false,
					isLoadingAudio: false,
					isNowPlaying: false,
					captions: [],
					audioFormats: [],
				})),
			});
			onSetTrendingTrackIds({
				trackIds: items.map(track => track.id),
			});
		},
	});

	useEffect(() => {
		if (!isFetchingInitialPlaylists) {
			onGetTrendingTracks();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFetchingInitialPlaylists]);

	return <Fragment>{children}</Fragment>;
});
