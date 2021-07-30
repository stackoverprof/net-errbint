import React from 'react';
import Head from 'next/head';
import AlertHandler from '@components/_shared/AlertHandler';
import { useLayout } from '@core/contexts/index';
import useClearance from '@core/hooks/useClearance';
import Transition from '@components/Transition';

interface Props {
	children: React.ReactNode
	title?: string
	className?: string
	transition?: 'fade' | '';
}

const MainLayout = ({children, title, className, transition}: Props): JSX.Element => {
	const { mainAlert, resetMainAlert } = useLayout();
	const [clearance, HeaderRef, FooterRef] = useClearance(0);

	return (
		<Transition type={transition}>
			<Head>
				{title && <title>{title} — Errbint.NET</title>}
			</Head>

			<header ref={HeaderRef}>
				
			</header>

			<main style={{minHeight: `calc(100vh - ${clearance}px)`}} className={`${className} overflow-x-hidden`}>
				{children}
			</main>

			<footer ref={FooterRef}>

			</footer>

			{mainAlert && <AlertHandler type={mainAlert.type} message={mainAlert.message} handleClose={resetMainAlert} key={(new Date).toISOString()}/>}
		</Transition>
	);
};

export default MainLayout;
