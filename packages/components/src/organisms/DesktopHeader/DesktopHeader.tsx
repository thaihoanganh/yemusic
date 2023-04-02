import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { UnstyledButton } from '../../atoms/Button';
import { Group } from '../../atoms/Frame';
import { ArrowBackIcon, ArrowForwardIcon, SettingsIcon } from '../../atoms/Icons';
import GithubIcon from '../../atoms/Icons/GithubIcon';
import { Paper } from '../../atoms/Paper';
import { DesktopSearch } from '../Search/DesktopSearch';

export const DesktopHeader = () => {
	const router = useRouter();
	const historyStateKeys = useRef<string[]>([]);
	const [canGoBack, setCanGoBack] = useState(false);
	const [canGoForward, setCanGoForward] = useState(false);

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

	function handleGoForward() {
		window.history.forward();
	}

	return (
		<Paper color="background">
			<Group
				style={{
					height: 72,
				}}
				spacing="medium"
				alignItems="center"
				horizontalPadding="large"
			>
				<Group spacing="medium" fillContainer>
					<UnstyledButton disabled={!canGoBack} onClick={handleGoBack}>
						<ArrowBackIcon color={canGoBack ? 'on-surface' : 'on-surface-variant'} />
					</UnstyledButton>
					<UnstyledButton disabled={!canGoForward} onClick={handleGoForward}>
						<ArrowForwardIcon color={canGoForward ? 'on-surface' : 'on-surface-variant'} />
					</UnstyledButton>
					<DesktopSearch />
				</Group>

				<Group spacing="large">
					<UnstyledButton>
						<SettingsIcon />
					</UnstyledButton>
					<Link href="https://github.com/thaihoanganh/yemusic" target="_blank">
						<UnstyledButton>
							<GithubIcon size="small" />
						</UnstyledButton>
					</Link>
				</Group>
			</Group>
		</Paper>
	);
};

export default DesktopHeader;
