import { useRainbox } from '@core/contexts';
import React from 'react';
import useResize from 'use-resizing';

const SupertitleBack = () => {
	const { gameStatus } = useRainbox();
	const screen = useResize().width;

	return (
		<div className="fixed inset-0 flex-cc pb-40 pointer-events-none full" style={{ zIndex: -3 }}>
			<div className="absolute flex-cc col w-full">
				<div className="bg-center bg-no-repeat bg-contain" style={{ backgroundImage: 'url("/img/title/h1-dimm.svg")', maxWidth: 675, width: '90%', minWidth: 340, height: 200}}></div>
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
