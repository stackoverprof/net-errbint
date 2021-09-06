import Link from '@components/_shared/Link';
import React, { useEffect, useRef, useState } from 'react';
import { useLayout } from '@core/contexts';
import { useRouter } from 'next/router';

interface Props {
	isActive: boolean
	toggleOpenMenu(): void
	simpleMode: boolean
}

const Navbar = ({isActive, toggleOpenMenu, simpleMode}: Props) => {

	return (
		<div className="flex-cc w-full h-full text-white bg-black bg-opacity-50 backdrop-blur-md" style={{height: 60}}>
			<div className="flex-bc h-full md:container-14 sm:pr-5 -md:w-full">
				<HamburgerButton isActive={isActive} onClick={() => toggleOpenMenu()} simpleMode={simpleMode}/>
				<PageLinks />
			</div>
		</div>
	);
};

export default Navbar;





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

	const theme_switch_text = {
		orange: '-sm:text-accent-orange',
		purple: '-sm:text-accent-purple',
		green: '-sm:text-accent-green',
		blue: '-sm:text-accent-blue',
	};

	useEffect(() => {
		setHovered(currentPage);
	}, [router]);
	
	return (
		<>			
			<div className="relative flex-cc h-full text-xl text-white -sm:flex-sc group -sm:overflow-x-scroll -sm:no-scrollbar" onMouseEnter={() => setInside(true)} onMouseLeave={() => { setInside(false); setHovered(currentPage); }}>
				<div className="z-10 flex-cc h-full gap-2 -sm:px-6">
					{data_links.map((item, i) => (
						<div ref={childRef[i]} key={i} className="h-full">
							<Link href={item.route} scroll={false} onMouseEnter={() => setHovered(i)} className={`flex-cc h-full px-3 ${router.pathname === item.route ? theme_switch_text[selectedTheme] : ''}`}>{item.text}</Link>
						</div>
					))}
				</div>

				<div className={['absolute -sm:hidden h-8 transition-all', theme_switch[selectedTheme]].join(' ')} style={{borderRadius: 6, opacity: inside ? 0.5 : 0.9, left: getPrevDistance(inside ? hovered : currentPage) + (8*hovered), transitionDuration: '0.25s', width: childRef[hovered].current?.offsetWidth || 0}}></div>
			</div>
			<div className="absolute right-0 z-10 w-32 pointer-events-none sm:hidden" style={{height: 60, background: 'linear-gradient(90deg, #0000 0%, #000F 100%)'}}></div>
		</>
	);
};





interface HamburgerButtonProps {
	isActive: boolean
	onClick(): void
	simpleMode: boolean
}
const HamburgerButton = ({isActive, onClick, simpleMode}: HamburgerButtonProps) => {
	return (
		<div className="flex-cc h-full gap-5">
			<button className="flex-sc h-full bg-white bg-opacity-20 group" onClick={onClick}>
				<HamburgerIcon isActive={isActive} />
				<p className={['text-2.5xl -md:hidden overflow-hidden transition-all duration-700 text-left', simpleMode ? !isActive ? 'w-0 group-hover:w-24' : 'w-24' : 'w-24'].join(' ')}><span className="ml-1">MENU</span></p>
			</button>
			<Link href="/">
				<img src="/favicon.ico" alt="" className="w-6 h-6 transition-all duration-700" style={{opacity: simpleMode ? 1 : 0}}/>
			</Link>
		</div>
	);
};

const HamburgerIcon = ({isActive}: {isActive: boolean}) => (
	<div className="relative flex-cc h-full" style={{width: 60}}>
		<div className="absolute flex-cc col gap-1.5">
			<div className={['h-1 transition-all bg-white rounded-full transform w-7', isActive ? '' : 'translate-y-2.5'].join(' ')}></div>
		</div>
		<div className="absolute flex-cc col gap-1.5">
			<div className={['h-1 transition-all bg-white rounded-full transform w-7'].join(' ')}></div>
		</div>
		<div className="absolute flex-cc col gap-1.5">
			<div className={['h-1 transition-all bg-white rounded-full transform w-7', isActive ? '' : '-translate-y-2.5'].join(' ')}></div>
		</div>
	</div>
);