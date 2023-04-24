import React, { useContext } from 'react';

import { PlaylistsContext } from '@yemusic/providers';
import { useRouter } from 'next/router';

import { UnstyledButton } from '../../atoms/Button';
import { Group } from '../../atoms/Frame';
import { ArrowBackIcon } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';

import { mobileHeaderStyles } from './MobileHeader.css';

export const MobilePlaylistHeader = () => {
	const router = useRouter();
	const { playlists } = useContext(PlaylistsContext.Context);

	const playlist = playlists.find(playlist => playlist.slug === router.query.playlistSlug);

	return (
		<Group
			className={mobileHeaderStyles.root}
			spacing="small"
			alignItems="center"
			horizontalPadding="small"
			verticalPadding="small"
		>
			<UnstyledButton>
				<ArrowBackIcon />
			</UnstyledButton>
			<Typography variant="title">{playlist?.name}</Typography>
			<div />
		</Group>
	);
};

export default MobilePlaylistHeader;
