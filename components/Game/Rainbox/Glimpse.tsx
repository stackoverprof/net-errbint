/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface Props {
	etRef: React.MutableRefObject<HTMLImageElement>
	nrRef: React.MutableRefObject<HTMLImageElement>
	briRef: React.MutableRefObject<HTMLImageElement>
	skipIntro: boolean
}

const Glimpse = ({etRef, nrRef, briRef, skipIntro}: Props) => (
	<div className="absolute inset-0 full pointer-events-none">
		<img src="/img/glimpse/nr.webp" alt="glimpse" ref={nrRef} className="absolute top-0 transition-all duration-200 full object-cover object-top" style={{ zIndex: -4, opacity: skipIntro ? 0 : 1 }} />
		<img src="/img/glimpse/et.webp" alt="glimpse" ref={etRef} className="absolute top-0 transition-all duration-200 full object-cover object-top" style={{ zIndex: -4, opacity: skipIntro ? 0 : 1 }} />
		<img src="/img/glimpse/bri.webp" alt="glimpse" ref={briRef} className="absolute top-0 transition-all duration-200 full object-cover object-top" style={{ zIndex: -4, opacity: skipIntro ? 0 : 1 }} />
	</div>
);

export default Glimpse;
