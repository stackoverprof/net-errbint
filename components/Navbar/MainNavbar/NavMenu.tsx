import Link from '@components/_shared/Link';
import React from 'react';
import ContactLinks from './ContactLinks';

const NavMenu = () => {
	return (
		<div className="w-full flex-cc" style={{height: 60, background: 'linear-gradient(90deg, #FF9914 0%, #FF5B14 100%)'}}>
			<div className="container-14 flex-bc">
				<SectionPointer />
				
				<ContactLinks />
			</div>
		</div>
	);
};

const SectionPointer = () => (
	<div className="flex-cc gap-6 text-white text-xl">
		<Link href="/#profile">Profile</Link>
		<Link href="/#abilities">Abilities</Link>
		<Link href="/#experience">Experience</Link>
		<Link href="/#contact">Contact</Link>
	</div>
); 

export default NavMenu;
