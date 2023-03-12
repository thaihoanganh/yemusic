import React, { PropsWithChildren } from 'react';

import { useQueue } from '@yemusic/hooks';

import { desktopLayoutStyles, playerControlsHeight } from './DesktopLayout.css';

export interface DesktopLayoutProps extends PropsWithChildren {
	aside?: React.ReactNode;
	mainHeader?: React.ReactNode;
	sidebar?: React.ReactNode;
	playerControls?: React.ReactNode;
}

export const DesktopLayout = ({ aside, children, mainHeader, sidebar, playerControls }: DesktopLayoutProps) => {
	const { nowPlayingTrackId, tracks } = useQueue();

	const nowPlayingTrack = tracks.find(track => track.id === nowPlayingTrackId);

	return (
		<div className={desktopLayoutStyles.layout}>
			<div className={desktopLayoutStyles.layoutRow}>
				<div className={desktopLayoutStyles.layoutSidebarWrapper}>
					<div className={desktopLayoutStyles.LayoutSidebar}>{sidebar}</div>
				</div>
				<div
					style={{
						height: nowPlayingTrack ? `calc(100vh - ${playerControlsHeight}px)` : '100vh',
					}}
					className={desktopLayoutStyles.layoutMain}
				>
					<div className={desktopLayoutStyles.layoutMainHeader}>{mainHeader}</div>
					<div className={desktopLayoutStyles.layoutMainContent}>{children}</div>
				</div>
				<div className={desktopLayoutStyles.layoutAside}>{aside}</div>
			</div>
			{nowPlayingTrack && (
				<div className={desktopLayoutStyles.sidebarControlsWrapper}>
					<div className={desktopLayoutStyles.sidebarControls}>{playerControls}</div>
				</div>
			)}
		</div>
	);
};

export default DesktopLayout;
