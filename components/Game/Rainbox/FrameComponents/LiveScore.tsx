import React from 'react';
import { useLayout, useRainbox } from '@core/contexts';

const LiveScore = () => {
	const { score, gameStatus } = useRainbox();
	const { selectedTheme } = useLayout();

	return (
		<p className="absolute text-2xl top-4 left-5" style={{transition: '0.25s', opacity: gameStatus == 'ready' ? 0.75 : gameStatus == 'running' ? 1 : 0}}>
			<span className={`text-accent-${selectedTheme}`}>{score.food}</span>&nbsp;&nbsp;{score.time == 0 ? 0 : score.time / 100}
		</p>
	);
};

export default LiveScore;
