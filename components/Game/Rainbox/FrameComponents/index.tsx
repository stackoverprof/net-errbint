import React from 'react';
import Dialogs from './Dialogs';
import Instruction from './Instruction';
import LiveCurrentPosition from './LiveCurrentPosition';
import LiveGameStatus from './LiveGameStatus';
import LiveScore from './LiveScore';

const FrameComponents = () => {
	return (
		<>
			<LiveScore />
			<LiveGameStatus />
			<LiveCurrentPosition />
			<Instruction />
			<Dialogs />
		</>
	);
};

export default FrameComponents;
