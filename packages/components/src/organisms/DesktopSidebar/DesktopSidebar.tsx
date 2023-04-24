import Link from 'next/link';

import { Group, Stack } from '../../atoms/Frame';
import { FavoriteFillIcon, FavoriteIcon, HomeFillIcon, HomeIcon, SearchIcon } from '../../atoms/Icons';
import { Logo } from '../../atoms/Logo';
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
		</Stack>
	);
};

export default DesktopSidebar;
