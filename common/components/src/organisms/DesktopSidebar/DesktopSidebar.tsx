import Link from 'next/link';

import { UnstyledButton } from '../../atoms/Button';
import Frame, { Group, Stack } from '../../atoms/Frame';
import {
	FavoriteFillIcon,
	FavoriteIcon,
	HomeFillIcon,
	HomeIcon,
	InstallDesktopIcon,
	SearchIcon,
} from '../../atoms/Icons';
import { Paper } from '../../atoms/Paper';
import Typography from '../../atoms/Typography/Typography';
import { NavigationDrawer, NavigationDrawerItem } from '../../molecules/NavigationDrawer';

export const DesktopSidebar = () => {
	return (
		<Stack
			style={{
				height: '100vh',
			}}
		>
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
						to="/liked-songs"
						label="Bài hát đã thích"
						icon={<FavoriteIcon />}
						iconActive={<FavoriteFillIcon />}
					/>
				</NavigationDrawer>
			</Stack>

			<Frame horizontalPadding="large" verticalPadding="large">
				<Frame cornerRadius="medium">
					<Paper color="surface">
						<Paper color="primary" surfaceLevel={3}>
							<Stack spacing="medium" horizontalPadding="medium" verticalPadding="medium">
								<Typography variant="body" textAlign="center">
									Tải xuống ứng dụng của chúng tôi ngay bây giờ để trải nghiệm tất cả các tính năng.
								</Typography>

								<UnstyledButton>
									<Frame cornerRadius="small">
										<Paper color="primary-container">
											<Group spacing="small" justifyContent="center" alignItems="center" verticalPadding="small">
												<InstallDesktopIcon />
												<Typography variant="label">Download now</Typography>
											</Group>
										</Paper>
									</Frame>
								</UnstyledButton>
							</Stack>
						</Paper>
					</Paper>
				</Frame>
			</Frame>
		</Stack>
	);
};

export default DesktopSidebar;
