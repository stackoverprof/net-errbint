import React from 'react';
import { GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import { ContentType, LayoutContentType, queryByRoute, queryLayout } from '@core/prismic/client';
import DynamicLayout from '@components/_layouts/DynamicLayout';
import RenderSlice from '@components/_slices/_renderslice';
import client from '@core/prismic/client';
import Prismic from '@prismicio/client';

const CustomPage = ({ content, layout_content }: StaticProps): JSX.Element => {
	const router = useRouter();
	
	return (
		<DynamicLayout content={layout_content} title={content.html_title} key={router.asPath}>
			{content.body.map((slice, i) => (
				<RenderSlice slice={slice} key={i}/>
			))}
		</DynamicLayout>
	);
};

export interface StaticProps {
	content: ContentType
	layout_content: LayoutContentType
}

export const getStaticProps = async (context): Promise<GetStaticPropsResult<StaticProps>> => {
	const { customs } = context.params;
	const route = '/' + customs.join('/');
    
	const content = await queryByRoute(route);
	const layout_content = await queryLayout(content.layout.uid);
    
	return {
		props: { content, layout_content },
	};
};

interface StaticPaths {
	paths: { params: { customs: string } }[] 
	fallback: false
}

export const getStaticPaths = async (): Promise<StaticPaths> => {
	const docs = await client
		.query(Prismic.Predicates.at('document.type', 'pages'))
		.then(res => res.results);
        
	const paths = docs.filter(doc => doc.data.route !== '/').map((doc) => {
		const customs = doc.data.route.split('/').filter(item => item);
		return { params: { customs } };
	});    
    
	return {
		paths: paths,
		fallback: false
	};
};

export default CustomPage;
