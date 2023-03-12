/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, PropsWithChildren, useCallback } from 'react';

import { usePlayerControls, useQueue } from '@yemusic/hooks';

export const PlayerControlsProvider = ({ children }: PropsWithChildren) => {
	const { audioUrl, isPlaying, setCurrentTime } = usePlayerControls();
	const { repeatMode } = useQueue();

	const handleAudioControls = useCallback(
		(node: HTMLAudioElement) => {
			if (node) {
				if (isPlaying) {
					(node as any).play();
				} else {
					(node as any).pause();
				}
			}
		},
		[isPlaying]
	);

	return (
		<Fragment>
			{children}
			<audio
				src={audioUrl}
				autoPlay
				loop={repeatMode === 'one'}
				ref={handleAudioControls}
				onTimeUpdate={(e: any) =>
					setCurrentTime({
						currentTime: e.target.currentTime,
					})
				}
			/>
		</Fragment>
	);
};

export default PlayerControlsProvider;
