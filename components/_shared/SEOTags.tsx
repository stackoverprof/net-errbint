
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React from 'react';

const DEFAULT = {
	sitename: 'My Site',
	domain: 'http://my-site.com/',
	description: 'Site description that contains some information about what is your site about and blablabla',
	image: 'https://images.unsplash.com/photo-1629058622223-93665bf5d046?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
};


const SEOTags = (props: any) => {
	const data = {...DEFAULT, ...props};

	const router = useRouter();

	const supertitle = data.title ? `${data.title} — ${data.sitename} ` : data.sitename;
	
	return (
		<Head>
			<title>{supertitle}</title>

			<meta name="robots" content="follow, index" />
			<meta name="description" content={data.description} />
			<meta property="og:url" content={router.asPath} />
			<link rel="canonical" href={router.asPath} />
			
			<meta property="og:type" content="website" />
			<meta property="og:title" content={supertitle} />
			<meta property="og:site_name" content={supertitle} />
			<meta property="og:description" content={data.description} />
			<meta property="og:image" name="image" content={data.image} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={supertitle} />
			<meta name="twitter:title" content={supertitle} />
			<meta name="twitter:description" content={data.description} />
			<meta name="twitter:image" content={data.image} />
		</Head>
	);
};

export default SEOTags;