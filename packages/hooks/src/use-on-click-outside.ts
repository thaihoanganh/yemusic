import { RefObject, useEffect } from 'react';

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: Handler,
	mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
	useEffect(() => {
		window.addEventListener(mouseEvent, listener);
		return () => {
			window.removeEventListener(mouseEvent, listener);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const listener = (event: MouseEvent) => {
		const el = ref?.current;

		// Do nothing if clicking ref's element or descendent elements
		if (!el || el.contains(event.target as Node)) {
			return;
		}

		handler(event);
	};
}

export default useOnClickOutside;
