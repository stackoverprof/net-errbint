import React, { useEffect, useRef, useState } from 'react';
import { useScrollYPosition } from 'react-use-scroll-position';
import Navbar from './Navbar';
import NavMenu from './NavMenu';
import useResize from 'use-resizing';

const MainNavbar = () => {
	const [position, setPosition] = useState('bottom');
	const [openMenu, setOpenMenu] = useState(false);
	const scroll = useScrollYPosition();

	const shrinkRef = useRef(null);

	const screenHeight = useResize().height;

	const _setOpenMenu = () => {
		shrinkRef.current.style.transition = 'all 0.15s ease 0s';
		setOpenMenu(!openMenu);
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
			setPosition('bottom');
			setOpenMenu(false);
		}
		else if (scroll > window.innerHeight - 60) setPosition('top');
		else setPosition('floating');
	}, [scroll]);

	return (
		<nav className="sticky top-0 w-full pointer-events-none" style={{height: 120}}>
			<div style={{height: 60}} className="pointer-events-auto">
				<Navbar isActive={position !== 'bottom' && (scroll < screenHeight || openMenu)} toggleOpenMenu={_setOpenMenu} />
			</div>
			<div ref={shrinkRef} style={{height: openMenu ? 60 : getShrink()}} className="transition-all pointer-events-auto overflow-hidden flex-cc">
				<NavMenu />
			</div>
		</nav>
	);
};

export default MainNavbar;
