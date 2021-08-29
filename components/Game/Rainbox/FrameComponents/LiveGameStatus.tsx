import React from 'react';
import { useRainbox } from '@core/gameContext';

const LiveGameStatus = () => {
	const { gameStatus } = useRainbox();

	return (
		<p className="absolute text-xl right-5" style={{ top: 18, transition: '0.25s', opacity: gameStatus === 'ready' ? 0.25 : gameStatus === 'running' ? 0.50 : gameStatus === 'over' ? 0.50 : 0.15 }}>
			: : {gameStatus}
		</p>
	);
};

export default LiveGameStatus;
