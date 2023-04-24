import { useContext, useEffect, useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import { QueueContext } from '@yemusic/providers';

import { ScrollArea } from '../../atoms/ScrollArea';

import {
	mobileBottomNavigationHeight,
	mobileLayoutStyles,
	mobilePlayerControllerHeight,
	screenHeightUnitVar,
} from './MobileLayout.css';

export interface MobileLayoutProps extends React.PropsWithChildren {
	bottomNavigation?: React.ReactNode;
	header?: React.ReactNode;
	playerController?: React.ReactNode;
}

export const MobileLayout = ({ children, bottomNavigation, header, playerController }: MobileLayoutProps) => {
	const [screenHeightUnitVarValue, setScreenHeightUnitVarValue] = useState('1vh');
	const { currentTrackId } = useContext(QueueContext.Context);

	useEffect(() => {
		handleResize();

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleResize = () => {
		const vh = window.innerHeight * 0.01;
		setScreenHeightUnitVarValue(`${vh}px`);
	};

	return (
		<div
			style={assignInlineVars({
				[screenHeightUnitVar]: screenHeightUnitVarValue,
			})}
			className={mobileLayoutStyles.root}
		>
			<div
				style={{
					paddingBottom: currentTrackId
						? mobileBottomNavigationHeight + mobilePlayerControllerHeight
						: mobileBottomNavigationHeight,
				}}
				className={mobileLayoutStyles.main}
			>
				{header && <div className={mobileLayoutStyles.mainHeader}>{header}</div>}
				<div className={mobileLayoutStyles.mainContent}>
					<ScrollArea fillContainer>
						<div className={mobileLayoutStyles.mainContentInner}>{children}</div>
					</ScrollArea>
				</div>
			</div>
			{currentTrackId && <div className={mobileLayoutStyles.playerController}>{playerController}</div>}
			<div className={mobileLayoutStyles.bottomNavigation}>
				<div className={mobileLayoutStyles.bottomNavigationInner}>{bottomNavigation}</div>
			</div>
		</div>
	);
};

export default MobileLayout;
