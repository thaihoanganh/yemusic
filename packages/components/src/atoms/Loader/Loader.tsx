import classNames from 'classnames';

import { themePaletteKeys } from '../../Theme/theme.config';

import { loaderColorStyles, loaderSizeStyles, loaderStyles } from './Loader.css';

export interface LoaderProps {
	color?: (typeof themePaletteKeys)[number];
	size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}

export const Loader = ({ color = 'primary', size = 'medium' }: LoaderProps) => {
	return <div className={classNames(loaderStyles.root, loaderColorStyles[color], loaderSizeStyles[size])} />;
};

export default Loader;
