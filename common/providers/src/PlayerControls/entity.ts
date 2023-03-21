import { RefObject } from 'react';

import z from 'zod';

export const PlayerControlsEntity = z.object({
	duration: z.number(),
	currentTime: z.number(),
	isPlaying: z.boolean(),
	isShuffling: z.boolean(),
	repeatMode: z.enum(['none', 'one', 'all']),
	volume: z.number(),
	isMute: z.boolean(),
});

export type IPlayerControlsEntity = z.infer<typeof PlayerControlsEntity> & {
	audioRef: RefObject<HTMLAudioElement | null>;
};
