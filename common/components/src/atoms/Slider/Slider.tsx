/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useRef } from 'react';

import { sliderStyles } from './Slider.css';

export type SliderProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Slider = ({ defaultValue = 0, max, min, value, onChange, ...otherProps }: SliderProps) => {
	const sliderValueRef = useRef<HTMLDivElement | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) onChange(e);

		if (sliderValueRef.current && typeof max === 'number') {
			const value = (e.target as any).value;
			(sliderValueRef.current as any).style.width = `${(value / max) * 100}%`;
		}
	};

	const setSliderValueRef = useCallback((node: HTMLDivElement) => {
		if (node) {
			sliderValueRef.current = node;

			if (sliderValueRef.current && typeof max === 'number' && typeof value === 'number') {
				(sliderValueRef.current as any).style.width = `${(value / max) * 100}%`;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<label className={sliderStyles.wrapper}>
			<input
				className={sliderStyles.sliderInput}
				type="range"
				min={min}
				max={max}
				value={value}
				defaultValue={defaultValue}
				onChange={handleChange}
				onInput={handleChange}
				{...otherProps}
			/>
			<div className={sliderStyles.sliderValue} ref={setSliderValueRef} />
		</label>
	);
};

export default Slider;
