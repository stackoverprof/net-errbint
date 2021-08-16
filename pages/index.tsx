import React from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import Rainbox from '@components/Game/Rainbox';
import { useLayout } from '@core/contexts/index';
import Link from '@components/_shared/Link';
 
const Index = (): JSX.Element => {
	const { setSelectedTheme } = useLayout();

	return (
		<MainLayout title="" className="flex-sc col" transition="fade">
			<div className="relative w-full">
				<Rainbox skipIntro={false}/>
			</div>
			<div className="w-full h-96 bg-black text-white">
				<button onClick={() => setSelectedTheme('orange')}>orange</button>
				<button onClick={() => setSelectedTheme('purple')}>purple</button>
				<button onClick={() => setSelectedTheme('green')}>green</button>
				<button onClick={() => setSelectedTheme('blue')}>blue</button>
				<Link href="/about">ABOUT</Link>
			</div>
		</MainLayout>
	);
};


export default Index;
