import React from 'react';
import { useRainbox } from '@core/contexts';
interface Props {
	skipIntro: boolean
}

const Glimpse = ({skipIntro}: Props) => {
	const { nrRef, etRef, briRef } = useRainbox();
	return (
		<div className="absolute inset-0 full pointer-events-none">
			<img 
				src="/img/glimpse/nr.webp" 
				alt="glimpse" 
				ref={nrRef} 
				className="absolute top-0 transition-all duration-200 full object-cover object-top" 
				style={{ zIndex: -4, opacity: skipIntro ? 0 : 1 }} 
			/>
			<img 
				src="/img/glimpse/et.webp" 
				alt="glimpse" 
				ref={etRef} 
				className="absolute top-0 transition-all duration-200 full object-cover object-top" 
				style={{ zIndex: -4, opacity: skipIntro ? 0 : 1 }} 
			/>
			<img 
				src="/img/glimpse/bri.webp" 
				alt="glimpse" 
				ref={briRef} 
				className="absolute top-0 transition-all duration-200 full object-cover object-top" 
				style={{ zIndex: -4, opacity: skipIntro ? 0 : 1 }} 
			/>
			<img 
				src="/img/bg3d.webp" 
				alt="game-background" 
				className="absolute inset-0 full object-cover object-top" 
				style={{ zIndex: -5 }} 
			/>
		</div>
	);
};

export default Glimpse;
