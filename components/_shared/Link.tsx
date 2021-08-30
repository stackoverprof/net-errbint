import React from 'react';
import NextLink, { LinkProps } from 'next/link';

type Props = {
    href?: string;
    className?: string;
    children?: React.ReactNode;
    target?: '_blank';
    rel?: string;
    disabled?: boolean;
    onClick?(): void;
    style?: React.CSSProperties;
	scroll?: boolean;
} & React.ComponentPropsWithoutRef<'a'> & LinkProps;

const Link = ({className, href, children, target, rel, style, disabled, onClick, scroll = true}: Props): JSX.Element => {
	return (
		<NextLink href={href} scroll={scroll}>
			<a 
				onClick={onClick}
				className={[(href === '#' || disabled) && 'active:pointer-events-none', className].join(' ')} 
				target={target}
				style={style}
				rel={target === '_blank' && !rel ? 'noopener noreferrer' : rel}
			>
				{children}
			</a>
		</NextLink>
		
	);
};

export default Link;
