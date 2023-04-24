import { Stack } from '../../atoms/Frame';
import { FavoriteFillIcon, FavoriteIcon, HomeFillIcon, HomeIcon, SearchIcon } from '../../atoms/Icons';
import { NavigationBar, NavigationBarItem } from '../../molecules/NavigationBar';

export const MobileNavigation = () => {
	return (
		<Stack justifyContent="center">
			<NavigationBar>
				<NavigationBarItem to="/" label="Trang chủ" icon={<HomeIcon />} iconActive={<HomeFillIcon />} exact isActive />
				<NavigationBarItem to="/search" label="Tìm kiếm" icon={<SearchIcon />} iconActive={<SearchIcon />} />
				<NavigationBarItem
					exact
					to="/playlists/liked-tracks"
					label="Yêu thích"
					icon={<FavoriteIcon />}
					iconActive={<FavoriteFillIcon />}
				/>
			</NavigationBar>
		</Stack>
	);
};

export default MobileNavigation;
