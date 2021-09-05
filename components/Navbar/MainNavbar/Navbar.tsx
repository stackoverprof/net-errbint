import Link from '@components/_shared/Link';
import React, { useEffect, useRef, useState } from 'react';
import { useLayout } from '@core/contexts';
import { useRouter } from 'next/router';

interface Props {
	isActive: boolean
	toggleOpenMenu(): void;
}

const Navbar = ({isActive, toggleOpenMenu}: Props) => {

	return (
		<div className="flex-cc w-full text-white bg-black bg-opacity-50 backdrop-blur-md" style={{height: 60}}>
			<div className="flex-bc container-14">
				<div className="w-40 h-full">
					<button onClick={() => toggleOpenMenu()}>NAVIGATION {isActive ? 'active' : 'close'}</button>
				</div>
				<PageLinks />
			</div>
		</div>
	);
};

const data_links = [
	{ route: '/', text: 'Home'},
	{ route: '/projects', text: 'Projects'},
	{ route: '/content', text: 'Content'},
	{ route: '/gears', text: 'Gears'},
];

const PageLinks = () => {
	const [inside, setInside] = useState(false);
	const [hovered, setHovered] = useState(0);
	
	const childRef = [useRef(null), useRef(null), useRef(null), useRef(null)];

	const getPrevDistance = (index) => {
		const widthlist: Array<number> = childRef.map(e => (e.current?.offsetWidth || 0));
		const distance = index ? widthlist.slice(0, index).reduce((p, c) => p + c) : 0;
		return distance;
	};

	const router = useRouter();
	const currentPage = data_links.map(item => item.route).indexOf(router.pathname);
	
	const { selectedTheme } = useLayout();
	const theme_switch = {
		orange: 'bg-gradient-to-r from-accent-orange-light to-accent-orange-dark',
		purple: 'bg-gradient-to-r from-accent-purple-light to-accent-purple-dark',
		green: 'bg-gradient-to-r from-accent-green-light to-accent-green-dark',
		blue: 'bg-gradient-to-r from-accent-blue-light to-accent-blue-dark',
	};

	useEffect(() => {
		setHovered(currentPage);
	}, [router]);
	
	return (
		<div className="relative flex-cc h-full -mx-3 text-xl text-white group" onMouseEnter={() => setInside(true)} onMouseLeave={() => { setInside(false); setHovered(currentPage); }}>
			<div className="z-10 h-full flex-cc gap-2">
				{data_links.map((item, i) => (
					<div ref={childRef[i]} key={i}>
						<Link href={item.route} scroll={false} onMouseEnter={() => setHovered(i)} className="flex-cc h-full px-3">{item.text}</Link>
					</div>
				))}
			</div>

			<div className={['absolute h-8 transition-all', theme_switch[selectedTheme]].join(' ')} style={{borderRadius: 6, opacity: inside ? 0.5 : 0.9, left: getPrevDistance(inside ? hovered : currentPage) + (8*hovered), transitionDuration: '0.25s', width: childRef[hovered].current?.offsetWidth || 0}}></div>
		</div>
	);
};

export default Navbar;
