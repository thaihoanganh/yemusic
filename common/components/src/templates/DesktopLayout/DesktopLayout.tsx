import React, { PropsWithChildren, useRef } from 'react';

import { Paper } from '../../atoms/Paper';

import { desktopLayoutStyles } from './DesktopLayout.css';

export interface DesktopLayoutProps extends PropsWithChildren {
	aside?: React.ReactNode;
	mainHeader?: React.ReactNode;
	sidebar?: React.ReactNode;
	playerControls?: React.ReactNode;
}

export const DesktopLayout = ({ aside, children, mainHeader, sidebar, playerControls }: DesktopLayoutProps) => {
	const playerControlsRef = useRef<HTMLDivElement>(null);

	return (
		<Paper color="background">
			<div className={desktopLayoutStyles.root}>
				<Paper className={desktopLayoutStyles.sidebar} color="primary" surfaceLevel={1}>
					{sidebar}
				</Paper>
				<div className={desktopLayoutStyles.main}>
					<div className={desktopLayoutStyles.mainHeader}>{mainHeader}</div>
					{children}
					<div className={desktopLayoutStyles.playerControls} ref={playerControlsRef}>
						{playerControls}
					</div>
				</div>
				<div className={desktopLayoutStyles.aside}>{aside}</div>
			</div>
		</Paper>
	);
};

export default DesktopLayout;
