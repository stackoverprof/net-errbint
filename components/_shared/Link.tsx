import React from 'react';
import NextLink from 'next/link';

interface Props {
    href?: string
    className?: string
    children?: React.ReactNode
    underlined?: boolean
    target?: '_blank'
    rel?: string
    stroked?: boolean
    zoomed?: boolean
    disabled?: boolean
    postAction?(): void;
    onClick?(): void;
    style?: React.CSSProperties;
}

const Link = ({className, href, children, underlined, target, rel, style, stroked, zoomed, disabled, onClick, postAction = () => void 0}: Props): JSX.Element => {
	return (
		<div
			style={style}
			className={`relative flex ${disabled ? 'pointer-events-none' : 'cursor-pointer'} ${underlined && !disabled ? 'hover:underline' : ''} ${stroked && !disabled ? 'transform hover:stroked' : ''} ${zoomed && !disabled ? 'transform hover:scale-105' : ''} ${className}`}
			onClick={onClick}
		>
			{children}
			{!disabled && href && <NextLink href={href}><a onClick={() => postAction()} className={`absolute top-0 left-0 opacity-0 full ${href === '#' ? 'active:pointer-events-none' : ''}`} target={target} rel={target === '_blank' && !rel ? 'noopener noreferrer' : rel}></a></NextLink>}
		</div>
	);
};

export default Link;
