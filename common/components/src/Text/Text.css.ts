import { styleVariants } from '@vanilla-extract/css';

import { themePaletteKeys } from '../Theme/theme.config';
import { themeVars } from '../Theme/Theme.css';

export const textColors = themePaletteKeys.filter(color => color.startsWith('on'));

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
		color: themeVars.palette.onSurface,
	},
});

export const textColorVariants = styleVariants(createTextColorVariants());

export const textDisplayVariants = styleVariants({
	small: {
		fontSize: '36px',
		lineHeight: '44px',
		fontWeight: 'regular',
	},
	medium: {
		fontSize: '45px',
		lineHeight: '52px',
		fontWeight: 'regular',
	},
	large: {
		fontSize: '57px',
		lineHeight: '64px',
		fontWeight: 'regular',
	},
});

export const textHeadlineVariants = styleVariants({
	small: {
		fontSize: '24px',
		lineHeight: '32px',
		fontWeight: 'regular',
	},
	medium: {
		fontSize: '28px',
		lineHeight: '36px',
		fontWeight: 'regular',
	},
	large: {
		fontSize: '32px',
		lineHeight: '40px',
		fontWeight: 'regular',
	},
});

export const textTitleVariants = styleVariants({
	small: {
		fontSize: '14px',
		lineHeight: '20px',
		fontWeight: 'regular',
	},
	medium: {
		fontSize: '16px',
		lineHeight: '24px',
		fontWeight: 'medium',
	},
	large: {
		fontSize: '22px',
		lineHeight: '28px',
		fontWeight: 'regular',
	},
});

export const textBodyVariants = styleVariants({
	small: {
		fontSize: '12px',
		lineHeight: '16px',
		fontWeight: 'regular',
	},
	medium: {
		fontSize: '14px',
		lineHeight: '20px',
		fontWeight: 'regular',
	},
	large: {
		fontSize: '16px',
		lineHeight: '24px',
		fontWeight: 'regular',
	},
});

export const textLabelVariants = styleVariants({
	small: {
		fontSize: '11px',
		lineHeight: '16px',
		fontWeight: 'medium',
	},
	medium: {
		fontSize: '12px',
		lineHeight: '16px',
		fontWeight: 'medium',
	},
	large: {
		fontSize: '14px',
		lineHeight: '20px',
		fontWeight: 'medium',
	},
});
