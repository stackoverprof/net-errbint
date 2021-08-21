import React from 'react';
import { useRainbox } from '@core/contexts';

const LiveCurrentPosition = () => {
	const { checkRank, gameStatus } = useRainbox();
	return (
		<div className="absolute flex-ce col text-gray-400 right-5" style={{top: 54,transition: '0.25s', opacity: gameStatus == 'running' ? 1 : 0}}>
			<p>CURRENT POSITION</p>
			<p className="text-accent">#{checkRank()}</p>
		</div>
	);
};

export default LiveCurrentPosition;
