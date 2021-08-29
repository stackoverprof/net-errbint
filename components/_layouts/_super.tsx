import React from 'react';

import { AnimatePresence } from 'framer-motion';
import Rainbox from '@components/Game/Rainbox';

interface Props {
	children: React.ReactNode
}

const SuperLayout = ({children}: Props) => {
	return (
		<div className="flex-sc col w-full">
			<Rainbox />
			<AnimatePresence exitBeforeEnter>
				{children}
			</AnimatePresence>
		</div>
	);
};

export default SuperLayout;
