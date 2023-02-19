import { Paper } from '@yemusic/components';
import { ThemeProvider } from '@yemusic/components';

const index = () => {
	return (
		<ThemeProvider>
			<Paper
				style={{
					width: '100vw',
					height: '100vh',
				}}
				background="background"
			></Paper>
		</ThemeProvider>
	);
};

export default index;
