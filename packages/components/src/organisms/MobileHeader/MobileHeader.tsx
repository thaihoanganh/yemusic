import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { UnstyledButton } from '../../atoms/Button';
import { Group } from '../../atoms/Frame';
import { ArrowBackIcon } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';

import { mobileHeaderStyles } from './MobileHeader.css';

export interface MobileHeaderProps {
	title: string;
}

export const MobileHeader = ({ title }: MobileHeaderProps) => {
	const router = useRouter();
	const historyStateKeys = useRef<string[]>([]);
	const [canGoBack, setCanGoBack] = useState(false);
	const [, setCanGoForward] = useState(false);

	useEffect(() => {
		historyStateKeys.current = [window.history.state.key];

		router.events.on('routeChangeComplete', () => {
			const currentHistoryStateKey = window.history.state.key;

			if (!historyStateKeys.current.includes(currentHistoryStateKey)) {
				historyStateKeys.current.push(currentHistoryStateKey);
			}

			setCanGoBack(currentHistoryStateKey !== historyStateKeys.current[0]);
			setCanGoForward(currentHistoryStateKey !== historyStateKeys.current[historyStateKeys.current.length - 1]);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleGoBack() {
		window.history.back();
	}

	return (
		<Group
			className={mobileHeaderStyles.root}
			spacing="small"
			alignItems="center"
			horizontalPadding="small"
			verticalPadding="small"
		>
			<UnstyledButton disabled={!canGoBack} onClick={handleGoBack}>
				<ArrowBackIcon />
			</UnstyledButton>
			<Typography variant="title">{title}</Typography>
			<div />
		</Group>
	);
};

export default MobileHeader;
