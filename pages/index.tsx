import React from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import Link from '@components/_shared/Link';
 
const Index = (): JSX.Element => {

	return (
		<MainLayout title="" className="flex-sc col" transition="fade">
			<h1 className="font-bold text-3xl font-bahn">Hello World</h1>
			<Link href="/about" className="px-4 py-2 text-base bg-primary" stroked>about</Link>
		</MainLayout>
	);
};


export default Index;
