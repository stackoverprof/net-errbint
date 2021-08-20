import React from 'react';
import Link from '@components/_shared/Link';

const Page404 = (): JSX.Element => {

	return (
		<div className="fullscreen flex-cc col">
			<h1 className="mb-4">404 | Not Found</h1>
			<Link href="/" className="px-4 py-2  text-black bg-white">BACK HOME</Link>
		</div>
	);
};


export default Page404;