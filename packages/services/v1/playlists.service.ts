import { BaseService } from './base.service';

export class PlaylistsService extends BaseService {
	addTrackToPlaylist({ playlistSlug, trackId, ref }: { playlistSlug: string; trackId: string; ref?: string }) {
		return this.httpClient.post(`/playlists/${playlistSlug}`, {
			trackId,
			ref,
		});
	}
}
