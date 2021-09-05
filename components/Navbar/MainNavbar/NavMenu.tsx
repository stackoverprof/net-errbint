import Link from '@components/_shared/Link';
import React from 'react';
import ContactLinks from './ContactLinks';

const NavMenu = () => {
	return (
		<div className="w-full flex-cc" style={{height: 60, background: 'linear-gradient(90deg, #FF9914 0%, #FF5B14 100%)'}}>
			<div className="container-14 flex-bc">
				<div className="flex-cc gap-2">
					<Link scroll={false} href="/">HOME</Link>
					<Link scroll={false} href="/about">ABOUT</Link>
					<Link scroll={false} href="/projects">PROJECTS</Link>
				</div>
				
				<ContactLinks />
			</div>
		</div>
	);
};

export default NavMenu;
