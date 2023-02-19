import { themePaletteKeys } from '../Theme';

export interface TextBaseProps {
	color?: (typeof themePaletteKeys)[number];
	size?: 'small' | 'medium' | 'large';
}
