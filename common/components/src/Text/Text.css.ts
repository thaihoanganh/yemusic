import { styleVariants } from '@vanilla-extract/css';

import { themePaletteKeys } from '../Theme/theme.config';
import { themeVars } from '../Theme/Theme.css';

export const textColors = themePaletteKeys.filter(color => color.startsWith('on-'));

const createTextColorVariants = () => {
	const variants = textColors.reduce(
		(acc, type) => {
			acc[type] = {
				color: themeVars.palette[type],
			};
			return acc;
		},
		{} as Record<
			string,
			{
				color: string;
			}
		>
	);

	return variants;
};

export const textVariants = styleVariants({
	initial: {
		margin: 0,
		color: themeVars.palette['on-surface'],
	},
});

export const textColorVariants = styleVariants(createTextColorVariants());

export const textDisplayVariants = styleVariants({
	small: {
		fontSize: '36px',
		lineHeight: '44px',
		fontWeight: '400',
	},
	medium: {
		fontSize: '45px',
		lineHeight: '52px',
		fontWeight: '400',
	},
	large: {
		fontSize: '57px',
		lineHeight: '64px',
		fontWeight: '400',
	},
});

export const textHeadlineVariants = styleVariants({
	small: {
		fontSize: '24px',
		lineHeight: '32px',
		fontWeight: '400',
	},
	medium: {
		fontSize: '28px',
		lineHeight: '36px',
		fontWeight: '400',
	},
	large: {
		fontSize: '32px',
		lineHeight: '40px',
		fontWeight: '400',
	},
});

export const textTitleVariants = styleVariants({
	small: {
		fontSize: '14px',
		lineHeight: '20px',
		fontWeight: '400',
	},
	medium: {
		fontSize: '16px',
		lineHeight: '24px',
		fontWeight: '500',
	},
	large: {
		fontSize: '22px',
		lineHeight: '28px',
		fontWeight: '400',
	},
});

export const textBodyVariants = styleVariants({
	small: {
		fontSize: '12px',
		lineHeight: '16px',
		fontWeight: '400',
	},
	medium: {
		fontSize: '14px',
		lineHeight: '20px',
		fontWeight: '400',
	},
	large: {
		fontSize: '16px',
		lineHeight: '24px',
		fontWeight: '400',
	},
});

export const textLabelVariants = styleVariants({
	small: {
		fontSize: '11px',
		lineHeight: '16px',
		fontWeight: '500',
	},
	medium: {
		fontSize: '12px',
		lineHeight: '16px',
		fontWeight: '500',
	},
	large: {
		fontSize: '14px',
		lineHeight: '20px',
		fontWeight: '500',
	},
});
