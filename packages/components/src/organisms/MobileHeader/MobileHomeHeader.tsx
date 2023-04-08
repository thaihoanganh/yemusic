import Link from 'next/link';

import { UnstyledButton } from '../../atoms/Button';
import { Group } from '../../atoms/Frame';
import { SettingsIcon } from '../../atoms/Icons';
import { Logo } from '../../atoms/Logo';

import { mobileHeaderStyles } from './MobileHeader.css';

export const MobileHomeHeader = () => {
	return (
		<Group
			className={mobileHeaderStyles.root}
			justifyContent="space-between"
			horizontalPadding="small"
			verticalPadding="small"
		>
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
