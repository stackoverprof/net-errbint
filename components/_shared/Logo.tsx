import React from 'react';
import Image from 'next/image';
import Link from '@components/_shared/Link';

interface Props {
    className?: string
	type?: 'full' | 'simple'
    width?: number
    href?: string
	onClick?(): void
}

const Logo = ({className, type = 'full', width = 162, href, onClick = () => void 0} : Props): JSX.Element => {
	
	const logo_img = {
		full: {
			src: '/brand/logo-full.svg',
			ratio: 3
		},
		simple: {
			src: '/brand/logo-simple.svg',
			ratio: 1
		}
	}[type];

	return (
		<Link postAction={onClick} disabled={!href} href={href}><Image src={logo_img.src} width={width} height={width/logo_img.ratio} className={`select-none ${className}`} alt="Main logo"/></Link>
	);
};

export default Logo;