import Link from '@components/_shared/Link';
import React from 'react';

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

				<div className="flex-cc gap-2">
					<Link scroll={false} href="/">HOME</Link>
					<Link scroll={false} href="/about">ABOUT</Link>
					<Link scroll={false} href="/projects">PROJECTS</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
