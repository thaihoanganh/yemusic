import React, { createContext, PropsWithChildren, useState } from 'react';

export function createAppContext<IState>(initialState: IState): {
	Provider: ({ children }: PropsWithChildren) => JSX.Element;
	initial: React.Context<IState>;
	getState: () => IState;
	updateState: React.Dispatch<React.SetStateAction<IState>>;
} {
	const Context = createContext<IState>(initialState);

	let getState: IState;
	let updateState: React.Dispatch<React.SetStateAction<IState>>;

	const Provider = ({ children }: PropsWithChildren) => {
		const [state, setState] = useState<IState>(initialState);

		return (
			<Context.Provider value={state}>
				<Context.Consumer>
					{() => {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						getState = (Context as any)._currentValue;
						updateState = setState;

						return children;
					}}
				</Context.Consumer>
			</Context.Provider>
		);
	};

	return {
		Provider,
		initial: Context,
		getState: () => Object.freeze(getState),
		updateState: value => updateState(value),
	};
}

export default createAppContext;
