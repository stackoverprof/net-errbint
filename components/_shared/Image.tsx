import React from 'react';
import NextImage, { ImageLoader } from 'next/image';

interface Props {
	src: string
	alt: string
	className?: string
	style?: React.CSSProperties
	blurDataURL?: never
	loader?: ImageLoader
	quality?: number | string
	width?: number | string
	height?: number | string
	priority?: boolean
	loading?: 'lazy' | 'eager'
	unoptimized?: boolean
	objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
	objectPosition?: string | 'inherit' | 'initial' | 'unset'	
}

const Image = ({src, alt, className, style, objectFit, blurDataURL, loader, quality, priority, loading, unoptimized, objectPosition, width, height}: Props): JSX.Element => (
	<div className={['relative', className].join(' ')} style={{...style, width, height}}>
		<NextImage
			objectFit={objectFit}
			layout="fill"
			src={src}
			alt={alt}
			blurDataURL={blurDataURL}
			loader={loader}
			quality={quality}
			priority={priority}
			loading={loading}
			unoptimized={unoptimized}
			objectPosition={objectPosition}
		/>
	</div>
);

export default Image;