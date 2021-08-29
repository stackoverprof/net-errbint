import { useLayout, useRainbox } from '@core/contexts';
import React from 'react';
import useResize from 'use-resizing';
import { useScrollYPosition } from 'react-use-scroll-position';

const SupertitleFront = () => {
	const { gameStatus, newGameBtnRef } = useRainbox();
	const screen = useResize().width;
	const screen_height = useResize().height;
	const scroll = useScrollYPosition();

	const { selectedTheme } = useLayout();

	const opacityChange = (screen_height/2 - scroll ) / (screen_height/2);

	return (
		<div className="fixed inset-0 z-0 flex-cc pb-40 pointer-events-none full" style={{opacity: opacityChange >= 0 && opacityChange <= 1 ? opacityChange : 'unset'}}>
			<div className="absolute flex-cc col w-full">
				<img 
					src={`/img/title/h1-${selectedTheme}.svg`} 
					alt="supertitle-front" 
					className="transition-all object-center object-contain opacity-100" 
					style={{ maxWidth: 675, width: '90%', minWidth: 340, height: 200, transitionDuration: gameStatus === 'sub_intro' ? '2.5s' : '1s', opacity: { intro: '0', sub_intro: '1', ready: '1', over: '1', running: '0'}[gameStatus] || '1'}}
				/>

				<div className="relative flex-cc transition-all" style={{ zIndex: -1,  top: screen > 500 ? '-12px' : '-48px',  transition: {intro: 'none', ready: 'none'}[gameStatus] || 'opacity 1s',  opacity: {intro: '0', running: '0'}[gameStatus] || '1',  minHeight: '38px' }} >
					<p className="pt-1 text-center transition-all" style={{fontSize: screen > 500 ? 32 : 24, color: gameStatus === 'running' ? '#BBBBBB' :	gameStatus === 'over' ? 'black' : 'gray'}}>
						{{ over: 'GAME OVER', recorded: 'SCORE SAVED' }[gameStatus] || 'A CREATIVE DEVELOPER' }
					</p>
					
					<button className="ml-3 pointer-events-auto" ref={newGameBtnRef} style={{display: gameStatus === 'over' || gameStatus === 'recorded' ? 'unset' : 'none', fontSize: screen < 500 ? 16 : ''}}>
						PLAY AGAIN
					</button>
				</div>
			</div>
		</div>
	);
};

export default SupertitleFront;
