import React from 'react';
import Head from 'next/head';
import AlertHandler from '@components/_shared/AlertHandler';
import { useLayout } from '@core/contexts/index';
import useClearance from '@core/hooks/useClearance';

interface Props {
	children: React.ReactNode
	title?: string
	className?: string
}

const MainLayout = ({children, title, className}: Props): JSX.Element => {
	const { mainAlert, resetMainAlert } = useLayout();
	const [clearance, HeaderRef, FooterRef] = useClearance(0);

	return (
		<>
			<Head>
				{title && <title>{title} — Hybrid</title>}
			</Head>

			<header ref={HeaderRef}>
				
			</header>

			<main style={{minHeight: `calc(100vh - ${clearance}px)`}} className={`${className} overflow-x-hidden`}>
				{children}
			</main>

			<footer ref={FooterRef}>

			</footer>

			{mainAlert && <AlertHandler type={mainAlert.type} message={mainAlert.message} handleClose={resetMainAlert} key={(new Date).toISOString()}/>}
		</>
	);
};

export default MainLayout;
