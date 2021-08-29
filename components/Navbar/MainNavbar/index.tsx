import React, { useEffect, useState } from 'react';
import { useScrollYPosition } from 'react-use-scroll-position';
import useDebug from '@core/hooks/useDebug';
import Navbar from './Navbar';
import NavMenu from './NavMenu';
import useResize from 'use-resizing';

const MainNavbar = () => {
	const [position, setPosition] = useState('bottom');
	const [openMenu, setOpenMenu] = useState(false);
	const scroll = useScrollYPosition();

	const screenHeight = useResize().height;
	
	
	const getShrink = () => {
		const calc = 60 - (scroll - (screenHeight - 60)); 
		const shrink = calc < 0 ? 0 : calc > 60 ? 60 : calc;
		return shrink;
	};

	useEffect(() => {			
		if (scroll === 0) setPosition('bottom');
		else if (scroll > window.innerHeight - 60) setPosition('top');
		else setPosition('floating');
	}, [scroll]);

	return (
		<nav className="sticky top-0 w-full pointer-events-none" style={{height: 120}}>
			<div style={{height: 60}} className="pointer-events-auto">
				<Navbar />
			</div>
			<div style={{height: getShrink()}} className="pointer-events-auto overflow-hidden flex-cc">
				<NavMenu />
			</div>
		</nav>
	);
};

export default MainNavbar;
