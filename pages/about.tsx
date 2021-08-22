import React from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import { useLayout } from '@core/contexts';
import Link from '@components/_shared/Link';
 
const About = (): JSX.Element => {
	const { Alert, selectedTheme } = useLayout(); 
	
	return (
		<MainLayout title="About" className="flex-sc col">
			<p className="z-10 max-w-sm mt-48 mb-2 text-center">The technologies used in this template</p>
			<div className="flex-cc gap-1 mb-4">
				<img src="https://img.shields.io/badge/NEXT%20-%23000000.svg?&style=flat&logo=next.js&logoColor=white" alt="tech" />
				<img src="https://img.shields.io/badge/TAILWIND%20-%2338B2AC.svg?&style=flat&logo=tailwindcss&logoColor=white" alt="tech" />
			</div>
			<p className="z-10 max-w-sm mb-16 text-center"><strong>Extras:</strong> Layout, Alert, Custom Link, Custom Image, SEOTags, useForm, Context setup</p>
			
			<div className="flex-cc gap-4 mb-24">
				<Link href="/" className={['px-4 py-2 text-white hover:bg-opacity-80', `bg-accent-${selectedTheme}`].join(' ')}>BACK HOME</Link>
				<button 
					type="submit"
					onClick={() => Alert({message: 'More variation of color with the props type: something', type: 'success'})}
					className="px-4 py-2 text-white bg-black hover:bg-opacity-80"
				>
					Try Alert
				</button>
			</div>
		</MainLayout>
	);
};

export default About;
