import Link from '@components/_shared/Link';
import React, { useRef, useState } from 'react';
import ContactLinks from './ContactLinks';

const NavMenu = () => {
	return (
		<div className="flex-cc w-full h-full" style={{height: 60, background: 'linear-gradient(90deg, #FF9914 0%, #FF5B14 100%)'}}>
			<div className="flex-bc h-full container-14">
				<SectionPointer />
				<ContactLinks />
			</div>
		</div>
	);
};


const data_links = [
	{ route: '/#profile', text: 'Profile'},
	{ route: '/#abilities', text: 'Abilities'},
	{ route: '/#experience', text: 'Experience'},
	{ route: '/#contact', text: 'Contact'},
];

const SectionPointer = () => {
	const [inside, setInside] = useState(false);
	const [hovered, setHovered] = useState(0);
	
	const childRef = [useRef(null), useRef(null), useRef(null), useRef(null)];

	const getPrevDistance = (index) => {
		const widthlist: Array<number> = childRef.map(e => (e.current?.offsetWidth || 0));
		const distance = index ? widthlist.slice(0, index).reduce((p, c) => p + c) : 0;
		return distance;
	};
	
	return (
		<div className="relative flex-cc h-full -mx-3 text-xl text-white group" onMouseEnter={() => setInside(true)} onMouseLeave={() => setInside(false)}>
			<div className="z-10 h-full flex-cc">
				{data_links.map((item, i) => (
					<div ref={childRef[i]} key={i}>
						<Link href={item.route} onMouseEnter={() => setHovered(i)} className="flex-cc h-full px-3">{item.text}</Link>
					</div>
				))}
			</div>

			<div className="absolute h-10 bg-black bg-opacity-10 transition-all rounded-md" style={{left: getPrevDistance(hovered), transitionDuration: '0.25s', opacity: inside ? 1 : 0, width: childRef[hovered].current?.offsetWidth || 0}}></div>
		</div>
	);
}; 

export default NavMenu;
