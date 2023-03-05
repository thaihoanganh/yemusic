import { UnstyledButton } from '../../atoms/Button';
import Frame, { Group, Stack } from '../../atoms/Frame';
import {
	DownloadIcon,
	FavoriteIcon,
	PlayCircleFillIcon,
	QueueMusicIcon,
	RepeatIcon,
	ShuffleIcon,
	SkipNextIcon,
	SkipPreviousIcon,
	VolumeUpIcon,
} from '../../atoms/Icons';
import { Paper } from '../../atoms/Paper';
import { Slider } from '../../atoms/Slider';
import { StateLayer } from '../../atoms/StateLayer';
import Typography from '../../atoms/Typography/Typography';

export const DesktopPlayerControls = () => {
	return (
		<Frame cornerRadius="medium">
			<Paper color="surface-dynamic">
				<Paper color="primary-dynamic" surfaceLevel={3}>
					<Stack spacing="medium" horizontalPadding="large" verticalPadding="medium">
						<Group>
							<Group
								style={{
									width: '33.3333%',
									minWidth: '33.3333%',
								}}
								spacing="small"
								justifyContent="flex-start"
								alignItems="center"
							>
								<StateLayer state={['pressed']}>
									{({ isPressed }) => (
										<UnstyledButton>
											<FavoriteIcon
												style={{
													transform: isPressed ? 'scale(1.2)' : 'scale(1)',
													transition: 'transform 0.2s',
												}}
												color="on-primary-container-dynamic"
											/>
										</UnstyledButton>
									)}
								</StateLayer>
								<UnstyledButton>
									<DownloadIcon color="on-primary-container-dynamic" />
								</UnstyledButton>
							</Group>

							<Group spacing="small" justifyContent="center" alignItems="center" fillContainer>
								<UnstyledButton>
									<ShuffleIcon color="on-primary-container-dynamic" />
								</UnstyledButton>
								<UnstyledButton>
									<SkipPreviousIcon size="large" color="on-primary-container-dynamic" />
								</UnstyledButton>
								<UnstyledButton>
									<PlayCircleFillIcon size="xlarge" color="on-primary-container-dynamic" />
								</UnstyledButton>
								<UnstyledButton>
									<SkipNextIcon size="large" color="on-primary-container-dynamic" />
								</UnstyledButton>
								<UnstyledButton>
									<RepeatIcon color="on-primary-container-dynamic" />
								</UnstyledButton>
							</Group>

							<Group
								style={{
									width: '33.3333%',
									minWidth: '33.3333%',
								}}
								spacing="small"
								justifyContent="flex-end"
								alignItems="center"
							>
								<StateLayer state={['hover']}>
									{({ isHover }) => (
										<Group alignItems="center" spacing="xsmall">
											<UnstyledButton>
												<VolumeUpIcon color="on-primary-container-dynamic" />
											</UnstyledButton>
											<div
												style={{
													overflow: 'hidden',
													width: isHover ? 80 : 80,
													paddingBottom: 4,
													transition: 'width 0.5s',
												}}
											>
												<Slider max={100} step={5} />
											</div>
										</Group>
									)}
								</StateLayer>
								<UnstyledButton>
									<QueueMusicIcon color="on-primary-container-dynamic" />
								</UnstyledButton>
							</Group>
						</Group>

						<Group spacing="small">
							<Typography variant="body" size="small" color="on-primary-container-dynamic">
								00:00
							</Typography>
							<Group alignItems="center" fillContainer>
								<Slider max={999} />
							</Group>
							<Typography variant="body" size="small" color="on-primary-container-dynamic">
								00:00
							</Typography>
						</Group>
					</Stack>
				</Paper>
			</Paper>
		</Frame>
	);
};

export default DesktopPlayerControls;
