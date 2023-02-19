import { createContext, useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { createThemeVars } from '../Theme/Theme.css';

import { stateLayerBackgroundVariants, stateLayers } from './StateLayer.css';

export interface StateLayer {
	color: (typeof stateLayers)[number];
	state: ('hover' | 'focus' | 'pressed' | 'dragged')[];
	children: ({ isHover, isFocus, isPressed, isDragged }: StateLayerContextValue) => JSX.Element;
}

export interface StateLayerContextValue {
	isHover: boolean;
	isFocus: boolean;
	isPressed: boolean;
	isDragged: boolean;
}

export const StateLayerContext = createContext<StateLayerContextValue>({
	isHover: false,
	isFocus: false,
	isPressed: false,
	isDragged: false,
});

export const StateLayer = ({ children, color }: StateLayer) => {
	const [isHover, setIsHover] = useState(false);
	const [isFocus, setIsFocus] = useState(false);
	const [isPressed, setIsPressed] = useState(false);
	const [isDragged, setIsDragged] = useState(false);

	const stateLayerOpacity = isDragged ? '0.16' : isPressed ? '0.12' : isFocus ? '0.12' : isHover ? '0.08' : '0';

	return (
		<StateLayerContext.Provider
			value={{
				isHover,
				isFocus,
				isPressed,
				isDragged,
			}}
		>
			<div
				style={assignInlineVars({
					[createThemeVars.stateLayerOpacity]: stateLayerOpacity,
				})}
				className={stateLayerBackgroundVariants[color]}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onMouseDown={() => setIsPressed(true)}
				onMouseUp={() => setIsPressed(false)}
				onDragEnter={() => setIsDragged(true)}
				onDragLeave={() => setIsDragged(false)}
			>
				<div
					style={assignInlineVars({
						[createThemeVars.stateLayerOpacity]: '1',
					})}
				>
					<StateLayerContext.Consumer>{children}</StateLayerContext.Consumer>
				</div>
			</div>
		</StateLayerContext.Provider>
	);
};

export default StateLayer;

// Docs: https://m3.material.io/foundations/interaction-states#f7e607d9-6636-4186-beeb-c214bce7d4b9
