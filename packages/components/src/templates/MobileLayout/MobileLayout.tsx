import { useContext, useEffect, useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import { QueueContext } from '@yemusic/providers';
import { useRouter } from 'next/router';

import { Paper } from '../../atoms/Paper';
import { ScrollArea } from '../../atoms/ScrollArea';
import { MobileHomeHeader } from '../../organisms/MobileHeader';
import MobileSearchHeader from '../../organisms/MobileHeader/MobileSearchHeader';
import { MobileNavigation } from '../../organisms/MobileNavigation';
import { MobilePlayerControls } from '../../organisms/PlayerControls';

import { mobileLayoutStyles, screenHeightUnitVar } from './MobileLayout.css';

export const MobileLayout = ({ children }: React.PropsWithChildren) => {
	const { pathname } = useRouter();

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

	const isHomePage = pathname === '/';
	const isSearchPage = pathname.startsWith('/search');

	return (
		<div
			style={assignInlineVars({
				[screenHeightUnitVar]: screenHeightUnitVarValue,
			})}
			className={mobileLayoutStyles.root}
		>
			<div className={mobileLayoutStyles.main}>
				{isHomePage && <MobileHomeHeader />}
				{isSearchPage && <MobileSearchHeader />}
				<ScrollArea
					style={{
						paddingBottom: currentTrackId ? 168 : 112,
					}}
					fillContainer
				>
					{children}
				</ScrollArea>
			</div>
			{currentTrackId && (
				<div className={mobileLayoutStyles.playerControlerWrapper}>
					<Paper color="primary-dynamic" surfaceLevel={1}>
						<MobilePlayerControls />
					</Paper>
				</div>
			)}
			<div className={mobileLayoutStyles.navigationWrapper}>
				<Paper color="primary" surfaceLevel={1}>
					<div className={mobileLayoutStyles.navigation}>
						<MobileNavigation />
					</div>
				</Paper>
			</div>
		</div>
	);
};

export default MobileLayout;
