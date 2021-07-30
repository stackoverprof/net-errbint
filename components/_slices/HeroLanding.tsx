import { SliceType } from '@core/prismic/client';
import { RichText } from 'prismic-reactjs';
import React from 'react';

interface Props {
	slice: SliceType
}

const HeroLanding = ({slice}: Props): JSX.Element => {
	return (
		<section className="flex-cc w-full h-32">
			<div className="css-force-537834">{RichText.render(slice.primary.supertext)}</div>
			<style dangerouslySetInnerHTML={{__html: `
				.css-force-537834 p { 
					text-align: center;
				}
			`}}/>
		</section>
	);
};

// css-force will only be needed to style explicit elements in RichText.render()

export default HeroLanding;
