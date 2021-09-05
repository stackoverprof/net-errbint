import Link from '@components/_shared/Link';
import React, { useRef, useState } from 'react';

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

const PageLinks = () => {
	const [inside, setInside] = useState(false);
	const [hovered, setHovered] = useState(0);
	
	const childRef = [useRef(null), useRef(null), useRef(null), useRef(null)];

	const getPrevDistance = (index) => {
		const widthlist: Array<number> = childRef.map(e => (e.current?.offsetWidth || 0));
		const distance = index ? widthlist.slice(0, index).reduce((p, c) => p + c) : 0;
		return distance;
	};

	const currentPage = 0;
	
	return (
		<div className="relative flex-cc h-full -mx-3 text-xl text-white group" onMouseEnter={() => setInside(true)} onMouseLeave={() => { setInside(false); setHovered(currentPage); }}>
			<div className="z-10 h-full flex-cc gap-2">
				<div ref={childRef[0]}>
					<Link href="/home" onMouseEnter={() => setHovered(0)} className="flex-cc h-full px-3">Home</Link>
				</div>
				<div ref={childRef[1]}>
					<Link href="/projects" onMouseEnter={() => setHovered(1)} className="flex-cc h-full px-3">Projects</Link>
				</div>
				<div ref={childRef[2]}>
					<Link href="/content" onMouseEnter={() => setHovered(2)} className="flex-cc h-full px-3">Content</Link>
				</div>
				<div ref={childRef[3]}>
					<Link href="/gears" onMouseEnter={() => setHovered(3)} className="flex-cc h-full px-3">Gears</Link>
				</div>
			</div>

			<div className={['absolute h-8 bg-accent-orange transition-all rounded-md', inside ? 'bg-opacity-50' : 'bg-opacity-100'].join(' ')} style={{left: getPrevDistance(inside ? hovered : currentPage) + (8*hovered), transitionDuration: '0.25s', width: childRef[hovered].current?.offsetWidth || 0}}></div>
		</div>
	);
};

export default Navbar;
