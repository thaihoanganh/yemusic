import { UnstyledButton } from '../../atoms/Button';
import { Group } from '../../atoms/Frame';
import { ArrowBackIcon, ArrowForwardIcon } from '../../atoms/Icons';
import { Paper } from '../../atoms/Paper';
import DesktopSearchBox from '../Search/DesktopSearchBox';

export const DesktopMainHeader = () => {
	return (
		<Paper color="background">
			<Group
				style={{
					height: 72,
				}}
				spacing="medium"
				alignItems="center"
				horizontalPadding="large"
			>
				<Group spacing="medium" fillContainer>
					<UnstyledButton>
						<ArrowBackIcon />
					</UnstyledButton>
					<UnstyledButton>
						<ArrowForwardIcon />
					</UnstyledButton>

					<DesktopSearchBox />
				</Group>

				<Group spacing="large">
					{/* <UnstyledButton>
						<PaletteIcon />
					</UnstyledButton>
					<UnstyledButton>
						<SettingsIcon />
					</UnstyledButton> */}
				</Group>
			</Group>
		</Paper>
	);
};

export default DesktopMainHeader;
