import React from 'react';
import Fade from './Fade';

interface Props {
	type: EnumTransition
	children: React.ReactNode
}

export type EnumTransition = 'fade' | ''

const PageTransition = ({type, children}: Props) => {

	switch (type) {
		case 'fade': return <Fade>{children}</Fade>;
		default: return <div>{children}</div>;
	}
};

export default PageTransition;