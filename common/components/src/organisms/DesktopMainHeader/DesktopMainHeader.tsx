import { UnstyledButton } from '../../atoms/Button';
import { Group } from '../../atoms/Frame';
import { ArrowBackIcon, ArrowForwardIcon, PaletteIcon, SettingsIcon } from '../../atoms/Icons';
import DesktopSearch from '../DesktopSearch';

export const DesktopMainHeader = () => {
	return (
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

				<DesktopSearch />
			</Group>

			<Group spacing="large">
				<UnstyledButton>
					<PaletteIcon />
				</UnstyledButton>
				<UnstyledButton>
					<SettingsIcon />
				</UnstyledButton>
			</Group>
		</Group>
	);
};

export default DesktopMainHeader;
