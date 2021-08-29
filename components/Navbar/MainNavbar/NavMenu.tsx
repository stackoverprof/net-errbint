import Link from '@components/_shared/Link';
import React from 'react';

const NavMenu = () => {
	return (
		<div className="w-full bg-red-300 flex-cc" style={{height: 60}}>
			<div className="container-14 flex-bc">
				<div className="flex-cc gap-2">
					<Link href="/">HOME</Link>
					<Link href="/about">ABOUT</Link>
					<Link href="/projects">PROJECTS</Link>
				</div>

				<div>haha</div>
			</div>
		</div>
	);
};

export default NavMenu;
