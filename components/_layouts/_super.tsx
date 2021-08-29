import React from 'react';

import { AnimatePresence } from 'framer-motion';
import Rainbox from '@components/Game/Rainbox';

interface Props {
	children: React.ReactNode
}

const SuperLayout = ({children}: Props) => {
	return (
		<>
			<Rainbox />
			<div style={{zIndex: 1}} className="relative flex-sc col w-full bg-black">
				<AnimatePresence exitBeforeEnter>
					{children}
				</AnimatePresence>
			</div>
		</>
	);
};

export default SuperLayout;
