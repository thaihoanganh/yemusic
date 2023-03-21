import React, { createContext, PropsWithChildren, useState } from 'react';

export function createSingletonAppContext<IState>(initialState: IState) {
	const Context = createContext<IState>(initialState);

	let state: IState;
	let updateState: React.Dispatch<React.SetStateAction<IState>>;

	const Provider = ({ children }: PropsWithChildren) => {
		const [_state, setState] = useState<IState>(initialState);

		return (
			<Context.Provider value={_state}>
				<Context.Consumer>
					{() => {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						state = (Context as any)._currentValue;
						updateState = setState;

						return children;
					}}
				</Context.Consumer>
			</Context.Provider>
		);
	};

	return {
		Provider,
		Context,
		getState: () => Object.freeze(state),
		updateState: ((value: IState) => updateState(value)) as React.Dispatch<React.SetStateAction<IState>>,
		withProvider: <P,>(Component: React.ComponentType<P>) => {
			return ({ ...props }: PropsWithChildren & P) => {
				return (
					<Provider>
						<Component {...props} />
					</Provider>
				);
			};
		},
	};
}

export default createSingletonAppContext;
