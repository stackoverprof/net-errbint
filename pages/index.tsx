import React, { useEffect } from 'react';
import MainLayout from '@components/_layouts/MainLayout';
import { useLayout } from '@core/contexts';
import Link from '@components/_shared/Link';
 
const Index = (): JSX.Element => {
	const { setMainAlert } = useLayout(); //sample custom hooks context

	useEffect(() => {
		setMainAlert({type: 'success', message: 'hahah sukses'});
		// sample use of setMainAlert()
	}, []);

	return (
		<MainLayout title="Home" className="flex-sc col">
			<h1 className="mb-4">Helo world</h1>
			<Link href="/about" className="px-4 py-2 text-white bg-blue-400" zoomed>TO ABOUT</Link>
			{/* SAMPLE USE OF CUSTOM <Link> */}
		</MainLayout>
	);
};


export default Index;
