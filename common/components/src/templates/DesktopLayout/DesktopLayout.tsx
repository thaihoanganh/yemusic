import React, { PropsWithChildren, useContext } from 'react';

import { QueueContext } from '@yemusic/providers';

import { asideWidth, desktopLayoutStyles, playerControlsHeight } from './DesktopLayout.css';

export interface DesktopLayoutProps extends PropsWithChildren {
	aside?: React.ReactNode;
	mainHeader?: React.ReactNode;
	sidebar?: React.ReactNode;
	playerControls?: React.ReactNode;
}

export const DesktopLayout = ({ aside, children, mainHeader, sidebar, playerControls }: DesktopLayoutProps) => {
	const { currentTrackId } = useContext(QueueContext.Context);

	return (
		<div className={desktopLayoutStyles.layout}>
			<div className={desktopLayoutStyles.layoutRow}>
				<div className={desktopLayoutStyles.layoutSidebarWrapper}>
					<div className={desktopLayoutStyles.LayoutSidebar}>{sidebar}</div>
				</div>
				<div
					style={{
						height: currentTrackId ? `calc(100vh - ${playerControlsHeight}px)` : '100vh',
					}}
					className={desktopLayoutStyles.layoutMain}
				>
					<div className={desktopLayoutStyles.layoutMainHeader}>{mainHeader}</div>
					<div className={desktopLayoutStyles.layoutMainContent}>{children}</div>
				</div>
				<div
					style={{
						width: currentTrackId ? asideWidth : 0,
						minWidth: currentTrackId ? asideWidth : 0,
					}}
					className={desktopLayoutStyles.layoutAside}
				>
					{aside}
				</div>
			</div>
			{currentTrackId && (
				<div className={desktopLayoutStyles.sidebarControlsWrapper}>
					<div className={desktopLayoutStyles.sidebarControls}>{playerControls}</div>
				</div>
			)}
		</div>
	);
};

export default DesktopLayout;
