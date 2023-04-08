import { Stack } from '../../atoms/Frame';
import { HomeFillIcon, HomeIcon, SearchIcon } from '../../atoms/Icons';
import { NavigationBar, NavigationBarItem } from '../../molecules/NavigationBar';

export const MobileNavigation = () => {
	return (
		<Stack justifyContent="center">
			<NavigationBar>
				<NavigationBarItem to="/" label="Trang chủ" icon={<HomeIcon />} iconActive={<HomeFillIcon />} exact isActive />
				<NavigationBarItem to="/search" label="Tìm kiếm" icon={<SearchIcon />} iconActive={<SearchIcon />} />
			</NavigationBar>
		</Stack>
	);
};

export default MobileNavigation;
