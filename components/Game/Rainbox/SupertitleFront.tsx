import { useRainbox } from '@core/contexts';
import React from 'react';
import useResize from 'use-resizing';

interface Props {
	skipIntro: boolean
}

const SupertitleFront = ({ skipIntro }: Props) => {
	const { gameStatus, newGameBtnRef } = useRainbox();
	const screen = useResize().width;

	return (
		<div className="absolute inset-0 z-0 flex-cc pb-40 pointer-events-none full">
			<div className="absolute flex-cc col w-full">
				<div className={'transition-all bg-center bg-contain bg-no-repeat opacity-100'} style={{backgroundImage: 'url("/img/title/h1.svg")', maxWidth: 675, width: '90%',minWidth: 340, height: 200, transitionDuration: gameStatus === 'sub_intro' ? '2.5s' : '1s', opacity: { 'intro': '0', 'sub_intro': '1', 'ready': '1', 'over': '1', 'running': '0'}[gameStatus] || '1'}}></div>
				<div className="relative flex-cc transition-all" style={{zIndex: -4, top: screen > 500 ? '-12px' : '-48px', transition: skipIntro ? 'none' : gameStatus === 'running' || gameStatus === 'over' ? 'all 1s 2s, opacity 1s' : 'all 1s 2s', opacity: {intro: '0', running: '0'}[gameStatus] || '1', minHeight: '38px'}}>
					<p className="pt-1 text-center transition-all" style={{fontSize: screen > 500 ? 32 : 24, color: gameStatus == 'running' ? '#BBBBBB' :	gameStatus == 'over' ? 'black' : 'gray'}}>
						{{
							'over': 'GAME OVER',
							'recorded': 'SCORE SAVED'
						}[gameStatus] || 'A CREATIVE DEVELOPER' }
					</p>
					<button className="ml-3 pointer-events-auto" ref={newGameBtnRef} style={{display: gameStatus == 'over' || gameStatus == 'recorded' ? 'unset' : 'none', fontSize: screen < 500 ? 16 : ''}}>PLAY AGAIN</button>
				</div>
			</div>
		</div>
	);
};

export default SupertitleFront;