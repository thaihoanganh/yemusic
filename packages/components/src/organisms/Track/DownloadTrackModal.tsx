import { useContext, useEffect, useState } from 'react';

import { TracksContext, setAudioUrlTrack } from '@yemusic/providers';
import { tracksService } from '@yemusic/services/v1';

import { UnstyledButton } from '../../atoms/Button';
import { Frame, Group, Stack } from '../../atoms/Frame';
import { CloseIcon } from '../../atoms/Icons';
import { Loader } from '../../atoms/Loader';
import { Modal } from '../../atoms/Modal';
import { Paper } from '../../atoms/Paper';
import { Typography } from '../../atoms/Typography';

import { useDownloadTrack } from './hooks';

export const DownloadTrackModal = () => {
	const tracks = useContext(TracksContext.Context);
	const { isOpenModalDownloadTrack, trackId, onCloseModalDownloadTrack } = useDownloadTrack();
	const [isFetching, setIsFetching] = useState(false);

	const track = tracks.find(track => track.id === trackId);

	useEffect(() => {
		if (isOpenModalDownloadTrack && trackId && !track?.audioFormats.length) {
			setIsFetching(true);

			tracksService
				.getTrackDetails({
					trackId,
				})
				.then(data => {
					setAudioUrlTrack({
						trackId,
						captions: data.captions,
						audioFormats: data.audioFormats,
					});
				})
				.finally(() => {
					setTimeout(() => {
						setIsFetching(false);
					}, 500);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [track, isOpenModalDownloadTrack]);

	const handleDownloadTrack = (type: '.mp4' | '.webm') => {
		if (track?.audioFormats) {
			let audioUrl = '';

			switch (type) {
				case '.mp4':
					audioUrl = track.audioFormats[1].url;
					break;
				case '.webm':
					audioUrl = track.audioFormats[0].url;
					break;

				default:
					break;
			}

			const a = document.createElement('a');
			document.body.appendChild(a);
			a.style.display = 'none';
			a.href = audioUrl;
			a.target = '_blank';
			a.download = `${track.title} - Yemusic.app${type}`;
			a.click();
			URL.revokeObjectURL(audioUrl);
			a.remove();

			// fetch(audioUrl, {
			// 	mode: 'no-cors',
			// })
			// 	.then(response => {
			// 		return response.blob();
			// 	})
			// 	.then(blob => {
			// 		const url = URL.createObjectURL(blob);
			// 		const link = document.createElement('a');
			// 		link.href = url;
			// 		link.download = `${track.title} - Yemusic${type}`;
			// 		link.click();
			// 		URL.revokeObjectURL(audioUrl);
			// 	});
		}
	};

	return (
		<Modal isOpen={isOpenModalDownloadTrack} onClose={onCloseModalDownloadTrack}>
			<Stack spacing="large">
				<Group alignItems="center" justifyContent="space-between">
					<Typography variant="title" size="large" color="on-surface">
						Tải bài hát
					</Typography>

					<UnstyledButton onClick={onCloseModalDownloadTrack}>
						<CloseIcon />
					</UnstyledButton>
				</Group>

				<Stack spacing="xsmall" alignItems="center">
					<Typography variant="body" size="medium" textAlign="center">
						{track?.title}
					</Typography>
					<Typography variant="body" size="medium" textAlign="center">
						{track?.author}
					</Typography>
				</Stack>

				{isFetching ? (
					<Group alignItems="center" justifyContent="center">
						<Loader size="large" color="primary" />
					</Group>
				) : (
					<Stack spacing="small">
						<Frame cornerRadius="small">
							<Paper color="primary-container">
								<UnstyledButton fullWidth onClick={() => handleDownloadTrack('.mp4')}>
									<Group
										style={{
											width: '100%',
										}}
										justifyContent="center"
										horizontalPadding="small"
										verticalPadding="small"
									>
										<Typography variant="body" size="large" color="on-primary-container">
											Tải về định dạng .mp4
										</Typography>
									</Group>
								</UnstyledButton>
							</Paper>
						</Frame>
						<Frame cornerRadius="small">
							<Paper color="primary-container">
								<UnstyledButton fullWidth onClick={() => handleDownloadTrack('.webm')}>
									<Group
										style={{
											width: '100%',
										}}
										justifyContent="center"
										horizontalPadding="small"
										verticalPadding="small"
									>
										<Typography variant="body" size="large" color="on-primary-container">
											Tải về định dạng .webm
										</Typography>
									</Group>
								</UnstyledButton>
							</Paper>
						</Frame>
					</Stack>
				)}
			</Stack>
		</Modal>
	);
};

export default DownloadTrackModal;
