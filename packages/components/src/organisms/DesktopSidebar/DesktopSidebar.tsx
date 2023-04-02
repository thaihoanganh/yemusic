import Link from 'next/link';

import { UnstyledButton } from '../../atoms/Button';
import { Divider } from '../../atoms/Divider';
import { Frame, Group, Stack } from '../../atoms/Frame';
import { AddBoxFillIcon, FavoriteFillIcon, FavoriteIcon, HomeFillIcon, HomeIcon, SearchIcon } from '../../atoms/Icons';
import { Logo } from '../../atoms/Logo';
import { StateLayer } from '../../atoms/StateLayer';
import Typography from '../../atoms/Typography/Typography';
import { NavigationDrawer, NavigationDrawerItem } from '../../molecules/NavigationDrawer';

export const DesktopSidebar = () => {
	return (
		<Stack>
			<Group
				style={{
					height: 72,
				}}
				alignItems="center"
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
			</Group>

			<Stack horizontalPadding="small" verticalPadding="small">
				<NavigationDrawer>
					<NavigationDrawerItem
						to="/"
						label="Trang chủ"
						icon={<HomeIcon />}
						iconActive={<HomeFillIcon />}
						exact
						isActive
					/>
					<NavigationDrawerItem to="/search" label="Tìm kiếm" icon={<SearchIcon />} iconActive={<SearchIcon />} />
					<NavigationDrawerItem
						to="/playlists/liked-tracks"
						label="Bài hát đã thích"
						icon={<FavoriteIcon />}
						iconActive={<FavoriteFillIcon />}
					/>
				</NavigationDrawer>
			</Stack>

			<Frame horizontalPadding="medium">
				<Divider orientation="horizontal" />
			</Frame>

			<Stack horizontalPadding="small" verticalPadding="small" fillContainer>
				<UnstyledButton>
					<StateLayer state={['hover']}>
						{({ isHover }) => (
							<Group spacing="medium" alignItems="center" horizontalPadding="small" verticalPadding="small">
								<AddBoxFillIcon color={isHover ? 'on-surface' : 'on-surface-variant'} />
								<Typography variant="label" size="large" color={isHover ? 'on-surface' : 'on-surface-variant'}>
									Tạo playlist
								</Typography>
							</Group>
						)}
					</StateLayer>
				</UnstyledButton>
			</Stack>
		</Stack>
	);
};

export default DesktopSidebar;
