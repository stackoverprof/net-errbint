import React from 'react';
import AnimatedNumber from 'animated-number-react';
import useResize from 'use-resizing';
import { useLayout, useRainbox } from '@core/contexts';

const Instruction = () => {
	const { score, animateValue, gameStatus } = useRainbox();

	const { selectedTheme } = useLayout();

	const screen = useResize().width;

	return (
		<div className="absolute inset-0 pointer-events-none flex-ce full text-gray-600 pb-4">
			{{
				'over' : (
					<p className="flex-sc w-40 gap-2 whitespace-nowrap">
						<span className={['text-xl', `text-accent-${selectedTheme}`].join(' ')}>Food : {score.food}</span>
						<span className="text-xl text-black fixed-size">Time : <AnimatedNumber value={animateValue} formatValue={(value) => `${(Number(value) / 1000).toFixed(2)}`} duration={1000} easing={'linear'} /></span>
					</p>
				),
				'ready': (
					<div className="w-full flex-cc -sm:flex-ec -sm:w-9/12">
						<p className={`text-gray-500 font-medium text-lg -sm:w-48 -sm:text-right -sm:text-sm ${screen < 600 && 'instruction-mobile'}`}>Touch the screen <span className="text-gray-300">/</span> use arrow key to move</p>
					</div>
				),
				'recorded': (
					<p className={`text-gray-500 font-medium text-lg ${screen < 600 && 'instruction-mobile'}`}>Press ENTER <span className="text-gray-300">/</span> click the button to play again</p>
				),
			}[gameStatus]}
		</div>
	);
};

export default Instruction;
