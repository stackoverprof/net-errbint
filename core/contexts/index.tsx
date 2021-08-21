import React, { useContext } from 'react';
import LayoutStore from './layout';
import RainboxStore from './rainbox';
import { LayoutStoreType } from './layout.types';
import { RainboxStoreType } from './rainbox.types';

const AppContext = React.createContext(null);

interface Props {
	children: React.ReactNode
}

const AppProvider = ({children}: Props): JSX.Element => (
	<AppContext.Provider value={{
		layout: LayoutStore(),
		rainbox: RainboxStore()
	}}>
		{ children }
	</AppContext.Provider>
);

export default AppProvider;

export const useLayout = (): LayoutStoreType => useContext(AppContext).layout;
export const useRainbox= (): RainboxStoreType => useContext(AppContext).rainbox;