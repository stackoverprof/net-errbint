import React from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import Rainbox from '@components/Game/Rainbox';
 
const Index = (): JSX.Element => {

	return (
		<MainLayout title="" className="flex-sc col" transition="fade">
			<div className="relative w-full h-screen">
				<Rainbox isInitialLoad={true} skipIntro={false}/>
			</div>
			<div className="w-full h-96 bg-red-400">

			</div>
		</MainLayout>
	);
};


export default Index;
