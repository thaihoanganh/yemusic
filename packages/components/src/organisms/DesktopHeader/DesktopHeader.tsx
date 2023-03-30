import { UnstyledButton } from '../../atoms/Button';
import { Group } from '../../atoms/Frame';
import { SettingsIcon } from '../../atoms/Icons';
import { Paper } from '../../atoms/Paper';
import { DesktopSearch } from '../Search/DesktopSearch';

export const DesktopHeader = () => {
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
					<DesktopSearch />
				</Group>

				<Group spacing="large">
					<UnstyledButton>
						<SettingsIcon />
					</UnstyledButton>
				</Group>
			</Group>
		</Paper>
	);
};

export default DesktopHeader;
