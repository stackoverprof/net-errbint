/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import SideLeaderBoard from './SideLeaderBoard';
import useResize from 'use-resizing';
import Canvas from './Canvas';
import Glimpse from './Decorative/Glimpse';
import { useRainbox } from '@core/contexts';
import SupertitleBack from './Decorative/SupertitleBack';
import SupertitleFront from './Decorative/SupertitleFront';
import FrameComponents from './FrameComponents';

interface Props {
	skipIntro: boolean
}

const Rainbox = ({ skipIntro }: Props) => {
	const { fireAction, gameStatus } = useRainbox();
	
	const screen = useResize().width;	

	useEffect(() => fireAction(), []);

	return (
		<div className="relative z-0 overflow-hidden" style={{ height: screen > 639 ? 'calc(100vh - 60px)' : 500}}>
			<div className="relative flex-sc col full bg-top bg-no-repeat bg-cover" style={{ zIndex: -5, backgroundImage: 'url("/img/bg3d.webp")'}}>
				<SupertitleBack />
				<Glimpse skipIntro={skipIntro} />
				<Canvas
					responsive={{
						width: window => window.innerWidth,
						height: window => window.innerWidth > 629 ? window.innerHeight - 60 : 500
					}}
					skipIntro={gameStatus === 'intro' ? skipIntro : true}
				/>
				<SupertitleFront skipIntro={skipIntro} />
			</div>

			<FrameComponents />
			<SideLeaderBoard />
		</div>
	);
};

export default Rainbox;
