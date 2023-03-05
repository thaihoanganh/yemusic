import { themePaletteKeys } from '../../Theme/theme.config';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
	color?: (typeof themePaletteKeys)[number];
	size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}
