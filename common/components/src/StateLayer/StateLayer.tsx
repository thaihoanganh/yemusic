import { useCallback, useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { createThemeVars } from '../Theme/Theme.css';

import { stateLayerBackgroundVariants, stateLayers } from './StateLayer.css';

export interface StateLayer {
	isHover: boolean;
	isFocus: boolean;
	isPressed: boolean;
	isDragged: boolean;
}

export interface StateLayerProps {
	color: (typeof stateLayers)[number];
	state: ('hover' | 'focus' | 'pressed' | 'dragged')[];
	children: React.ReactNode | (({ isHover, isFocus, isPressed, isDragged }: StateLayer) => JSX.Element);
}

export const StateLayer = ({ children, color, state }: StateLayerProps) => {
	const [isHover, setIsHover] = useState(false);
	const [isFocus, setIsFocus] = useState(false);
	const [isPressed, setIsPressed] = useState(false);
	const [isDragged, setIsDragged] = useState(false);

	const stateLayerOpacity = isDragged ? '0.16' : isPressed ? '0.12' : isFocus ? '0.12' : isHover ? '0.08' : '0';

	const handleToggleState = useCallback((stateName: 'hover' | 'focus' | 'pressed' | 'dragged', status: boolean) => {
		switch (stateName) {
			case 'hover':
				if (state.includes('hover')) setIsHover(status);
				break;
			case 'focus':
				if (state.includes('focus')) setIsFocus(status);
				break;
			case 'pressed':
				if (state.includes('pressed')) setIsPressed(status);
				break;
			case 'dragged':
				if (state.includes('dragged')) setIsDragged(status);
				break;
			default:
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			style={assignInlineVars({
				[createThemeVars.stateLayerOpacity]: stateLayerOpacity,
			})}
			className={stateLayerBackgroundVariants[color]}
			onMouseEnter={() => handleToggleState('hover', true)}
			onMouseLeave={() => handleToggleState('hover', false)}
			onFocus={() => handleToggleState('focus', true)}
			onBlur={() => handleToggleState('focus', false)}
			onMouseDown={() => handleToggleState('pressed', true)}
			onMouseUp={() => handleToggleState('pressed', false)}
			onDragEnter={() => handleToggleState('dragged', true)}
			onDragLeave={() => handleToggleState('dragged', false)}
		>
			<div
				style={assignInlineVars({
					[createThemeVars.stateLayerOpacity]: '1',
				})}
			>
				{typeof children === 'function'
					? children({
							isHover,
							isFocus,
							isPressed,
							isDragged,
					  })
					: children}
			</div>
		</div>
	);
};

export default StateLayer;
// Docs: https://m3.material.io/foundations/interaction-states#f7e607d9-6636-4186-beeb-c214bce7d4b9
