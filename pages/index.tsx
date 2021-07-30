import CustomPage, { StaticProps } from './[...customs]';
import { GetStaticPropsResult } from 'next';
import { queryByRoute, queryLayout } from '@core/prismic/client';

export const getStaticProps = async (): Promise<GetStaticPropsResult<StaticProps>> => {
	const content = await queryByRoute('/');
	const layout_content = await queryLayout(content.layout.uid);
    
	return {
		props: { content, layout_content }
	};
};

export default CustomPage;
