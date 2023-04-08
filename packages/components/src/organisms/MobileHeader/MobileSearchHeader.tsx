import { Group } from '../../atoms/Frame';
import { Paper } from '../../atoms/Paper';
import { MobileSearch } from '../Search';

import { mobileHeaderStyles } from './MobileHeader.css';

export const MobileSearchHeader = () => {
	return (
		<Paper color="primary" surfaceLevel={1}>
			<Group className={mobileHeaderStyles.root} spacing="small" alignItems="center" horizontalPadding="small">
				<MobileSearch />
			</Group>
		</Paper>
	);
};

export default MobileSearchHeader;
