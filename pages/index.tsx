import React from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import Rainbox from '@components/Game/Rainbox';
import { useLayout } from '@core/contexts/index';
 
const Index = (): JSX.Element => {
	const { selectedTheme, setSelectedTheme } = useLayout();

	return (
		<MainLayout title="" className="flex-sc col" transition="fade">
			<div className="relative w-full h-screen">
				<Rainbox isInitialLoad={true} skipIntro={false}/>
			</div>
			<div className="w-full h-96 bg-red-400">
				{selectedTheme}
				<button onClick={() => setSelectedTheme('orange')}>orange</button>
				<button onClick={() => setSelectedTheme('purple')}>purple</button>
				<button onClick={() => setSelectedTheme('green')}>green</button>
				<button onClick={() => setSelectedTheme('blue')}>blue</button>
			</div>
		</MainLayout>
	);
};


export default Index;
