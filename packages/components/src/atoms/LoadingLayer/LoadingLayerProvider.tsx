import { PropsWithChildren, useCallback, useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { createThemeVars } from '../../Theme/Theme.css';

import { loadingLayerProviderStyles } from './LoadingLayer.css';

export interface LoadingLayerProviderProps extends PropsWithChildren {
	isLoading?: boolean;
}

export const LoadingLayerProvider = ({ children, isLoading }: LoadingLayerProviderProps) => {
	const [loadingOpacity, setLoadingOpacity] = useState(0);

	const setLoadingProviderRef = useCallback(() => {
		if (isLoading) {
			// TODO: implement animation
			setLoadingOpacity(0.32);
		} else {
			setLoadingOpacity(1);
		}
	}, [isLoading]);

	return (
		<div
			style={assignInlineVars({
				[createThemeVars.stateLayerOpacity]: String(loadingOpacity),
			})}
			className={isLoading ? loadingLayerProviderStyles.loading : loadingLayerProviderStyles.noLoading}
			ref={setLoadingProviderRef}
		>
			{children}
		</div>
	);
};

export default LoadingLayerProvider;
