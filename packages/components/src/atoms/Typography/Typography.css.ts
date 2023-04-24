import { styleVariants } from '@vanilla-extract/css';

import { themeTextPaletteKeys } from '../../Theme/theme.config';
import { themeVars } from '../../Theme/Theme.css';

const createTypographyColorStyles = () => {
	const variants = themeTextPaletteKeys.reduce(
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

export const typographyColorStyles = styleVariants({ ...createTypographyColorStyles() });

export const typographyTextAlignStyles = styleVariants({
	left: {
		textAlign: 'left',
	},
	center: {
		textAlign: 'center',
	},
	right: {
		textAlign: 'right',
	},
});

export const typographySizeStyles = {
	body: styleVariants({
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
	}),
	display: styleVariants({
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
	}),
	headline: styleVariants({
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
	}),
	label: styleVariants({
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
	}),
	title: styleVariants({
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
	}),
};

export const typographyOtherStyles = styleVariants({
	root: {
		margin: 0,
	},
	truncate: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
});
