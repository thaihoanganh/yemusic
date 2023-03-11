import { cloneElement, isValidElement } from 'react';

import { useRouter } from 'next/router';

import { UnstyledButton } from '../../atoms/Button';
import Frame, { Group } from '../../atoms/Frame';
import { IconProps } from '../../atoms/Icons/Icon.types';
import { Paper } from '../../atoms/Paper';
import { StateLayer } from '../../atoms/StateLayer';
import Typography from '../../atoms/Typography/Typography';

export interface NavigationDrawerItemProps {
	exact?: boolean;
	icon: React.ReactElement<IconProps>;
	iconActive: React.ReactElement<IconProps>;
	isActive?: boolean;
	label: string;
	to: string;
}

export const NavigationDrawerItem = ({ icon, iconActive, isActive, label, to }: NavigationDrawerItemProps) => {
	if (!isValidElement(icon) || !isValidElement(iconActive)) {
		throw new Error('NavigationDrawerItem: icon and iconActive must be valid elements');
	}

	const router = useRouter();

	const handleClick = () => {
		router.push(to);
	};

	return (
		<Frame element="li" cornerRadius="small">
			<Paper color={isActive ? 'secondary-container' : undefined}>
				<StateLayer state={['hover', 'pressed']}>
					{({ isHover }) => (
						<UnstyledButton onClick={handleClick} fullWidth>
							<Group
								style={{
									height: 48,
									borderRadius: 16,
								}}
								spacing="medium"
								alignItems="center"
								horizontalPadding="small"
							>
								{cloneElement<IconProps>(isActive ? iconActive : icon, {
									color: isActive ? 'on-secondary-container' : isHover ? 'on-surface' : 'on-surface-variant',
								})}
								<Typography
									color={isActive ? 'on-secondary-container' : isHover ? 'on-surface' : 'on-surface-variant'}
									variant="label"
									size="large"
								>
									{label}
								</Typography>
							</Group>
						</UnstyledButton>
					)}
				</StateLayer>
			</Paper>
		</Frame>
	);
};

export default NavigationDrawerItem;
