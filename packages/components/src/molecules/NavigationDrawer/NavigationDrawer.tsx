import React, { Children, cloneElement, isValidElement } from 'react';

import { useRouter } from 'next/router';

import { Stack } from '../../atoms/Frame';

import { NavigationDrawerItemProps } from './NavigationDrawerItem';

export interface NavigationDrawerProps {
	children?: React.ReactElement<NavigationDrawerItemProps>[];
}

export const NavigationDrawer = ({ children }: NavigationDrawerProps) => {
	const router = useRouter();

	const navigationDrawerChildren = Children.map(children, child => {
		if (isValidElement(child)) {
			return cloneElement<NavigationDrawerItemProps>(child, {
				isActive: child.props.exact ? router.asPath === child.props.to : router.asPath.startsWith(child.props.to),
			});
		} else {
			throw new Error('NavigationDrawer: children must be valid elements');
		}
	});

	return (
		<Stack
			element="ul"
			style={{
				margin: 0,
				padding: 0,
			}}
		>
			{navigationDrawerChildren}
		</Stack>
	);
};

export default NavigationDrawer;
