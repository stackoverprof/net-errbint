import React, { useContext } from 'react';
import RainboxStore from './rainbox';
import { RainboxStoreType } from './rainbox.types';

const RainboxContext = React.createContext(null);

interface Props {
	children: React.ReactNode
}

const RainboxProvider = ({children}: Props): JSX.Element => (
	<RainboxContext.Provider value={{
		...RainboxStore()
	}}>
		{ children }
	</RainboxContext.Provider>
);

export default RainboxProvider;

export const useRainbox = (): RainboxStoreType => useContext(RainboxContext);