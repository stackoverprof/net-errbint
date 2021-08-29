import { useRainbox } from '@core/gameContext';
import React from 'react';
import useResize from 'use-resizing';

const SupertitleBack = () => {
	const { gameStatus } = useRainbox();
	const screen = useResize().width;

	return (
		<div className="fixed inset-0 flex-cc pb-40 pointer-events-none full" style={{ zIndex: -3 }}>
			<div className="absolute flex-cc col w-full">
				<img 
					src="/img/title/h1-dimm.svg" 
					alt="supertitle-back" 
					className="object-center object-contain" 
					style={{ maxWidth: 675, width: '90%', minWidth: 340, height: 200}} 
				/>
				
				<div className="relative flex-cc-container" style={{top: screen > 500 ? '-12px' : '-48px', minHeight: '38px'}}>
					<p className="pt-1 text-center transition-all" style={{ fontSize: screen > 500 ? 32 : 24, color: {'running': '#BBBBBB'}[gameStatus] || '#0000'}}>
						A CREATIVE DEVELOPER
					</p>
				</div>
			</div>
		</div>
	);
};

export default SupertitleBack;
