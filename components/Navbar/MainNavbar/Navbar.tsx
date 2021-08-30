import Link from '@components/_shared/Link';
import React from 'react';

interface Props {
	isActive: boolean
	toggleOpenMenu(): void;
}

const Navbar = ({isActive, toggleOpenMenu}: Props) => {

	return (
		<div className="w-full bg-blue-300 flex-cc" style={{height: 60}}>
			<div className="container-14 flex-bc">
				<div className="h-full w-40">
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
