import { PropsWithChildren, useEffect } from 'react';

import { trackService } from '@yemusic/services/v1';

import createSingletonAppContext from '../createAppProvider';
import { onAddTracks } from '../Tracks';

import { onSetIsFetchingCategories, onSetTrendingTrackIds } from './actions';
import { CategoriesEntity } from './entity';

export const initialCategoriesState: CategoriesEntity = {
	isFetchingCategories: false,
	trending: [],
};

export const CategoriesContext = createSingletonAppContext<CategoriesEntity>(initialCategoriesState);

export const CategoriesProvider = ({ children }: PropsWithChildren) => {
	useEffect(() => {
		onSetIsFetchingCategories({
			isFetching: true,
		});

		trackService
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
						audioUrl: '',
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

	return <CategoriesContext.Provider>{children}</CategoriesContext.Provider>;
};
