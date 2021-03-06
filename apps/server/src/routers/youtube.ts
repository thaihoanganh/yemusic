import { Router } from 'express';

import controller from '@controllers/youtube';
const youtubeRouter = Router();

youtubeRouter.route('/song/s').post(controller.listSong);
youtubeRouter.route('/song/:yId').get(controller.song);
youtubeRouter.route('/song/trending').post(controller.listSongTrending);

export default youtubeRouter;
