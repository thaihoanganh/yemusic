import React, { PropsWithChildren } from 'react';

import classNames from 'classnames';

import { loadingLayerStyles } from './LoadingLayer.css';

export interface LoadingLayerProps extends PropsWithChildren {
	fillContainer?: boolean;
	loading?: 'inherit' | boolean;
}

export const LoadingLayer = ({ children, fillContainer, loading }: LoadingLayerProps) => {
	return (
		<div
			className={classNames(
				loadingLayerStyles.wrapper,
				fillContainer && loadingLayerStyles.wrapperFillContainer,
				loading === true && loadingLayerStyles.wrapperLoading,
				loading === 'inherit' && loadingLayerStyles.wrapperLoadingInherit
			)}
		>
			<div
				className={classNames(
					loading === true && loadingLayerStyles.loading,
					loading === 'inherit' && loadingLayerStyles.loadingInherit
				)}
			>
				{children}
			</div>
		</div>
	);
};

export default LoadingLayer;
