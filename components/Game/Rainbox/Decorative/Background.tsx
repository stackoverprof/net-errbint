import React from 'react';
import { useLayout, useRainbox } from '@core/contexts';

const Glimpse = () => {
	const { nrRef, etRef, briRef } = useRainbox();
	const { selectedTheme } = useLayout();
	return (
		<div className="absolute inset-0 full pointer-events-none">
			<img 
				src={`/img/glimpse/nr-${selectedTheme}.webp`} 
				alt="glimpse" 
				ref={nrRef} 
				className="absolute top-0 transition-all duration-200 full object-cover object-top" 
				style={{ zIndex: -4 }} 
			/>
			<img 
				src={`/img/glimpse/et-${selectedTheme}.webp`} 
				alt="glimpse" 
				ref={etRef} 
				className="absolute top-0 transition-all duration-200 full object-cover object-top" 
				style={{ zIndex: -4 }} 
			/>
			<img 
				src={`/img/glimpse/bri-${selectedTheme}.webp`} 
				alt="glimpse" 
				ref={briRef} 
				className="absolute top-0 transition-all duration-200 full object-cover object-top" 
				style={{ zIndex: -4 }} 
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
