import React from 'react';
import { SliceType } from '@core/prismic/client';
import { snakeToPascal } from '@core/utils/converter';
import SliceList from './_slicelist';

interface Props {
	slice: SliceType
}

const RenderSlice = ({ slice }: Props): JSX.Element => {
	const ComponentName = snakeToPascal(slice.slice_type);
	const SliceComponent = SliceList[ComponentName];

	if (SliceComponent) return <SliceComponent slice={slice} />; 
	else return <pre>Component not found: {ComponentName}.tsx</pre>;
};

export default RenderSlice;
