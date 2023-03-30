import Link from 'next/link';

import { UnstyledButton } from '../../atoms/Button';
import { Group } from '../../atoms/Frame';
import { SettingsIcon } from '../../atoms/Icons';
import { Logo } from '../../atoms/Logo';

export const MobileHomeHeader = () => {
	return (
		<Group justifyContent="space-between" horizontalPadding="small" verticalPadding="small">
			<Link
				style={{
					textDecoration: 'none',
				}}
				href="/"
			>
				<Logo />
			</Link>

			<UnstyledButton>
				<SettingsIcon />
			</UnstyledButton>
		</Group>
	);
};

export default MobileHomeHeader;
