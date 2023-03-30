import React, { cloneElement, isValidElement } from 'react';

import { useRouter } from 'next/router';

import { IconProps } from '../../atoms/Icons/Icon.types';
import Typography from '../../atoms/Typography/Typography';

import { navigationBarItemStyles } from './NavigationBar.css';

export interface NavigationBarItemProps {
	exact?: boolean;
	icon: React.ReactElement<IconProps>;
	iconActive: React.ReactElement<IconProps>;
	isActive?: boolean;
	label: string;
	to: string;
}

export const NavigationBarItem = ({ icon, iconActive, isActive, label, to }: NavigationBarItemProps) => {
	if (!isValidElement(icon) || !isValidElement(iconActive)) {
		throw new Error('NavigationBarItem: icon and iconActive must be valid elements');
	}

	const router = useRouter();

	const handleClick = () => {
		router.push(to);
	};

	return (
		<li className={navigationBarItemStyles.root} role="button" onClick={handleClick}>
			{cloneElement<IconProps>(isActive ? iconActive : icon, {
				color: isActive ? 'on-secondary-container' : 'on-surface-variant',
			})}
			<Typography color={isActive ? 'on-secondary-container' : 'on-surface-variant'} variant="label" size="small">
				{label}
			</Typography>
		</li>
	);
};

export default NavigationBarItem;
