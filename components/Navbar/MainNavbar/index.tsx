import React, { useEffect, useRef, useState } from 'react';
import { useScrollYPosition } from 'react-use-scroll-position';
import Navbar from './Navbar';
import NavMenu from './NavMenu';
import useResize from 'use-resizing';

export type EnumPosition = 'default' | 'sticked' | 'floating'

const MainNavbar = () => {
	const [position, setPosition] = useState<EnumPosition>('default');
	const [openMenu, setOpenMenu] = useState(false);
	const scroll = useScrollYPosition();

	const shrinkRef = useRef(null);

	const screenHeight = useResize().height;

	const _setOpenMenu = () => {
		switch (position) {
			case 'default':
				window.scrollTo(0, 60);
				break;
			case 'sticked':
				shrinkRef.current.style.transition = 'all 0.15s ease 0s';
				setOpenMenu(!openMenu);
				break;
			case 'floating':
				if (scroll === 60) window.scrollTo(0, 0);
				break;
		}
	};
	
	const getShrink = () => {
		if (shrinkRef.current) {
			const removeTransition = () => shrinkRef.current.style.transition = 'none';
			if (openMenu) removeTransition();
			else setTimeout(removeTransition, 150);
		}
		const calc = 60 - (scroll - (screenHeight - 60)); 
		const shrink = calc < 0 ? 0 : calc > 60 ? 60 : calc;
		return shrink;
	};

	useEffect(() => {			
		if (scroll === 0) {
			setPosition('default');
			setOpenMenu(false);
		}
		else if (scroll > window.innerHeight - 60) setPosition('sticked');
		else {
			setOpenMenu(false);
			setPosition('floating');
		}
	}, [scroll]);

	return (
		<nav className="sticky top-0 w-full pointer-events-none" style={{height: 120}}>
			<div style={{height: 60}} className="pointer-events-auto">
				<Navbar isActive={position !== 'default' && (scroll < screenHeight || openMenu)} toggleOpenMenu={_setOpenMenu} position={position}/>
			</div>
			<div ref={shrinkRef} style={{height: openMenu ? 60 : getShrink()}} className="transition-all pointer-events-auto overflow-hidden flex-cc">
				<NavMenu />
			</div>
		</nav>
	);
};

export default MainNavbar;
