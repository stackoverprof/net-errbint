import React from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import Link from '@components/_shared/Link';
import { useLayout } from '@core/contexts';

const Gears = (): JSX.Element => {
	const { setSelectedTheme, Alert } = useLayout();
	return (
		<MainLayout title="About" className="flex-sc col" transition="fade" scrollUp>
			<div className="w-full text-white mt-32" style={{height: 2000}}>
				<div className="flex-sc gap-2 text-xl text-white">
					<Link href="/">HOME</Link>
					<Link href="/about">ABOUT</Link>
					<Link href="/projects">PROJECTS</Link>
				</div>
					
				<div className="flex-cc bg-yellow-300">						
					<button onClick={() => setSelectedTheme('orange')}>orange</button>
					<button onClick={() => setSelectedTheme('purple')}>purple</button>
					<button onClick={() => setSelectedTheme('green')}>green</button>
					<button onClick={() => setSelectedTheme('blue')}>blue</button>
				</div>
				<button onClick={() => Alert({message: 'sdhjfbasuj'})}>alert</button>
			</div>
		</MainLayout>
	);
};

export default Gears;
