import { Group } from '../../atoms/Frame';
import { Paper } from '../../atoms/Paper';
import { MobileSearch } from '../Search';

import { mobileHeader } from './MobileHeader.css';

const MobileSearchHeader = () => {
	return (
		<Paper color="primary" surfaceLevel={1}>
			<Group className={mobileHeader.root} spacing="small" alignItems="center" horizontalPadding="small">
				<MobileSearch />
			</Group>
		</Paper>
	);
};

export default MobileSearchHeader;
