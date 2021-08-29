import Link from '@components/_shared/Link';
import React from 'react';

const Navbar = () => {

	return (
		<div className="w-full bg-blue-300 flex-cc" style={{height: 60}}>
			<div className="container-14 flex-bc">
				<div>haha</div>

				<div className="flex-cc gap-2">
					<Link href="/">HOME</Link>
					<Link href="/about">ABOUT</Link>
					<Link href="/projects">PROJECTS</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
