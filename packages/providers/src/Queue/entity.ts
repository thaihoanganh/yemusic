import { z } from 'zod';

export type IQueueEntity = z.infer<typeof QueueSchema>;

export const QueueSchema = z.object({
	queueTrackIds: z.array(z.string()),
	playedIds: z.array(z.string()),
	currentTrackId: z.string(),
	title: z.string(),
});
