import React, { Children, cloneElement, isValidElement } from 'react';

import { useRouter } from 'next/router';

import { navigationBarStyles } from './NavigationBar.css';
import { NavigationBarItemProps } from './NavigationBarItem';

export interface NavigationDrawerProps {
	children?: React.ReactElement<NavigationBarItemProps>[];
}

export const NavigationBar = ({ children }: NavigationDrawerProps) => {
	const router = useRouter();
	const totalNavigationBarItem = Children.count(children);

	const navigationDrawerChildren = Children.map(children, child => {
		if (isValidElement(child)) {
			const navigationBarItemWidth = `calc(100% / ${totalNavigationBarItem})`;

			return cloneElement<NavigationBarItemProps>(child, {
				style: {
					width: navigationBarItemWidth,
					minWidth: navigationBarItemWidth,
				},
				isActive: child.props.exact ? router.asPath === child.props.to : router.pathname.startsWith(child.props.to),
			});
		} else {
			throw new Error('NavigationBar: children must be valid elements');
		}
	});

	return <ul className={navigationBarStyles.root}>{navigationDrawerChildren}</ul>;
};

export default NavigationBar;
