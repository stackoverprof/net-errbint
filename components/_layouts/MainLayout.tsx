import React, { useEffect } from 'react';
import AlertHandler from '@components/_shared/AlertHandler';
import { useLayout } from '@core/contexts/index';
import useClearance from '@core/hooks/useClearance';
import Transition from '@components/Transition';
import SEOTags from '@components/_shared/SEOTags';

interface Props {
	children: React.ReactNode
	title?: string
	className?: string
	style?: React.CSSProperties
	transition?: 'fade' | ''
	scrollUp?: boolean
}

const MainLayout = ({children, title, className, transition, style, scrollUp}: Props): JSX.Element => {
	const { alert_value, resetAlert } = useLayout();
	const [clearance, upperRef, lowerRef] = useClearance();

	useEffect(() => {
		if (scrollUp) window.scrollTo(0, window.innerHeight * 4/5);
	}, []);

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
