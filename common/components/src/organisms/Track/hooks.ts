import { create } from 'zustand';

type TrackState = {
	trackId: string;
	isOpenMenu: boolean;
	position: {
		x: number;
		y: number;
	};
};

type TrackActions = {
	setIsOpenMenu: (isOpenMenuPayload: {
		trackId: string;
		isOpenMenu: boolean;
		position: {
			x: number;
			y: number;
		};
	}) => void;
};

export const useTrack = create<TrackState & TrackActions>(set => ({
	trackId: '',
	isOpenMenu: false,
	position: {
		x: 0,
		y: 0,
	},
	setIsOpenMenu: ({
		trackId,
		isOpenMenu,
		position,
	}: {
		isOpenMenu: boolean;
		trackId: string;
		position: {
			x: number;
			y: number;
		};
	}) => {
		set({
			trackId,
			isOpenMenu,
			position,
		});
	},
}));
