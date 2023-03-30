import React, { useCallback, useRef, useState } from 'react';

import { sliderStyles } from './Slider.css';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
	onUpdateValue?: (value: number) => void;
}

let isDragging = false;

export const Slider = ({ max, min, value, onChange, onUpdateValue, ...otherProps }: SliderProps) => {
	const sliderInputRef = useRef<HTMLInputElement | null>(null);
	const sliderValueRef = useRef<HTMLDivElement | null>(null);

	const [inputValue, setInputValue] = useState(value);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e);
		}

		const value = e.target.valueAsNumber;

		if (onUpdateValue && !isDragging) {
			onUpdateValue(value);
		}

		if (sliderValueRef.current && typeof max === 'number') {
			sliderValueRef.current.style.width = `${(value / max) * 100}%`;
		}

		setInputValue(value);
	};

	const handleDraggingStop = () => {
		isDragging = false;

		if (sliderInputRef.current && onUpdateValue) {
			onUpdateValue(sliderInputRef.current.valueAsNumber);
			setInputValue(sliderInputRef.current.valueAsNumber);
		}
	};

	const setSliderValueRef = useCallback(
		(node: HTMLDivElement) => {
			if (node) {
				sliderValueRef.current = node;

				if (sliderInputRef.current && typeof max === 'number') {
					sliderValueRef.current.style.width = `${(sliderInputRef.current.valueAsNumber / max) * 100}%`;
				}
			}

			if (!isDragging) {
				setInputValue(value);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[value]
	);

	return (
		<label className={sliderStyles.wrapper}>
			<input
				ref={sliderInputRef}
				className={sliderStyles.sliderInput}
				type="range"
				step={1}
				min={min}
				max={max}
				value={inputValue}
				onChange={handleChange}
				onMouseDown={() => {
					isDragging = true;
				}}
				onMouseUp={handleDraggingStop}
				onTouchStart={() => {
					isDragging = true;
				}}
				onTouchEnd={handleDraggingStop}
				{...otherProps}
			/>
			<div className={sliderStyles.sliderValue} ref={setSliderValueRef} />
		</label>
	);
};

export default Slider;
