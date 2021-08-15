import React, { useContext } from 'react';
import LayoutStore from './layout';
import { LayoutStoreType } from './layout.types';

const AppContext = React.createContext(null);

interface Props {
	children: React.ReactNode
}

const AppProvider = ({children}: Props): JSX.Element => (
	<AppContext.Provider value={{
		layout: LayoutStore()
	}}>
		{ children }
	</AppContext.Provider>
);

export default AppProvider;

export const useLayout = (): LayoutStoreType => useContext(AppContext).layout;