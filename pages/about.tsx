import React from 'react';
import Link from '@components/_shared/Link';
import MainLayout from '@components/_layouts/MainLayout';

const About = (): JSX.Element => {

	return (
		<MainLayout title="About" className="flex-sc col" transition="fade">
			<h1 className="font-bold text-3xl font-bahn">About</h1>
			<Link href="/" className="px-4 py-2 text-black bg-white" stroked>home</Link>
		</MainLayout>
	);
};


export default About;