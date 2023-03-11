import Link from 'next/link';

import { Group, Stack } from '../../atoms/Frame';
import { FavoriteFillIcon, FavoriteIcon, HomeFillIcon, HomeIcon, SearchIcon } from '../../atoms/Icons';
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
					<Typography size="small" variant="headline">
						Yemusic
					</Typography>
				</Link>
			</Group>

			<Stack horizontalPadding="small" verticalPadding="small" fillContainer>
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
						to="/liked-tracks"
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
