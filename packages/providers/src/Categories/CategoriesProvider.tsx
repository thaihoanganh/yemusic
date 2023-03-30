import { Fragment, PropsWithChildren, useEffect } from 'react';

import { categoriesService } from '@yemusic/services/v1';

import createSingletonAppContext from '../createSingletonAppContext';
import { onAddTracks } from '../Tracks';

import { onSetIsFetchingCategories, onSetTrendingTrackIds } from './actions';
import { ICategoriesEntity } from './entity';

export const initialCategoriesState: ICategoriesEntity = {
	isFetchingCategories: false,
	trending: [],
};

export const CategoriesContext = createSingletonAppContext<ICategoriesEntity>(initialCategoriesState);

export const CategoriesProvider = CategoriesContext.withProvider(({ children }: PropsWithChildren) => {
	useEffect(() => {
		onSetIsFetchingCategories({
			isFetching: true,
		});

		categoriesService
			.getTracksCategories()
			.then(data => {
				onAddTracks({
					newTracks: data.trending.items.map(track => ({
						id: track.id,
						title: track.title,
						author: track.author,
						thumbnail: track.thumbnail,
						duration: track.duration,
						source: [],
						audio: [],
						isLiked: false,
						isLoadingAudio: false,
						isNowPlaying: false,
					})),
				});
				onSetTrendingTrackIds({
					trackIds: data.trending.items.map(track => track.id),
				});
			})
			.finally(() => {
				onSetIsFetchingCategories({
					isFetching: false,
				});
			});
	}, []);

	return <Fragment>{children}</Fragment>;
});
