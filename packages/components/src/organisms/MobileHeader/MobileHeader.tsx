import React from 'react';

import { UnstyledButton } from '../../atoms/Button';
import { Group } from '../../atoms/Frame';
import { ArrowBackIcon } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';

import { mobileHeaderStyles } from './MobileHeader.css';

export interface MobileHeaderProps {
	title: string;
}

export const MobileHeader = ({ title }: MobileHeaderProps) => {
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
			<Typography variant="title">{title}</Typography>
			<div />
		</Group>
	);
};

export default MobileHeader;
