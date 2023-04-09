import Link from 'next/link';

import { UnstyledButton } from '../../atoms/Button';
import { Group } from '../../atoms/Frame';
import GithubIcon from '../../atoms/Icons/GithubIcon';
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

			<Group spacing="large">
				<Link
					style={{
						display: 'flex',
						alignItems: 'center',
					}}
					href="https://github.com/thaihoanganh/yemusic"
					target="_blank"
				>
					<UnstyledButton>
						<GithubIcon size="small" />
					</UnstyledButton>
				</Link>
			</Group>
		</Group>
	);
};

export default MobileHomeHeader;
