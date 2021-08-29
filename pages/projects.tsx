import React from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import Link from '@components/_shared/Link';
 
const Projects = (): JSX.Element => {
	return (
		<MainLayout title="About" className="flex-sc col" transition="fade" scrollUp>
			<div className="w-full bg-black text-white" style={{height: 2000}}>
				<div className="flex-sc gap-2">
					<Link href="/">HOME</Link>
					<Link href="/about">ABOUT</Link>
					<Link href="/projects">PROJECTS</Link>
				</div>
			</div>
		</MainLayout>
	);
};

export default Projects;
