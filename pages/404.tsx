import Link from '@components/_shared/Link';
import React from 'react';

const error404 = (): JSX.Element => {

	return (
		<div className="fullscreen flex-cc col">
			<h1 className="mb-4">404 | Not Found</h1>
			<Link href="/"><button className="px-4 py-2  text-black bg-white">BACK HOME</button></Link>
		</div>
	);
};


export default error404;