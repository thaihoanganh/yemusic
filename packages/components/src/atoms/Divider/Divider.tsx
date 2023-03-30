import { dividerOrientationStyles } from './Divider.css';

export interface DividerProps {
	orientation?: 'vertical' | 'horizontal';
}

export const Divider = ({ orientation = 'horizontal' }: DividerProps) => {
	return <div className={dividerOrientationStyles[orientation]} />;
};

export default Divider;
