import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import ProgressBar from 'nextjs-progressbar';
import ContextProvider from '@core/contexts';
import SEOTags from '@components/_shared/SEOTags';
import Loader from '@components/_shared/Loader';

import '@core/styles/tailwind.css';
import '@core/styles/typefaces.css';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<>
			<Head>
				<title>Errbint.NET</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="theme-color" content="#000000" />
				<SEOTags />
			</Head>
			<ProgressBar
				color="#FFCB11"
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				options={{showSpinner: false}}
			/>
			<Loader />
			<ContextProvider>
				<Component {...pageProps} />
			</ContextProvider>
		</>
	);
};

export default App;
