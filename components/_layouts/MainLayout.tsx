import React, { useEffect } from 'react';
import AlertHandler from '@components/_shared/AlertHandler';
import { useLayout } from '@core/contexts/index';
import useClearance from '@core/hooks/useClearance';
import Transition, { EnumTransition } from '@components/Transition';
import SEOTags from '@components/_shared/SEOTags';
import { useRouter } from 'next/router';

interface Props {
	children: React.ReactNode
	title?: string
	className?: string
	style?: React.CSSProperties
	transition?: EnumTransition
	scrollUp?: boolean
}

const MainLayout = ({children, title, className, transition, style, scrollUp}: Props): JSX.Element => {
	const { alert_value } = useLayout();
	const [minHeight, upperRef, lowerRef] = useClearance();
	const router = useRouter();

	useEffect(() => {
		if (scrollUp) window.scrollTo(0, window.innerHeight * 3/5);
	}, [router]);

	return (
		<Transition type={transition}>
			<SEOTags title={title} />

			<header ref={upperRef}>
				{/* Upper things */}
			</header>

			<main style={{minHeight, ...style}} className={className}>
				{children}
			</main>

			<footer ref={lowerRef}>
				{/* Lower things */}
			</footer>

			{alert_value && <AlertHandler />}
		</Transition>
	);
};

export default MainLayout;
