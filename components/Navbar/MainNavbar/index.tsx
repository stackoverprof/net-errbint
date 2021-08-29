import React, { useEffect, useState } from 'react';
import { useScrollYPosition } from 'react-use-scroll-position';
import useDebug from '@core/hooks/useDebug';
import Navbar from './Navbar';
import NavMenu from './NavMenu';

const MainNavbar = () => {
	const [position, setPosition] = useState('bottom');
	const scroll = useScrollYPosition();
	
	useEffect(() => {			
		if (scroll === 0) setPosition('bottom');
		else if (scroll > window.innerHeight - 60) setPosition('top');
		else setPosition('floating');
	}, [scroll]);

	useDebug(position);

	return (
		<nav className="sticky top-0 bg-red-200 w-full">
			<Navbar />
			<NavMenu />
		</nav>
	);
};

export default MainNavbar;
