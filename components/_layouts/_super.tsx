import React from 'react';

import { AnimatePresence } from 'framer-motion';
import Rainbox from '@components/Game/Rainbox';
import RainboxProvider from '@core/contexts/rainbox';
import MainNavbar from '@components/Navbar/MainNavbar';

interface Props {
	children: React.ReactNode
}

const SuperLayout = ({children}: Props) => {
	return (
		<>
			<RainboxProvider>
				<Rainbox />
			</RainboxProvider>
			
			<div style={{zIndex: 1}} className="relative flex-sc col w-full bg-black">
				<MainNavbar />
				<AnimatePresence exitBeforeEnter>
					{children}
				</AnimatePresence>
			</div>
		</>
	);
};

export default SuperLayout;
