import { create } from 'zustand';

import { themeConfigs } from './theme.config';

interface UseTheme {
	theme: typeof themeConfigs;
}

export const useTheme = create<UseTheme>(() => ({
	theme: themeConfigs,
}));
