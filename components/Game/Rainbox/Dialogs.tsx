import { useRainbox } from '@core/contexts';
import React from 'react';

const Dialogs = () => {
	const { dialogAvoidRef, dialogOhnoRef } = useRainbox();

	return (
		<div className="absolute inset-0 flex-ce pointer-events-none full">
			<div className="absolute left-0 flex-cc pb-4 text-lg font-bold transition-all bg-center bg-no-repeat bg-cover opacity-0" 
				style={{backgroundImage: 'url("/img/dialog/avoid.svg")', bottom: 52, width: 261, height: 110}} 
				ref={dialogAvoidRef}
			>
				AVOID THE RAINBOX!
			</div>
			<div className="absolute left-0 flex-cc pb-4 text-xl font-bold transition-all bg-center bg-no-repeat bg-cover opacity-0" 
				style={{backgroundImage: 'url("/img/dialog/ohno.svg")', bottom: 52, width: 158, height: 110}} 
				ref={dialogOhnoRef}
			>
				OH NO!
			</div>
		</div>

	);
};

export default Dialogs;
