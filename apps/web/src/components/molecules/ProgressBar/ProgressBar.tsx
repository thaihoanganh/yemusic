import React, { FC, useEffect, useRef, useState } from 'react';

import abemClasses from '@utils/abemClasses';

import './style.scss';

export interface ProgressBarProps {
  isInteractive?: boolean;
  max: number;
  value: number;
  onChangeValue?: (newValue: number) => void;
}

type IProgressBarState = {
  isPressed: boolean;
  positionXStart: null | number;
};

const setProgressBarTransform = (progressBarRefElement: HTMLDivElement, value: number, max: number): void => {
  if (progressBarRefElement && value >= 0 && value <= max) {
    progressBarRefElement.style.setProperty('--progress-bar-transform', (value / max) * 100 + '%');
  }
};

export const ProgressBar: FC<ProgressBarProps> = ({ isInteractive, max, value, onChangeValue }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<IProgressBarState>({
    isPressed: false,
    positionXStart: null,
  });

  useEffect(() => {
    if (progressBarRef.current) {
      setProgressBarTransform(progressBarRef.current, value, max);
    }
  }, [max, value]);

  useEffect(() => {
    if (state.isPressed) {
      window.addEventListener('mouseup', handlePressUp);
      window.addEventListener('mousemove', handleDragMove);
    }

    return () => {
      if (state.isPressed) {
        window.removeEventListener('mouseup', handlePressUp);
        window.removeEventListener('mousemove', handleDragMove);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isPressed]);

  const handlePressDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isInteractive) {
      setState(prevState => ({
        ...prevState,
        isPressed: true,
        positionXStart: e.nativeEvent.clientX,
      }));

      if (progressBarRef.current) {
        progressBarRef.current.classList.toggle('-is-draging');
      }
    }
  };

  const handlePressUp = (e: MouseEvent) => {
    setState(prevState => ({
      ...prevState,
      isPressed: false,
      positionXStart: null,
    }));

    if (progressBarRef.current) {
      const { offsetLeft, offsetWidth } = progressBarRef.current;
      const { clientX } = e;

      progressBarRef.current.classList.toggle('-is-draging');
      setProgressBarTransform(progressBarRef.current, clientX - offsetLeft, offsetWidth);

      if (onChangeValue) {
        let newvalue = ((clientX - offsetLeft) / offsetWidth) * max;
        newvalue = newvalue < 0 ? 0 : newvalue > max ? max : newvalue;

        onChangeValue(newvalue);
      }
    }
  };

  const handleDragMove = (e: MouseEvent) => {
    if (progressBarRef.current && state.positionXStart) {
      const { offsetLeft, offsetWidth } = progressBarRef.current;

      setProgressBarTransform(progressBarRef.current, e.clientX - offsetLeft, offsetWidth);
    }
  };

  return (
    <div
      className={abemClasses('m-progress-bar', isInteractive && 'is-interactive')}
      onMouseDown={handlePressDown}
      ref={progressBarRef}
    >
      <div className="m-progress-bar_value" />
    </div>
  );
};

export default ProgressBar;
