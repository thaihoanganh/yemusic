import { CategoriesService } from './categories.service';
import { PlaylistsService } from './playlists.service';
import { SearchService } from './search.service';
import { TracksService } from './tracks.service';

const categoriesService = new CategoriesService();
const searchService = new SearchService();
const tracksService = new TracksService();
const playlistsService = new PlaylistsService();

export {
	CategoriesService,
	categoriesService,
	PlaylistsService,
	playlistsService,
	SearchService,
	searchService,
	TracksService,
	tracksService,
};
