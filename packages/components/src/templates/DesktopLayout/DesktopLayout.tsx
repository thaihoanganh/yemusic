import React, { Fragment, useContext } from 'react';

import { QueueContext } from '@yemusic/providers';
import { motion } from 'framer-motion';

import { Group, Stack } from '../../atoms/Frame';
import { ScrollArea } from '../../atoms/ScrollArea';
import { Typography } from '../../atoms/Typography';

import { asideWidth, desktopLayoutStyles, playerControlsHeight } from './DesktopLayout.css';

export interface DesktopLayout extends React.PropsWithChildren {
	header: React.ReactNode;
	sidebar: React.ReactNode;
	playerControler: React.ReactNode;
	queue: React.ReactNode;
}

export const DesktopLayout = ({ queue, children, header, sidebar, playerControler }: DesktopLayout) => {
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
					<Stack
						style={{
							height: '100%',
						}}
					>
						<Group
							style={{
								height: 72,
								minHeight: 72,
							}}
							alignItems="center"
							justifyContent="space-between"
							horizontalPadding="medium"
						>
							<Stack spacing="xsmall">
								<Typography
									style={{
										fontWeight: 600,
									}}
									variant="title"
									size="large"
									color="on-surface-variant"
								>
									Danh sách chờ
								</Typography>
							</Stack>
						</Group>
						<ScrollArea visibleScrollbarOnHover>
							<Stack
								style={{
									paddingBottom: 16,
								}}
								spacing="medium"
								horizontalPadding="medium"
							>
								{queue}
							</Stack>
						</ScrollArea>
					</Stack>
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
