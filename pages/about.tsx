import React from 'react';
import Link from '@components/_shared/Link';

const About = (): JSX.Element => {

	return (
		<div className="fullscreen flex-cc col">
			<h1 className="mb-4">About here</h1>
			<Link href="/" className="px-4 py-2  text-black bg-white" stroked>BACK HOME</Link>
		</div>
	);
};


export default About;