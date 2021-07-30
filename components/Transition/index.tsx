import React from 'react';
import Fade from './Fade';

interface Props {
	type?: string
	children: React.ReactNode
}

const PageTransition = ({type, children}: Props) => {

	switch (type) {
		case 'fade': return <Fade>{children}</Fade>;
		default: return <div>{children}</div>;
	}
};

export default PageTransition;