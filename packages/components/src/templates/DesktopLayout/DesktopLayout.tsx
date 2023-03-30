import React, { useContext } from 'react';

import { QueueContext } from '@yemusic/providers';

import { DesktopAside } from '../../organisms/DesktopAside';
import { DesktopHeader } from '../../organisms/DesktopHeader';
import { DesktopSidebar } from '../../organisms/DesktopSidebar';
import { DesktopPlayerControls } from '../../organisms/PlayerControls';

import { asideWidth, desktopLayoutStyles, playerControlsHeight } from './DesktopLayout.css';

export const DesktopLayout = ({ children }: React.PropsWithChildren) => {
	const { currentTrackId } = useContext(QueueContext.Context);

	return (
		<div className={desktopLayoutStyles.layout}>
			<div className={desktopLayoutStyles.layoutRow}>
				<div className={desktopLayoutStyles.layoutSidebarWrapper}>
					<div className={desktopLayoutStyles.LayoutSidebar}>
						<DesktopSidebar />
					</div>
				</div>
				<div
					style={{
						height: currentTrackId ? `calc(100vh - ${playerControlsHeight}px)` : '100vh',
					}}
					className={desktopLayoutStyles.layoutMain}
				>
					<div className={desktopLayoutStyles.layoutMainHeader}>
						<DesktopHeader />
					</div>
					<div className={desktopLayoutStyles.layoutMainContent}>{children}</div>
				</div>
				<div
					style={{
						width: currentTrackId ? asideWidth : 0,
						minWidth: currentTrackId ? asideWidth : 0,
					}}
					className={desktopLayoutStyles.layoutAside}
				>
					<DesktopAside />
				</div>
			</div>
			{currentTrackId && (
				<div className={desktopLayoutStyles.sidebarControlsWrapper}>
					<div className={desktopLayoutStyles.sidebarControls}>
						<DesktopPlayerControls />
					</div>
				</div>
			)}
		</div>
	);
};

export default DesktopLayout;
