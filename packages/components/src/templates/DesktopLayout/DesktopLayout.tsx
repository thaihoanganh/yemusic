import React, { Fragment, useContext } from 'react';

import { QueueContext } from '@yemusic/providers';
import { motion } from 'framer-motion';

import { ScrollArea } from '../../atoms/ScrollArea';

import { asideWidth, desktopLayoutStyles, playerControlsHeight } from './DesktopLayout.css';

export interface DesktopLayout extends React.PropsWithChildren {
	aside: React.ReactNode;
	header: React.ReactNode;
	sidebar: React.ReactNode;
	playerControler: React.ReactNode;
}

export const DesktopLayout = ({ aside, children, header, sidebar, playerControler }: DesktopLayout) => {
	const { currentTrackId } = useContext(QueueContext.Context);

	const isVisiblePlayerControler = !!currentTrackId;

	return (
		<Fragment>
			<div
				style={{
					height: isVisiblePlayerControler ? `calc(100vh - ${playerControlsHeight}px)` : '100vh',
				}}
				className={desktopLayoutStyles.root}
			>
				<div className={desktopLayoutStyles.sidebar}>
					<div className={desktopLayoutStyles.sidebarInner}>{sidebar}</div>
				</div>
				<div className={desktopLayoutStyles.main}>
					<ScrollArea fillContainer visibleScrollbarOnHover>
						<div className={desktopLayoutStyles.mainHeader}>{header}</div>
						<div className={desktopLayoutStyles.mainContent}>{children}</div>
					</ScrollArea>
				</div>
				<motion.div
					initial={{
						width: 0,
					}}
					animate={{
						width: currentTrackId ? asideWidth : 0,
						minWidth: currentTrackId ? asideWidth : 0,
						transition: {
							duration: 0.45,
						},
					}}
					className={desktopLayoutStyles.aside}
				>
					{aside}
				</motion.div>
			</div>
			{currentTrackId && (
				<div className={desktopLayoutStyles.playerControler}>
					<div className={desktopLayoutStyles.playerControlerInner}>{playerControler}</div>
				</div>
			)}
		</Fragment>
	);
};

export default DesktopLayout;
