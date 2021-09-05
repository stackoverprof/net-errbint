import Link from '@components/_shared/Link';
import { useLayout } from '@core/contexts';
import React, { useRef, useState } from 'react';

const NavMenu = () => {
	const { selectedTheme } = useLayout();
	const theme_switch = {
		orange: 'bg-gradient-to-r from-accent-orange-light to-accent-orange-dark',
		purple: 'bg-gradient-to-r from-accent-purple-light to-accent-purple-dark',
		green: 'bg-gradient-to-r from-accent-green-light to-accent-green-dark',
		blue: 'bg-gradient-to-r from-accent-blue-light to-accent-blue-dark',
	};

	return (
		<div className={['flex-cc w-full h-full', theme_switch[selectedTheme]].join(' ')} style={{height: 60}}>
			<div className="flex-bc h-full container-14">
				<SectionPointer />
				<ContactLinks />
			</div>
		</div>
	);
};

export default NavMenu;


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
					<div ref={childRef[i]} key={i} className="h-full">
						<Link href={item.route} onMouseEnter={() => setHovered(i)} className="flex-cc h-full px-3">{item.text}</Link>
					</div>
				))}
			</div>

			<div className="absolute h-10 bg-black bg-opacity-10 transition-all rounded-md" style={{left: getPrevDistance(hovered), transitionDuration: '0.25s', opacity: inside ? 1 : 0, width: childRef[hovered].current?.offsetWidth || 0}}></div>
		</div>
	);
}; 


const ContactLinks = () => (
	<div className="flex-cc gap-4">
		<Link href="https://github.com/stackoverprof/" target="_blank">
			<img src="/img/icons/contact-icons/github.svg" className="h-7 w-7" />
		</Link>
		<Link href="https://instagram.com/errbint" target="_blank">
			<img src="/img/icons/contact-icons/instagram.svg" className="h-7 w-7" />
		</Link>
		<Link href="https://wa.me/628988355006" target="_blank">
			<img src="/img/icons/contact-icons/whatsapp.svg" className="h-7 w-7" />
		</Link>
		<Link href="mailto:r.bintangbagus@gmail.com" target="_blank">
			<img src="/img/icons/contact-icons/email.svg" className="h-7 w-7" />
		</Link>
		<Link href="https://www.linkedin.com/in/raden-bintang" target="_blank">
			<img src="/img/icons/contact-icons/linkedin.svg" className="h-7 w-7" />
		</Link>
	</div>
);
