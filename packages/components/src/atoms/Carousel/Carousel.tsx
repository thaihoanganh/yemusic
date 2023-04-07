import React, { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { UnstyledButton } from '../Button';
import { ArrowBackIcon, ArrowForwardIcon } from '../Icons';
import { StateLayer } from '../StateLayer';

import { carouselStyles } from './Carousel.css';

export interface CarouselProps {
	children?: React.ReactElement | React.ReactElement[];
	spacing?: number;
	isScrollable?: boolean;
}

const Carousel = ({ children, isScrollable, spacing = 16 }: CarouselProps) => {
	const carouselContentRef = useRef<null | HTMLDivElement>(null);
	const [firstItemIndex, setFirstItemIndex] = useState(0);
	const [canNavigationNext, setCanNavigationNext] = useState(false);

	const carouselChildren = Children.map(children, child => {
		if (isValidElement(child)) {
			return cloneElement(child);
		} else {
			throw new Error('Carousel: children must be valid elements');
		}
	});

	useEffect(() => {
		if (carouselContentRef.current) {
			const carouselContentWrapperlWidth = carouselContentRef.current.parentElement?.clientWidth || 0;
			const carouselContentWidth = carouselContentRef.current.scrollWidth || 0;

			if (carouselContentWidth > carouselContentWrapperlWidth) {
				setCanNavigationNext(true);
			}
		}
	}, []);

	const lastCarouselItemWidth = carouselContentRef.current?.lastElementChild?.clientWidth || 0;
	const carouselContentWrapperlWidth = carouselContentRef.current?.parentElement?.clientWidth || 0;
	const carouselContentWidth = carouselContentRef.current?.scrollWidth || 0;

	const handleNavigationNext = () => {
		if (carouselContentRef.current) {
			const nextFirstCarouselItemIndex = firstItemIndex + 1;

			let translateXvalue = 0;
			for (let i = 0; i < nextFirstCarouselItemIndex; i++) {
				translateXvalue += carouselContentRef.current.children[i].clientWidth + spacing;
			}

			const otherCarouselItemsWidth = carouselContentWidth - translateXvalue - carouselContentWrapperlWidth;

			if (otherCarouselItemsWidth < lastCarouselItemWidth) {
				translateXvalue += otherCarouselItemsWidth;
				setCanNavigationNext(false);
			}

			carouselContentRef.current.style.transform = `translateX(-${translateXvalue}px)`;
			setFirstItemIndex(nextFirstCarouselItemIndex);
		}
	};

	const handleNavigationPrevius = () => {
		if (!carouselContentRef.current) {
			return;
		}

		const nextFirstCarouselItemIndex = firstItemIndex - 1;

		let translateXvalue = 0;
		for (let i = 0; i < nextFirstCarouselItemIndex; i++) {
			translateXvalue += carouselContentRef.current.children[i].clientWidth + spacing;
		}

		const otherCarouselItemsWidth = carouselContentWidth - translateXvalue - carouselContentWrapperlWidth;

		if (otherCarouselItemsWidth > 0) {
			setCanNavigationNext(true);
		}

		carouselContentRef.current.style.transform = `translateX(-${translateXvalue}px)`;
		setFirstItemIndex(nextFirstCarouselItemIndex);
	};

	const canNavigationPrevius = firstItemIndex > 0;

	return (
		<StateLayer state={['hover']}>
			{({ isHover }) => (
				<div className={carouselStyles.root}>
					<div className={classNames(carouselStyles.wrapper, isScrollable && carouselStyles.wrapperScrollable)}>
						<div
							style={{
								gap: spacing,
							}}
							className={carouselStyles.content}
							ref={carouselContentRef}
						>
							{carouselChildren}
						</div>
					</div>
					{!isScrollable && isHover && canNavigationPrevius && (
						<div className={carouselStyles.navigationPrevius}>
							<UnstyledButton onClick={handleNavigationPrevius}>
								<ArrowBackIcon />
							</UnstyledButton>
						</div>
					)}
					{!isScrollable && isHover && canNavigationNext && (
						<div className={carouselStyles.navigationNext}>
							<UnstyledButton onClick={handleNavigationNext}>
								<ArrowForwardIcon />
							</UnstyledButton>
						</div>
					)}
				</div>
			)}
		</StateLayer>
	);
};

export default Carousel;
