import { useCallback, useMemo, useRef, useState } from 'react';

import { onAddTrackIdToQueueIds } from '@yemusic/providers';

import { UnstyledButton } from '../../atoms/Button';
import { Group, Stack } from '../../atoms/Frame';
import { Paper } from '../../atoms/Paper';
import { StateLayer } from '../../atoms/StateLayer';
import Typography from '../../atoms/Typography/Typography';

import { useTrack } from './hooks';
import { trackMenuStyles } from './Track.css';

const menuWidth = 200;

export const TrackMenu = () => {
	const menuRef = useRef<null | HTMLDivElement>(null);
	const [menuHeight, setMenuHeight] = useState(0);

	const { trackId, isOpenMenu, position, setIsOpenMenu } = useTrack();

	const handlCloseMenu = () => {
		setIsOpenMenu({
			trackId: '',
			isOpenMenu: false,
			position: {
				x: 0,
				y: 0,
			},
		});
	};

	const menuStyle = useMemo(() => {
		const style = {
			left: position.x,
			top: position.y + 16,
			width: menuWidth,
			height: menuHeight,
		};

		if (globalThis.window) {
			if (position.x + menuWidth > window.innerWidth) {
				style.left = position.x - menuWidth;
			}

			if (position.y + menuHeight > window.innerHeight) {
				style.top = position.y - menuHeight;
			}
		}

		return style;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpenMenu, menuHeight]);

	const setMenuRef = useCallback((node: HTMLDivElement) => {
		if (node !== null) {
			menuRef.current = node;
			setMenuHeight(node.scrollHeight);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClickAddTrackToQueue = () => {
		onAddTrackIdToQueueIds({
			trackId,
		});
		handlCloseMenu();
	};

	const handleClickDownloadTrack = () => {
		handlCloseMenu();
	};

	// const handleClickAddToPlaylist = () => {
	// 	handlCloseMenu();
	// };

	const handleShareTrack = () => {
		handlCloseMenu();
	};

	if (isOpenMenu) {
		return (
			<div className={trackMenuStyles.modal}>
				<div className={trackMenuStyles.modalMask} onClick={handlCloseMenu}></div>
				<div style={menuStyle} className={trackMenuStyles.modalMenu} ref={setMenuRef}>
					<Paper color="secondary" surfaceLevel={1}>
						<Stack verticalPadding="xsmall">
							<StateLayer color="primary" state={['hover']}>
								<UnstyledButton onClick={handleClickAddTrackToQueue}>
									<Group spacing="small" alignItems="center" horizontalPadding="small" verticalPadding="xsmall">
										<Typography variant="body">Thêm vào danh sách chờ</Typography>
									</Group>
								</UnstyledButton>
							</StateLayer>
							<StateLayer color="primary" state={['hover']}>
								<UnstyledButton onClick={handleClickDownloadTrack}>
									<Group spacing="small" alignItems="center" horizontalPadding="small" verticalPadding="xsmall">
										<Typography variant="body">Tải xuống</Typography>
									</Group>
								</UnstyledButton>
							</StateLayer>
							<StateLayer color="primary" state={['hover']}>
								<UnstyledButton onClick={handleShareTrack}>
									<Group spacing="small" alignItems="center" horizontalPadding="small" verticalPadding="xsmall">
										<Typography variant="body">Chia sẻ</Typography>
									</Group>
								</UnstyledButton>
							</StateLayer>
						</Stack>
					</Paper>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default TrackMenu;
