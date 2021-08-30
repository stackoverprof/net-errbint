import Link from '@components/_shared/Link';
import React from 'react';

const NavMenu = () => {
	return (
		<div className="w-full bg-red-300 flex-cc" style={{height: 60}}>
			<div className="container-14 flex-bc">
				<div className="flex-cc gap-2">
					<Link scroll={false} href="/">HOME</Link>
					<Link scroll={false} href="/about">ABOUT</Link>
					<Link scroll={false} href="/projects">PROJECTS</Link>
				</div>
				
				<div>haha</div>
			</div>
		</div>
	);
};

export default NavMenu;
