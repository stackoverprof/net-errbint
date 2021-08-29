import React from 'react';
import Navbar from './Navbar';
import NavMenu from './NavMenu';

const MainNavbar = () => {
	return (
		<nav className="sticky top-0 bg-red-200 w-full">
			<Navbar />
			<NavMenu />
		</nav>
	);
};

export default MainNavbar;
