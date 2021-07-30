import React from 'react';
import { SliceType } from '@core/prismic/client';
import useDebug from '@core/hooks/useDebug';

interface Props {
	slice: SliceType
}

const SliceName = ({slice}: Props): JSX.Element => {
	useDebug(slice);
	
	return (
		<section className="flex-cc w-full">
			<div className="container  max-w-7xl flex-cc col px-28 -md:px-8">
				
			</div>
		</section>
	);
};

export default SliceName;
