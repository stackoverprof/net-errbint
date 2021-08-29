import React, { useEffect } from 'react';
import SideLeaderBoard from './SideLeaderBoard';
import useResize from 'use-resizing';
import Canvas from './Canvas';
import Background from './Decorative/Background';
import { useRainbox } from '@core/contexts';
import SupertitleBack from './Decorative/SupertitleBack';
import SupertitleFront from './Decorative/SupertitleFront';
import FrameComponents from './FrameComponents';

const Rainbox = () => {
	const { fireAction, gameStatus } = useRainbox();
	
	const screen = useResize().width;	

	useEffect(() => fireAction(), []);

	return (
		<div className="relative w-full z-0" style={{ height: screen > 639 ? 'calc(100vh - 60px)' : 500}}>
			<div className="relative flex-sc col full">
				<SupertitleBack />
				<Background />
				<Canvas
					skipIntro={gameStatus !== 'intro'}
					responsive={{
						width: window => window.innerWidth,
						height: window => window.innerWidth > 629 ? window.innerHeight - 60 : 500
					}}
				/>
				<SupertitleFront />
			</div>

			<FrameComponents />
			<SideLeaderBoard />
		</div>
	);
};

export default Rainbox;
