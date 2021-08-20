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
			<SEOTags title={title} />

			<header ref={upperRef}>
				{/* Navbar things */}
			</header>

			<main style={{minHeight: clearance, ...style}} className={className}>
				{children}
			</main>

			<footer ref={lowerRef}>
				{/* Footer things */}
			</footer>

			{alert_value && <AlertHandler type={alert_value.type} message={alert_value.message} handleClose={resetAlert} key={Math.random()}/>}
		</Transition>
	);
};

export default MainLayout;
