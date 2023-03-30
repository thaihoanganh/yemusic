import React, { Children, cloneElement, isValidElement } from 'react';

import { useRouter } from 'next/router';

import { navigationBarStyles } from './NavigationBar.css';
import { NavigationBarItemProps } from './NavigationBarItem';

export interface NavigationDrawerProps {
	children?: React.ReactElement<NavigationBarItemProps>[];
}

export const NavigationBar = ({ children }: NavigationDrawerProps) => {
	const router = useRouter();

	const navigationDrawerChildren = Children.map(children, child => {
		if (isValidElement(child)) {
			return cloneElement<NavigationBarItemProps>(child, {
				isActive: child.props.exact ? router.pathname === child.props.to : router.pathname.startsWith(child.props.to),
			});
		} else {
			throw new Error('NavigationBar: children must be valid elements');
		}
	});

	return <ul className={navigationBarStyles.root}>{navigationDrawerChildren}</ul>;
};

export default NavigationBar;
