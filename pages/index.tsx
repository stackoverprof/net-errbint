import React from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import Link from '@components/_shared/Link';
import Rainbox from '@components/Game/Rainbox';
 
const Index = (): JSX.Element => {

	return (
		<MainLayout title="" className="flex-sc col" transition="fade">
			<div className="relative w-full h-screen bg-red-400">
				<Rainbox isInitialLoad={true} skipIntro={false}/>
			</div>
		</MainLayout>
	);
};


export default Index;
