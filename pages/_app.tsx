import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/dist/shared/lib/router/router';
import ProgressBar from 'nextjs-progressbar';
import ContextProvider from '@core/contexts';
import Loader from '@components/_shared/Loader';
import SuperLayout from '@components/_layouts/_super';

import '@core/styles/tailwind.css';
import '@core/styles/typefaces.css';

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="theme-color" content="#000000" />
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
				<SuperLayout>
					<Component {...pageProps} key={router.route} />
				</SuperLayout>
			</ContextProvider>
		</>
	);
};

export default App;
