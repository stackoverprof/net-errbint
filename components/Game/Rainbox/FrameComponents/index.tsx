import React from 'react';
import Dialogs from './Dialogs';
import Instruction from './Instruction';
import LiveCurrentPosition from './LiveCurrentPosition';
import LiveGameStatus from './LiveGameStatus';
import LiveScore from './LiveScore';

const FrameComponents = () => {
	return (
		<div className="absolute full inset-0">
			<LiveScore />
			<LiveGameStatus />
			<LiveCurrentPosition />
			<Instruction />
			<Dialogs />
		</div>
	);
};

export default FrameComponents;
