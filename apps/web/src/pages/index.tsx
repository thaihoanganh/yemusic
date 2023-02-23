import { Paper, StateLayer, TextHeadline, ThemeProvider, UnstyledButton, useTheme } from '@yemusic/components';

function getRandomHexColor() {
	const hexChars = '0123456789ABCDEF';
	let hex = '#';
	for (let i = 0; i < 6; i++) {
		hex += hexChars[Math.floor(Math.random() * 16)];
	}
	return hex;
}

const index = () => {
	const { onSetThemeFromSourceColor } = useTheme();

	return (
		<ThemeProvider>
			<StateLayer color="secondary-container" state={['hover', 'pressed']}>
				{({ isHover, isPressed }) => (
					<Paper
						style={{
							display: 'flex',
							justifyContent: 'center',
							gap: '2rem',
							alignItems: 'center',
							width: '100vw',
							height: '100vh',
						}}
						background="secondary-container"
					>
						<UnstyledButton
							onClick={() => {
								onSetThemeFromSourceColor({
									dynamicColor: getRandomHexColor(),
									primaryColor: getRandomHexColor(),
								});
							}}
						>
							<TextHeadline color="on-secondary-container">Dynamic Theme, Click !!!</TextHeadline>
						</UnstyledButton>

						<Paper
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '15rem',
								height: '15rem',
							}}
							background="tertiary-container"
						>
							<TextHeadline color="on-tertiary-container">Primary Container</TextHeadline>
						</Paper>
					</Paper>
				)}
			</StateLayer>
		</ThemeProvider>
	);
};

export default index;
