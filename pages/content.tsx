import React from 'react';
import MainLayout from '@components/_layouts/MainLayout';

const Content = (): JSX.Element => {
	return (
		<MainLayout title="About" className="flex-sc col" transition="fade" scrollUp>
			<div className="w-full bg-black text-white" style={{height: 2000}}>
				<div className="flex-cs pt-24 gap-2 h-full">
					INI Content		Blog dan Solution		
				</div>
			</div>
		</MainLayout>
	);
};

export default Content;
