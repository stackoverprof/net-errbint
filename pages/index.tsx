import React from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import Rainbox from '@components/Game/Rainbox';
import { useLayout } from '@core/contexts/index';
import Link from '@components/_shared/Link';
 
const Index = (): JSX.Element => {
	const { setSelectedTheme } = useLayout();

	return (
		<MainLayout className="flex-sc col" transition="fade">
			<div className="relative w-full">
				<Rainbox />
			</div>
			<div className="flex-sc full col" style={{zIndex: 1}}>
				<div className="w-full bg-black text-white" style={{height: 2000}}>
					<button onClick={() => setSelectedTheme('orange')}>orange</button>
					<button onClick={() => setSelectedTheme('purple')}>purple</button>
					<button onClick={() => setSelectedTheme('green')}>green</button>
					<button onClick={() => setSelectedTheme('blue')}>blue</button>
					<Link href="/about">ABOUT</Link>
				</div>
			</div>
		</MainLayout>
	);
};


export default Index;
