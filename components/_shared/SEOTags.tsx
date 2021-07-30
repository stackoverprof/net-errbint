import React from 'react';

const SEOTags = (): JSX.Element => (
	<>
		<link rel="canonical" href="[DOMAIN]" />
		<meta name="description" content="[DESCRIPTION]" />
		<meta name="summary" content=""/>
		<meta name="keywords" content=""/>
		<meta name="locale" content="en"/>
		<meta name="robots" content="index,follow"/>
		<meta name="googlebot" content="index,follow"/>
		<meta name="copyright"content=""/>
		<meta name="subject" content="[PROJECT_NAME]"/>
		<meta name="revised" content="" />
		<meta name="abstract" content=""/>
		<meta name="topic" content="[CATEGORY]"/>
		<meta name="Classification" content="[CATEGORY]"/>
		<meta name="author" content="[AUTHOR], [EMAIL]"/>
		<meta name="designer" content=""/>
		<meta name="reply-to" content="[EMAIL]"/>
		<meta name="owner" content="[PROJECT_NAME]"/>
		<meta name="url" content="[DOMAIN]"/>
		<meta name="identifier-URL" content="[DOMAIN]"/>
		<meta name="directory" content="submission"/>
		<meta name="category" content="[CATEGORY]"/>
		<meta name="coverage" content="Worldwide"/>
		<meta name="distribution" content="Global"/>
		<meta name="rating" content="General"/>
		
		<meta property="og:site_name" content="[PROJECT_NAME]" />
		<meta property="og:title" content="[PROJECT_NAME]" />
		<meta property="og:url" content="[DOMAIN]" />
		<meta property="og:description" content="[DESCRIPTION]" />
		<meta property="og:image" content="" />
	</>
);

export default SEOTags;