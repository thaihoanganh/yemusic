import { HomeFillIcon, HomeIcon, SearchIcon } from '../../atoms/Icons';
import { NavigationBar, NavigationBarItem } from '../../molecules/NavigationBar';

export const MobileNavigation = () => {
	return (
		<NavigationBar>
			<NavigationBarItem to="/" label="Trang chủ" icon={<HomeIcon />} iconActive={<HomeFillIcon />} exact isActive />
			<NavigationBarItem to="/search" label="Tìm kiếm" icon={<SearchIcon />} iconActive={<SearchIcon />} />
		</NavigationBar>
	);
};

export default MobileNavigation;
