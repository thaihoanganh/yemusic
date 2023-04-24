import { useState } from 'react';

export function useAsync<IParamsAction extends unknown[], IReturnAction = unknown>({
	delay = 500,
	handler,
	onListener,
	onSuccess,
	onError,
}: {
	delay?: number;
	handler: (...params: IParamsAction) => Promise<IReturnAction>;
	onListener?: (isPending: boolean) => void;
	onSuccess?: (data: IReturnAction) => void;
	onError?: (error: unknown) => void;
}) {
	const [isPending, setIsPending] = useState(false);

	const execute = async (...params: IParamsAction) => {
		setIsPending(true);

		if (onListener) {
			onListener(true);
		}

		const timeStart = Date.now();

		return handler(...params)
			.then(returnAction => {
				setTimeout(() => {
					setIsPending(false);

					if (onListener) {
						onListener(false);
					}

					if (onSuccess) {
						onSuccess(returnAction);
					}
				}, Math.max(0, delay - (Date.now() - timeStart)));
			})
			.catch(error => {
				setTimeout(() => {
					setIsPending(false);

					if (onListener) {
						onListener(false);
					}

					if (onError) {
						onError(error);
					}
				}, Math.max(0, delay - (Date.now() - timeStart)));
			});
	};

	return {
		execute,
		isPending,
	};
}
