/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';

import { sliderStyles } from './Slider.css';

export type SliderProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Slider = ({ defaultValue = 0, max, min, onChange, ...otherProps }: SliderProps) => {
	const sliderValueRef = useRef<HTMLDivElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) onChange(e);

		if (sliderValueRef.current && typeof max === 'number') {
			const value = (e.target as any).value;
			(sliderValueRef.current as any).style.width = `${(value / max) * 100}%`;
		}
	};

	return (
		<label className={sliderStyles.wrapper}>
			<input
				className={sliderStyles.sliderInput}
				type="range"
				min={min}
				max={max}
				defaultValue={defaultValue}
				onChange={handleChange}
				{...otherProps}
			/>
			<div className={sliderStyles.sliderValue} ref={sliderValueRef} />
		</label>
	);
};

export default Slider;
