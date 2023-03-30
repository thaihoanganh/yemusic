import { styleVariants } from '@vanilla-extract/css';

export const trackContextMenuStyles = styleVariants({
	modal: {
		position: 'fixed',
		zIndex: 100,
		inset: 0,
	},
	modalMask: {
		position: 'absolute',
		inset: 0,
	},
	modalContent: {
		overflow: 'hidden',
		position: 'absolute',
	},
});
